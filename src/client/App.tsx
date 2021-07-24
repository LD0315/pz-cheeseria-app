import React, { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './App.styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import ItemDetails from './Cart/Item/ItemDetails';
import Recents from './Cart/Item/Recents';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};


const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();



const purchaseItems = async (items:CartItemType[]): Promise<any> => {
  var data2 =  {name:"linlin", items:items};

fetch(`api/purchase`, {
  method:'POST',
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  body:JSON.stringify(data2)
}).then((data) => data.json()).then((data) => console.log('data', data));

  /*await (await fetch(`api/handle`, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:JSON.stringify(data)
  })).json();*/
}

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'cheeses',
    getCheeses
  );

  const [recents, setRecents] = useState([] as CartItemType[]);

  //console.log("xxxx",purchaseItems());
  console.log(data);

    const [sItem, setSItem] = useState({} as CartItemType);
    const [open, setOpen] = useState(false);
    const [recentOpen, setRecentOpen] = useState(false);


  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const onItemClick = (item: CartItemType) => {
    console.log(item);

    setSItem(item);
    setOpen(true);
  };
  const recentPurchases = () => {
    fetch(`api/recents`).then((res:any) => {
      console.log("first then", res);
      return res.json();}).then((its:CartItemType[]) =>{
        console.log("second then", its);
        setRecents(its);
    });
  };
  const onRecentPurchsedClick = () => {
      recentPurchases();
      setRecentOpen(true);
  };

  const handleClose = () =>{
    setOpen(false);
  };

  const handleRecentClose = () =>{
    setRecentOpen(false);
  };

  const setItem = (item:CartItemType) => {
    console.log("set item func");
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };


  const handlePurchaseClick = () => {
    purchaseItems(cartItems).then((data) => console.log("xx", data));

    setCartItems([]);
  };



  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (

    <Wrapper>
      <ItemDetails name="linlin" open={open} item={sItem} handleClose={handleClose} />
      <Recents open={recentOpen} items={recents} handleClose={handleRecentClose} />
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton onClick={(e)=> onRecentPurchsedClick()}>
              <RestoreIcon />
              <Typography variant="subtitle2">
                Recent Purchases
              </Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color='error'
                data-cy="badge-count">
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">
                Cart
              </Typography>
            </StyledButton>

          </Grid>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          onPurchase={handlePurchaseClick}
        />
      </Drawer>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} handleClick={onItemClick}/>
          </Grid>
        ))}
      </Grid>
    </Wrapper>

  );
};

export default App;
