import { Inter } from "@next/font/google";
import Router from "next/router";
import CategoriesList from "./components/CategoriesList";
import Button from "@mui/material/Button";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Card, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const categories = useSelector((state: RootState) => state.app.categories);

  return (
    <Layout pageTitle="Instant stats">
      <Typography sx={{ marginTop: "3rem" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
        tincidunt nisl, eu aliquam nisl. Nulla facilisi. Nulla facilisi. Nulla
        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        euismod tincidunt nisl, eu aliquam nisl. Nulla facilisi. Nulla facilisi.
        Nulla
      </Typography>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.2rem",
          padding: "0.5rem",
          minWidth: "300px",
          width: "80vw",
          maxWidth: "600px",
          marginTop: "1rem",
        }}
      >
        <CategoriesList
          onClick={(id) => Router.push(`category/${id}`)}
          categories={categories}
        />
        <Button variant="contained" sx={{ width: "100%", alignSelf: "end" }}>
          Add a category
        </Button>
      </Card>
    </Layout>
  );
}
