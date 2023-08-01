import Head from "next/head";
import Box from "@mui/material/Box";
import styles from "./Layout.module.css";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import Navbar from "./Navbar";
import ChooseLanguage from "./ChooseLanguage";
import { useTranslation } from "react-i18next";

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
          justifyContent: "space-between",
        }}
      >
        <main className={styles.main}>
          <Stack
            sx={{
              width: "80vw",
              maxWidth: "800px",
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
                width: "100%",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              {children}
            </Box>
          </Stack>
        </main>
        <footer className={styles.footer}>
          <ChooseLanguage />
          <a href="mailto:test@gmail.com">
            <Typography>{t("contact")}</Typography>
          </a>
        </footer>
      </Stack>
    </>
  );
}
