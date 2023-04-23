import {
  Category,
  CategoryExtend,
  CategoryFormData,
  ValueFormData,
} from "./types";

const headers = {
  "Content-Type": "application/json",
};

export const getCategory = (id: number): Promise<CategoryExtend> =>
  fetch(`/api/category/${id}`).then((res) => res.json());

export const getCategories = (): Promise<Category[]> =>
  fetch("/api/categories").then((res) => res.json());

export const createCategory = (category: CategoryFormData) =>
  fetch("/api/category/new", {
    method: "POST",
    headers,
    body: JSON.stringify(category),
  }).then((res) => res.json());

export const addValue = (formData: ValueFormData) => {
  const { categoryId, ...value } = formData;
  return fetch(`/api/value/${categoryId}`, {
    method: "POST",
    headers,
    body: JSON.stringify(value),
  }).then((res) => res.json());
};
