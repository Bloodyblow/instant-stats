import Head from "next/head";
import Box from "@mui/material/Box";
import styles from "./Layout.module.css";
import { Stack } from "@mui/system";
import { Container, Typography } from "@mui/material";
import Navbar from "./Navbar";
import ChooseLanguage from "./ChooseLanguage";
import { useTranslation } from "react-i18next";

export const widthSx = {
  width: { xs: "95%", sm: "80%" },
  maxWidth: "800px",
};

export default function Layout({
  pageTitle,
  children,
}: {
  pageTitle: string | React.ReactNode;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Enter and display easily and rapidly your data"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <Stack
        sx={{
          height: "calc(100vh - 64px)",
          overflowY: "auto",
          overflowX: "hidden",
          justifyContent: "space-between",
        }}
      >
        <main className={styles.main}>
          <Stack
            sx={{
              justifyContent: "space-between",
              gap: "2rem",
            }}
            alignItems="center"
          >
            <Typography variant="h1" component="h1">
              {pageTitle}
            </Typography>
            <Box
              sx={{
                gcolor: "background.paper",
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
                width: "100vw",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              {children}
            </Box>
          </Stack>
        </main>
        <footer>
          <Container maxWidth="xl" sx={{ ...widthSx }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                margin: "4rem 0 2rem",
                alignItems: "center",
              }}
            >
              <ChooseLanguage />
              <a href="mailto:dev.instantstats@gmail.com">
                <Typography>{t("contact")}</Typography>
              </a>
            </Stack>
          </Container>
        </footer>
      </Stack>
    </>
  );
}
