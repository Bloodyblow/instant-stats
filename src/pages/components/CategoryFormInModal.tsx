import { CategoryExtend } from "@/app/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import CategoryForm from "../components/CategoryForm";
import { Modal, Stack, Typography } from "@mui/material";
import { setShowCategoryForm } from "../../app/store/categorySlice";
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
  const { showCategoryForm } = useSelector(
    (state: RootState) => state.category
  );

  const { mutate } = useMutation({
    mutationFn: updateCategory,
    onSuccess: (category: Omit<CategoryExtend, "values">) => {
      dispatch(setShowCategoryForm(false));
      onFinish();
    },
  });

  const onCancelCategoryForm = () => dispatch(setShowCategoryForm(false));

  return (
    <Modal
      open={showCategoryForm}
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
