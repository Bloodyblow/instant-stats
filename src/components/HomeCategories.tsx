import Router from "next/router";
import CategoriesList from "../components/CategoriesList";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getCategories } from "@/app/apiService";
import { useTranslation } from "react-i18next";

export default function HomeCategories() {
  const { t } = useTranslation();
  const { status } = useSession();
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    enabled: status === "authenticated",
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
        {t("add-item", { item: t("category") })}
      </Button>
    </Card>
  );
}
