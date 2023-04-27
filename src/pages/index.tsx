import Router from "next/router";
import CategoriesList from "./components/CategoriesList";
import Button from "@mui/material/Button";
import Layout from "./components/Layout";
import { Card, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import prisma from "prisma/prisma";
import { Category } from "@/app/types";

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await prisma.category.findMany();
  return { props: { categories } };
};

export default function Home({ categories }: { categories: Category[] }) {
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
        {categories && categories.length > 0 && (
          <CategoriesList
            onClick={(id) => Router.push(`category/${id}`)}
            categories={categories}
          />
        )}
        <Button
          variant="contained"
          sx={{
            width: "100%",
            alignSelf: "end",
            backgroundColor: "#16a18f",
            "&:hover, &:active, &:focus": {
              backgroundColor: "#1cc9b3",
            },
          }}
          onClick={() => Router.push("category/new")}
        >
          Add a category
        </Button>
      </Card>
    </Layout>
  );
}
