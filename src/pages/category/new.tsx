import { useRouter } from "next/router";
import React from "react";
import Layout, { widthSx } from "../../components/Layout";
import CategoryForm from "../../components/CategoryForm";
import { CategoryExtend, CategoryFormData } from "@/app/types";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/app/apiService";
import { Box, LinearProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { setShouldRefreshCategories } from "@/app/store/categorySlice";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const NewCategory = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading } = useMutation({
    mutationFn: createCategory,
    onSuccess: (category: Omit<CategoryExtend, "values">) => {
      enqueueSnackbar(t("item-created", { item: t("category") }), {
        variant: "success",
      });
      router.push("/category/" + category.id);
      dispatch(setShouldRefreshCategories(true));
    },
    onError: () => {
      enqueueSnackbar(
        t("error-occured-while-adding-item", {
          item: t("category"),
        }),
        {
          variant: "error",
        }
      );
    },
  });

  const onFinish = (category: CategoryFormData) => {
    mutate(category);
  };

  const onCancel: () => void = () => {
    router.push("/");
  };

  return (
    <Layout pageTitle={t("create-a-new-category")}>
      <Box sx={widthSx}>
        {isLoading && <LinearProgress color="info" />}
        <CategoryForm onFinish={onFinish} onCancel={onCancel} />
      </Box>
    </Layout>
  );
};

NewCategory.requireAuth = true;

export default NewCategory;
