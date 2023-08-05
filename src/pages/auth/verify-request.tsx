import Layout from "@/components/Layout";
import {
  Card,
  Box,
  FormControl,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import { getCsrfToken } from "next-auth/react";
import { useTranslation } from "react-i18next";

export default function VerifyRequest({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation();
  return (
    <Layout pageTitle={t("sign-in")}>
      <Card sx={{ width: "100%", height: "fit-content" }}>
        <Box
          sx={{
            backgroundColor: "background.paper",
            color: "secondary.contrastText",
            width: "100%",
            height: "100%",
            padding: "2rem",
            alignItems: "center",
          }}
        >
          <Typography sx={{ textAlign: "center", marginBottom: "2rem" }}>
            {t("you-will-receive-an-email")}
          </Typography>
          <Link href="/" style={{}}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#1cc9b3",
                "&:hover, &:active, &:focus": {
                  color: "#16a18f",
                },
                cursor: "pointer",
              }}
            >
              {t("go-back-to-app")}
            </Typography>
          </Link>
        </Box>
      </Card>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
