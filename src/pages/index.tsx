import Head from "next/head";
import { Inter } from "@next/font/google";
import Box from "@mui/material/Box";
import Router from "next/router";
import styles from "@/styles/Home.module.css";
import AnimatedTitle from "./components/AnimatedTitle";
import CategoriesList, { Category } from "./components/CategoriesList";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import Layout from "./components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const categories: Category[] = [
    {
      id: 1,
      name: "Bar chart",
      icon: <BarChartIcon />,
    },
    {
      id: 2,
      name: "Pie chart",
      icon: <PieChartIcon />,
    },
  ];

  return (
    <Layout pageTitle="Instant stats">
      <CategoriesList
        onClick={(id) => Router.push(`category/${id}`)}
        categories={categories}
      />
      <Button
        variant="contained"
        sx={{ width: "fit-content", alignSelf: "end" }}
      >
        Add a category
      </Button>
    </Layout>
  );
}
