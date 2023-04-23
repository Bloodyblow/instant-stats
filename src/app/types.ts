export type Value = {
  id: number;
  date: string;
  value: number;
};

export type ValueFormData = Omit<Value, "id"> & {
  categoryId: number;
};

export type Category = { id: number; name: string; icon: string };

export type CategoryExtend = Category & {
  unit: string;
  values: Value[];
};

export type CategoryFormData = Omit<CategoryExtend, "id" | "values">;

export type Message = {
  text: string;
  type: "success" | "error" | "info";
};

export type StoredMessage = Message & {
  id: number;
};
