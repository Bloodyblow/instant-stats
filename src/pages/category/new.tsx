import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import ValuesTable from "../components/ValuesTable";
import ValueForm from "../components/ValueForm";
import CategoryForm from "../components/CategoryForm";
import { useDispatch } from "react-redux";
import Chart from "../components/Chart";
import LinearProgress from "@mui/material/LinearProgress";

const Category = () => {
  // const categoryData: CategoryExtend = {
  //   id: 1,
  //   name: "Bar chart",
  //   icon: <BarChartIcon />,
  //   unit: "€",
  //   values: [
  //     { id: 1, date: "2021-01-01", value: 10 },
  //     { id: 2, date: "2021-01-02", value: 20 },
  //     { id: 3, date: "2021-01-03", value: 30 },
  //     { id: 4, date: "2021-01-04", value: 40 },
  //     { id: 5, date: "2021-01-05", value: 50 },
  //   ],
  // };

  return (
    <Layout pageTitle={"Create a new set of data"}>
      <CategoryForm />
    </Layout>
  );
};

export default Category;
