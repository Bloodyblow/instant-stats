import React from "react";
import styles from "./AnimatedTitle.module.css";

const AnimatedTitle = ({ title }: { title: string }) => (
  <h1 className={styles.title}>{title}</h1>
);
export default AnimatedTitle;
