import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import CategoryForm from "../components/CategoryForm";
import { CategoryExtend, CategoryFormData } from "@/app/types";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/app/apiService";
import { LinearProgress } from "@mui/material";

const Category = () => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationFn: createCategory,
    onSuccess: (category: Omit<CategoryExtend, "values">) => {
      router.push("/category/" + category.id);
    },
  });

  const onFinish = (category: CategoryFormData) => {
    mutate(category);
  };

  const onCancel: () => void = () => {
    router.push("/");
  };

  return (
    <Layout pageTitle={"Create a new category"}>
      <div style={{ width: "100%" }}>
        {isLoading && <LinearProgress color="info" />}
        <CategoryForm onFinish={onFinish} onCancel={onCancel} />
      </div>
    </Layout>
  );
};

export default Category;
