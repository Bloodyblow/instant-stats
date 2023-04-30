import { Typography } from "@mui/material";
import React from "react";
import styles from "./AnimatedTitle.module.css";

const AnimatedTitle = ({ title }: { title: string }) => (
  <Typography variant="h1" component="h1" className={styles.title}>
    {title}
  </Typography>
);
export default AnimatedTitle;
