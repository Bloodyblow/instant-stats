import Router from "next/router";
import CategoriesList from "../components/CategoriesList";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/app/types";
import { getCategories } from "@/app/apiService";

export default function HomeCategories() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  return (
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
  );
}
