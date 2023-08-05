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
import { getCsrfToken } from "next-auth/react";
import { useTranslation } from "react-i18next";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation();
  return (
    <Layout pageTitle={t("sign-in")}>
      <Card sx={{ width: "100%", height: "fit-content" }}>
        <Box
          component="form"
          sx={{
            backgroundColor: "background.paper",
            color: "secondary.contrastText",
            width: "100%",
            height: "100%",
            padding: "2rem",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
          method="post"
          action="/api/auth/signin/email"
        >
          <Typography sx={{ textAlign: "center", marginBottom: "2rem" }}>
            {t("magic-link-explanations")}
          </Typography>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <TextField
              id="email"
              label={t("email")}
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#16a18f",
                "&:hover, &:active, &:focus": {
                  backgroundColor: "#1cc9b3",
                },
              }}
            >
              {t("sign-in-with-item", { item: t("email") })}
            </Button>
          </FormControl>
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
