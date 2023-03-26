import Head from "next/head";
import Box from "@mui/material/Box";
import styles from "./Layout.module.css";
import AnimatedTitle from "./AnimatedTitle";
import { Stack } from "@mui/system";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Navbar from "./Navbar";

export default function Layout({
  pageTitle,
  children,
}: {
  pageTitle: string;
  children: React.ReactNode;
}) {
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

      <main className={styles.main}>
        <Stack
          sx={{
            width: "80vw",
            maxWidth: "800px",
            minHeight: "80vh",
            justifyContent: "space-between",
            // border: "1px solid red",
            gap: "2rem",
          }}
          alignItems="center"
        >
          {/* <AnimatedTitle title={pageTitle} /> */}
          <Typography variant="h1" component="h1">
            {pageTitle}
          </Typography>
          <Box
            sx={{
              gcolor: "background.paper",
              // border: "1px solid red",
              display: "flex",
              flexGrow: 1,
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {children}
          </Box>
        </Stack>
      </main>
    </>
  );
}
