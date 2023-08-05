import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import { Card, LinearProgress, Typography } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import HomePresentation from "@/components/HomePresentation";
import HomeCategories from "@/components/HomeCategories";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LinearProgress />;
  }

  return (
    <Layout pageTitle="Instant stats">
      <HomePresentation />
      {status === "authenticated" && <HomeCategories />}
      {status === "unauthenticated" && (
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
          <Typography
            sx={{
              m: 1,
              fontSize: "1.2rem",
              letterSpacing: "0.1rem",
              textAlign: "center",
            }}
          >
            {t("sign-in-to-start-tracking")}
          </Typography>
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
            onClick={() => signIn("email")}
          >
            {t("sign-in-with-item", { item: "email" })}
          </Button>
        </Card>
      )}
    </Layout>
  );
}
