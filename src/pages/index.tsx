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
    <>
      <Head>
        <title>Instant stats</title>
        <meta
          name="description"
          content="Enter and display easily and rapidly your data"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Stack sx={{ width: "80vw", minHeight: "80vh" }} alignItems="center">
          <AnimatedTitle title="Instant stats" />
          <Box
            sx={{
              maxWidth: "500px",
              gcolor: "background.paper",
              // border: "1px solid red",
              display: "flex",
              flexGrow: 1,
              flexDirection: "column",
              width: "80%",
              justifyContent: "space-around",
              padding: "3rem 0",
            }}
          >
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
          </Box>
        </Stack>
      </main>
    </>
  );
}
