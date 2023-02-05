import Head from "next/head";
import Box from "@mui/material/Box";
import styles from "./Layout.module.css";
import AnimatedTitle from "./AnimatedTitle";
import { Stack } from "@mui/system";

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

      <main className={styles.main}>
        <Stack sx={{ width: "80vw", minHeight: "80vh" }} alignItems="center">
          <AnimatedTitle title={pageTitle} />
          <Box
            sx={{
              gcolor: "background.paper",
              // border: "1px solid red",
              display: "flex",
              flexGrow: 1,
              flexDirection: "column",
              width: "80%",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "3rem 0",
            }}
          >
            {children}
          </Box>
        </Stack>
      </main>
    </>
  );
}
