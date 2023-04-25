import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import BarChartIcon from "@mui/icons-material/BarChart";
import { CategoryExtend, Value, ValueFormData } from "@/app/types";
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
    include: {
      values: true,
    },
  });
  return { props: { categoryData } };
};

const Category = ({ categoryData }: { categoryData: CategoryExtend }) => {
  const dispatch = useDispatch();
  const { editCategory } = useSelector((state: RootState) => state.category);

  const {
    data: category,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(categoryData.id),
    initialData: categoryData,
    enabled: false,
  });

  useEffect(() => {
    dispatch(setCategory(category));
  }, [category, dispatch]);

  const pageTitle = category?.name || "Get my data"; // TODO: add title

  const onFinishCategoryForm = () => dispatch(setEditCategory(false));
  const onCancelCategoryForm = () => dispatch(setEditCategory(false));
  const onFinishAddValue = () => refetch();
  const onValueDeleted = () => refetch();

  return (
    <Layout pageTitle={pageTitle}>
      {editCategory && (
        <CategoryForm
          initialValues={category}
          onCancel={onCancelCategoryForm}
          onFinish={onFinishCategoryForm}
        />
      )}

      <Chart />
      <ValueForm onFinish={onFinishAddValue} />
      <ValuesTable onValueDeleted={onValueDeleted} />
    </Layout>
  );
};

export default Category;
