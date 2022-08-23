import React, {FC, useCallback} from 'react';
import {useDispatch} from "react-redux";

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

import {setOnDialog} from "../../redux/dialog/slice";

type DialogProps = {
  isOpen: boolean
  setIsOpen: (a: boolean) => void
  dialogTitle: string
  dialogDescription: string
  clear: () => void
}

const DialogAlert: FC<DialogProps> = ({dialogTitle, dialogDescription, clear, setIsOpen, isOpen}) => {
  const dispatch = useDispatch()

  const handleAgree = useCallback(() => {
    clear()
    dispatch(setOnDialog(false))
  }, [dispatch]);

  const handleClose = useCallback(() => {
    setIsOpen(false)
    dispatch(setOnDialog(false))
  }, [dispatch])

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree} color="primary">
            Ок
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogAlert;