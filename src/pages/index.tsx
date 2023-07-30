import Router from "next/router";
import CategoriesList from "../components/CategoriesList";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import { Card, Typography } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import prisma from "prisma/prisma";
import { Category } from "@/app/types";
import { useSession, signIn, signOut } from "next-auth/react";
import HomePresentation from "@/components/HomePresentation";
import HomeCategories from "@/components/HomeCategories";

// export const getServerSideProps: GetServerSideProps = async () => {
//   const session = await getServerSession();
//   const userEmail = session?.user?.email as string;
//   // get all categories by user
//   // const categories = await prisma.category.findMany();
//   const categories = await prisma.category.findMany({
//     where: {
//       user: {
//         email: userEmail,
//       },
//     },
//   });
//   return { props: { categories } };
// };

export default function Home() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  if (status === "loading") {
    return <p>Hang on there...</p>;
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
            Sign in to start tracking
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
            onClick={() => signIn("github")}
          >
            Sign in with github
          </Button>
        </Card>
      )}
    </Layout>
  );
}
