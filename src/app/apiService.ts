export const getCategory = (id: string) =>
  fetch(`/api/category/${id}`).then((res) => res.json());

export const getCategories = () =>
  fetch("/api/categories").then((res) => res.json());
