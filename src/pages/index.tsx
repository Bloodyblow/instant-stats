import Router from "next/router";
import CategoriesList from "./components/CategoriesList";
import Button from "@mui/material/Button";
import Layout from "./components/Layout";
import { Card, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import prisma from "prisma/prisma";
import { Category } from "@/app/types";
import Stack from "@mui/material/Stack";

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await prisma.category.findMany();
  return { props: { categories } };
};

const typographySx = {
  textWrap: "balance",
  minWidth: "400px",
  width: "80vw",
  maxWidth: "800px",
};

export default function Home({ categories }: { categories: Category[] }) {
  return (
    <Layout pageTitle="Instant stats">
      <Typography
        sx={{
          ...typographySx,
          marginTop: "3rem",
          fontSize: "2rem",
          letterSpacing: "0.2rem",
        }}
      >
        Simplifies data organization and analysis.
      </Typography>
      <Typography sx={typographySx}>
        Users can create custom categories and enter values to track progress
        and analyze relevant data. The app presents data in table and provides{" "}
        <span style={{ color: "#ffef1d", letterSpacing: "2px" }}>
          multiple charts
        </span>{" "}
        for easy visualization. As a{" "}
        <span style={{ color: "#44df89" }}>side project</span> and a work in
        progress, we plan to add{" "}
        <span style={{ color: "#e16868", letterSpacing: "2px" }}>
          new features
        </span>{" "}
        and improvements.
      </Typography>
      <Typography
        sx={{ ...typographySx, color: "#d27ce0", fontSize: "1.2rem" }}
      >
        To get started, add a{" "}
        <strong style={{ letterSpacing: "-1px", color: "#c3a5c8" }}>
          new category
        </strong>{" "}
        or{" "}
        <strong style={{ letterSpacing: "-1px", color: "#c3a5c8" }}>
          select
        </strong>{" "}
        an existing one.
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
          Add a new category
        </Button>
      </Card>
    </Layout>
  );
}
