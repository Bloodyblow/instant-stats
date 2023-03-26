export type Value = {
  id: number;
  date: string;
  value: number;
};

export type Category = { id: number; name: string; icon: JSX.Element };

export type CategoryExtend = Category & {
  unit: string;
  values: Value[];
};

export type Message = {
  text: string;
  type: "success" | "error" | "info";
}

export type StoredMessage = Message & {
  id: number;
}