import { CategoryExtend, Value, ValueFormData } from "@/app/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import CategoryForm from "../components/CategoryForm";
import { Modal, Stack, Typography } from "@mui/material";
import { setEditCategory } from "../category/categorySlice";
import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "@/app/apiService";

const CategoryFormInModal = ({
  initialValues,
  onFinish,
}: {
  initialValues: Partial<CategoryExtend>;
  onFinish: () => void;
}) => {
  const dispatch = useDispatch();
  const { editCategory } = useSelector((state: RootState) => state.category);

  const { mutate } = useMutation({
    mutationFn: updateCategory,
    onSuccess: (category: Omit<CategoryExtend, "values">) => {
      dispatch(setEditCategory(false));
      onFinish();
    },
  });

  const onCancelCategoryForm = () => dispatch(setEditCategory(false));

  return (
    <Modal
      open={editCategory}
      onClose={onCancelCategoryForm}
      aria-labelledby="edit-category"
      aria-describedby="Edit the name, unit and icon of the current category"
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
        spacing={1}
        sx={{
          width: "80%",
          minWidth: "300px",
          maxWidth: "900px",
        }}
      >
        <Typography variant="h4" component="h2" id="edit-category">
          Edit the category
        </Typography>
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
