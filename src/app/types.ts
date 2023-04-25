export type Value = {
  id: number;
  date: string;
  value: number;
};

export type ValueFormData = Omit<Value, "id"> & {
  id?: number;
  categoryId: number;
};

export type DeleteValueFormData = {
  valueId: number;
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
