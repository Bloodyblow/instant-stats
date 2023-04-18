import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import BarChartIcon from "@mui/icons-material/BarChart";
import { CategoryExtend } from "@/app/types";
import ValuesTable from "../components/ValuesTable";
import ValueForm from "../components/ValueForm";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setEditCategory } from "./categorySlice";
import Chart from "../components/Chart";
import { useQuery } from "@tanstack/react-query";
import LinearProgress from "@mui/material/LinearProgress";
import { getCategory } from "@/app/apiService";
import { RootState } from "@/app/store";
import CategoryForm from "../components/CategoryForm";
import { GetServerSideProps } from "next";
import { Context } from "vm";
import prisma from "prisma/prisma";

export const getServerSideProps: GetServerSideProps = async (
  context: Context
) => {
  const { id } = context.params;
  const categoryData = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
  return { props: { categoryData } };
};

const Category = ({ categoryData }: { categoryData: CategoryExtend }) => {
  console.log("categoryData", categoryData);
  const router = useRouter();
  const dispatch = useDispatch();
  const { editCategory } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(setCategory(categoryData));
  }, [categoryData, dispatch]);

  // if (isLoading) return <LinearProgress color="success" />;
  const pageTitle = categoryData?.name || "Get my data"; // TODO: add title

  const onFinishCategoryForm = (category: Partial<CategoryExtend>) => {
    // save category + go to category page
    console.log(category);
    dispatch(setEditCategory(false));
  };

  const onCancelCategoryForm = () => {
    dispatch(setEditCategory(false));
  };

  return (
    <Layout pageTitle={pageTitle}>
      {editCategory && (
        <CategoryForm
          initialValues={categoryData}
          onCancel={onCancelCategoryForm}
          onFinish={onFinishCategoryForm}
        />
      )}

      <Chart />
      <ValueForm />
      <ValuesTable />
    </Layout>
  );
};

export default Category;
