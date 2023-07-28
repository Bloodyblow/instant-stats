import { useEffect } from "react";
import Layout from "../../components/Layout";
import { CategoryExtend } from "@/app/types";
import ValuesTable from "../../components/ValuesTable";
import ValueForm from "../../components/ValueForm";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setValues } from "../../app/store/categorySlice";
import Chart from "../../components/Chart";
import { useQuery } from "@tanstack/react-query";
import LinearProgress from "@mui/material/LinearProgress";
import { getCategory, getValues } from "@/app/apiService";
import { RootState } from "@/app/store/store";
import { GetServerSideProps } from "next";
import { Context } from "vm";
import prisma from "prisma/prisma";
import { CategoryIcon } from "../../components/CategoryIcon";
import { Box } from "@mui/material";
import CategoryFormInModal from "../../components/CategoryFormInModal";
import DeleteCategory from "../../components/DeleteCategory";
import CategoryHeader from "@/components/CategoryHeader";
import dayjs from "dayjs";

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
  const dispatch = useDispatch();
  const endDate = dayjs().format("YYYY-MM-DD");
  const startDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
  const { showCategoryForm } = useSelector(
    (state: RootState) => state.category
  );

  const {
    data: category,
    isFetching: isFetchingCategory,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(categoryData.id),
    initialData: categoryData,
    enabled: false,
  });

  const {
    data: values,
    isFetching: isFetchingValues,
    refetch: refetchValues,
  } = useQuery({
    queryKey: ["values"],
    queryFn: () => getValues(categoryData.id, startDate, endDate),
    initialData: [],
    enabled: true,
  });

  useEffect(() => {
    dispatch(setCategory(category));
  }, [category, dispatch]);

  console.log("category page", values);
  useEffect(() => {
    dispatch(setValues(values));
  }, [values, dispatch]);

  const pageTitle = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        "& svg": {
          color: "#49c575",
          height: "100%",
          fontSize: "3rem",
          marginRight: "10px",
        },
      }}
    >
      <CategoryIcon name={category.icon} />
      {category?.name}
    </Box>
  );

  const onFinishValues = () => refetchValues();
  const onFinishCategory = () => refetchCategory();
  const isFetching = isFetchingCategory || isFetchingValues;

  return (
    <Layout pageTitle={pageTitle}>
      {isFetching && (
        <div style={{ width: "100%", position: "absolute", top: "64px" }}>
          <LinearProgress color="info" />
        </div>
      )}

      <CategoryHeader />
      <Chart />
      <ValueForm onFinish={onFinishValues} />
      <ValuesTable onValueDeleted={onFinishValues} />

      {showCategoryForm && (
        <CategoryFormInModal
          initialValues={category}
          onFinish={onFinishCategory}
        />
      )}

      <DeleteCategory />
    </Layout>
  );
};

export default Category;
