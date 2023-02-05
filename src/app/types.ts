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
