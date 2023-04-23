import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import CategoryForm from "../components/CategoryForm";
import { CategoryExtend, CategoryFormData } from "@/app/types";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/app/apiService";

const Category = () => {
  const router = useRouter();
  const { mutate } = useMutation({
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
    <Layout pageTitle={"Create a new set of data"}>
      <CategoryForm onFinish={onFinish} onCancel={onCancel} />
    </Layout>
  );
};

export default Category;
