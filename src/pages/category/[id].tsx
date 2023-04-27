import { useEffect } from "react";
import Layout from "../components/Layout";
import { CategoryExtend } from "@/app/types";
import ValuesTable from "../components/ValuesTable";
import ValueForm from "../components/ValueForm";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setEditCategory } from "./categorySlice";
import Chart from "../components/Chart";
import { useQuery } from "@tanstack/react-query";
import LinearProgress from "@mui/material/LinearProgress";
import EditIcon from "@mui/icons-material/Edit";
import { getCategory } from "@/app/apiService";
import { RootState } from "@/app/store";
import { GetServerSideProps } from "next";
import { Context } from "vm";
import prisma from "prisma/prisma";
import { CategoryIcon } from "../components/CategoryIcon";
import { Box, Button, Stack, Tooltip } from "@mui/material";
import CategoryFormInModal from "../components/CategoryFormInModal";

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
          onClick={() => dispatch(setEditCategory(true))}
          startIcon={<EditIcon />}
          color="info"
        >
          Edit the category
        </Button>
      </Stack>

      <Chart />
      <ValueForm onFinish={onFinish} />
      <ValuesTable onValueDeleted={onFinish} />

      {editCategory && (
        <CategoryFormInModal initialValues={category} onFinish={onFinish} />
      )}
    </Layout>
  );
};

export default Category;
