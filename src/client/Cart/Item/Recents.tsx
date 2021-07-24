import React from 'react';
import {Component} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CartItemType } from '../../App';


type Props = {


  setItem: (clickedItem: CartItemType) => void;
};

var _open = false;

export default function Recents(props:any) {

  console.log(props);





  const items = props.items;
  _open = props.open;

   const handleClose = props.handleClose;

   const renderItem = (item:any, i:string) => {
        console.log(i, item);
        return (
            <>
             <li key={item.date}> {item.item.title} </li>
            </>
        );
   };

  const renderitems = () => {
      var rendered = [] as JSX.Element[];
      var i = 0;
      items.forEach((element:CartItemType) => {
          rendered.push(renderItem(element, "" + i));
          i++;
      });
      return rendered;
  };

  //render() {
  return (
    <div>

      <Dialog
        open={_open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Recent Items"}</DialogTitle>
        <DialogContent>

            <ul>{renderitems()}</ul>

        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}
