import { removeCategory } from "@/app/store/categorySlice";
import { Stack, Button, LinearProgress, Box } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "./ConfirmDialog";
import Router from "next/router";
import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "@/app/apiService";
import { RootState } from "@/app/store/store";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { widthSx } from "./Layout";

export default function DeleteCategory() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { category } = useSelector((state: RootState) => state.category);
  const { mutate: mutateDeleteCategory, isLoading } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      dispatch(removeCategory());
      enqueueSnackbar("Category deleted", { variant: "success" });
      setOpenConfirmDialog(false);
      Router.push("/");
    },
    onError: () => {
      enqueueSnackbar("An error occurred while deleting category", {
        variant: "error",
      });
    },
  });

  if (!category) return null;
  return (
    <Box sx={widthSx}>
      <Stack
        spacing={2}
        alignItems="center"
        direction="row"
        sx={{
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Button
          onClick={() => setOpenConfirmDialog(true)}
          startIcon={<DeleteIcon />}
          color="info"
        >
          {t("delete-this-category")}
        </Button>
      </Stack>
      {isLoading && <LinearProgress color="error" />}
      {openConfirmDialog && (
        <ConfirmDialog
          content={t("confirm-delete-category")}
          onConfirm={() => mutateDeleteCategory(category.id)}
          onClose={() => setOpenConfirmDialog(false)}
          open={openConfirmDialog}
          title={t("delete-this-category")}
          type="delete"
        />
      )}
    </Box>
  );
}
