import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import CategoryForm from "../components/CategoryForm";
import { CategoryExtend } from "@/app/types";

const Category = () => {
  const router = useRouter();

  const onFinish = (category: Partial<CategoryExtend>) => {
    // save category + go to category page
    console.log(category);
    router.push("/category/" + category.id);
  };

  const onCancel = () => {
    router.push("/");
  };

  return (
    <Layout pageTitle={"Create a new set of data"}>
      <CategoryForm onFinish={onFinish} onCancel={onCancel} />
    </Layout>
  );
};

export default Category;
