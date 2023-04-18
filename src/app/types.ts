export type Value = {
  id: number;
  date: string;
  value: number;
};

export type Category = { id: string; name: string; icon: string };

export type CategoryExtend = Category & {
  unit: string;
  values: Value[];
};

export type Message = {
  text: string;
  type: "success" | "error" | "info";
};

export type StoredMessage = Message & {
  id: number;
};
