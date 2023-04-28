import {
  Category,
  CategoryExtend,
  CategoryFormData,
  DeleteValueFormData,
  ValueFormData,
} from "./types";

const headers = {
  "Content-Type": "application/json",
};

// Categories

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

export const updateCategory = (category: CategoryFormData) =>
  fetch(`/api/category/${category.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(category),
  }).then((res) => res.json());

export const deleteCategory = (id: number) =>
  fetch(`/api/category/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());

// Values

export const addValue = (formData: ValueFormData) => {
  const { categoryId, ...value } = formData;
  return fetch(`/api/value/${categoryId}`, {
    method: "POST",
    headers,
    body: JSON.stringify(value),
  }).then((res) => res.json());
};

export const updateValue = (formData: ValueFormData) => {
  const { categoryId, ...value } = formData;
  return fetch(`/api/value/${categoryId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(value),
  }).then((res) => res.json());
};

export const deleteValue = (formData: DeleteValueFormData) => {
  const { categoryId, valueId } = formData;
  return fetch(`/api/value/${categoryId}`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ valueId }),
  }).then((res) => res.json());
};
