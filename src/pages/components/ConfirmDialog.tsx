import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  content,
  onClose,
  onConfirm,
  open,
  title,
}: {
  content: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      {title && <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={onConfirm} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
