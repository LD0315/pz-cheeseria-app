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

export default function ItemDetails(props:any) {
/*
  state = {
    isOpen:false,
    item:null
  }
  constructor(props:any) {
    super(props);
    console.log(props);
    this.state = {
        isOpen: false,
        item: null
    };
  }*/
  console.log(props);


  const item = props.item;
  _open = props.open;
   /*const handleClickOpen = () => {
    setOpen(true);
  };*/

   const handleClose = props.handleClose;

  //render() {
  return (
    <div>

      <Dialog
        open={_open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cheese Details " + item.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {item.description}
          </DialogContentText>
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
