import { Inter } from "@next/font/google";
import Router from "next/router";
import CategoriesList from "./components/CategoriesList";
import Button from "@mui/material/Button";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const categories = useSelector((state: RootState) => state.app.categories);

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
