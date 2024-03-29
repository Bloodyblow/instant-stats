import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

export default function ConfirmDialog({
  content,
  onClose,
  onConfirm,
  open,
  title,
  type = "edit",
}: {
  content: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
  type?: "delete" | "edit";
}) {
  const { t } = useTranslation();
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
        <Button
          onClick={onConfirm}
          autoFocus
          color={type === "delete" ? "error" : "primary"}
          variant="contained"
        >
          {t("ok")}
        </Button>
        <Button onClick={onClose} variant="outlined">
          {t("cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
