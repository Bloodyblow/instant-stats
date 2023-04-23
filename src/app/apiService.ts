import { Category, CategoryExtend } from "./types";

const headers = {
  "Content-Type": "application/json",
};

export const getCategory = (id: string) =>
  fetch(`/api/category/${id}`).then((res) => res.json());

export const getCategories = () =>
  fetch("/api/categories").then((res) => res.json());

export const createCategory = (category: Partial<CategoryExtend>) =>
  fetch("/api/category/new", {
    method: "POST",
    headers,
    body: JSON.stringify(category),
  }).then((res) => res.json());
