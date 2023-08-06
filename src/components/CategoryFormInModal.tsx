import { CategoryExtend } from "@/app/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import CategoryForm from "./CategoryForm";
import { LinearProgress, Modal, Stack, Typography } from "@mui/material";
import {
  setShouldRefreshCategories,
  setShowCategoryForm,
} from "../app/store/categorySlice";
import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "@/app/apiService";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const CategoryFormInModal = ({
  initialValues,
  onFinish,
}: {
  initialValues: Partial<CategoryExtend>;
  onFinish: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showCategoryForm } = useSelector(
    (state: RootState) => state.category
  );
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isLoading } = useMutation({
    mutationFn: updateCategory,
    onSuccess: (category: Omit<CategoryExtend, "values">) => {
      dispatch(setShowCategoryForm(false));
      dispatch(setShouldRefreshCategories(true));
      enqueueSnackbar(t("item-updated", { item: t("category") }), {
        variant: "success",
      });
      onFinish();
    },
    onError: () => {
      enqueueSnackbar(
        t("error-occured-while-updating-item", { item: t("category") }),
        {
          variant: "error",
        }
      );
    },
  });

  const onCancelCategoryForm = () => dispatch(setShowCategoryForm(false));

  return (
    <Modal
      open={showCategoryForm}
      onClose={onCancelCategoryForm}
      aria-labelledby="edit-category"
      aria-describedby={t("edit-name-unit-icon-of-current-category")}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiModal-backdrop": {
          backgroundColor: "#000000e3",
        },
      }}
    >
      <Stack
        direction="column"
        spacing={0}
        sx={{
          width: "80%",
          minWidth: "300px",
          maxWidth: "900px",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          id="edit-category"
          sx={{ color: "white" }}
        >
          {t("edit-category")}
        </Typography>
        {isLoading && <LinearProgress color="secondary" />}
        <CategoryForm
          initialValues={initialValues}
          onCancel={onCancelCategoryForm}
          onFinish={mutate}
        />
      </Stack>
    </Modal>
  );
};

export default CategoryFormInModal;
