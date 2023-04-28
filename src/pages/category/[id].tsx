import { useEffect } from "react";
import Layout from "../components/Layout";
import { CategoryExtend } from "@/app/types";
import ValuesTable from "../components/ValuesTable";
import ValueForm from "../components/ValueForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setShowCategoryForm,
} from "../../app/store/categorySlice";
import Chart from "../components/Chart";
import { useQuery } from "@tanstack/react-query";
import LinearProgress from "@mui/material/LinearProgress";
import EditIcon from "@mui/icons-material/Edit";
import { getCategory } from "@/app/apiService";
import { RootState } from "@/app/store/store";
import { GetServerSideProps } from "next";
import { Context } from "vm";
import prisma from "prisma/prisma";
import { CategoryIcon } from "../components/CategoryIcon";
import { Box, Button, Stack } from "@mui/material";
import CategoryFormInModal from "../components/CategoryFormInModal";
import DeleteCategory from "../components/DeleteCategory";

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
  const { showCategoryForm } = useSelector(
    (state: RootState) => state.category
  );

  const {
    data: category,
    isFetching,
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

  const pageTitle =
    (
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
    ) || "Get my data"; // TODO: add title

  const onFinish = () => refetch();

  return (
    <Layout pageTitle={pageTitle}>
      {isFetching && (
        <div style={{ width: "100%", position: "absolute", top: "64px" }}>
          <LinearProgress color="info" />
        </div>
      )}
      <Stack
        spacing={2}
        alignItems="center"
        direction="row"
        sx={{
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Button
          onClick={() => dispatch(setShowCategoryForm(true))}
          startIcon={<EditIcon />}
          color="info"
        >
          Edit the category
        </Button>
      </Stack>

      <Chart />
      <ValueForm onFinish={onFinish} />
      <ValuesTable onValueDeleted={onFinish} />

      {showCategoryForm && (
        <CategoryFormInModal initialValues={category} onFinish={onFinish} />
      )}

      <DeleteCategory />
    </Layout>
  );
};

export default Category;
