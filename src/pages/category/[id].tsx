import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import BarChartIcon from "@mui/icons-material/BarChart";
import { CategoryExtend } from "@/app/types";
import ValuesTable from "../components/ValuesTable";
import ValueForm from "../components/ValueForm";
import { useDispatch } from "react-redux";
import { setCategory } from "./categorySlice";

const Category = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;
  const categoryData: CategoryExtend = {
    id: 1,
    name: "Bar chart",
    icon: <BarChartIcon />,
    unit: "€",
    values: [
      { id: 1, date: "2021-01-01", value: 10 },
      { id: 2, date: "2021-01-02", value: 20 },
      { id: 3, date: "2021-01-03", value: 30 },
      { id: 4, date: "2021-01-04", value: 40 },
      { id: 5, date: "2021-01-05", value: 50 },
    ],
  };

  useEffect(() => {
    if (id !== undefined) {
      dispatch(setCategory(categoryData));
    }
  }, [id]);

  const isUpdate = id !== undefined;

  return (
    <Layout
      pageTitle={isUpdate ? categoryData.name : "Create a new set of data"}
    >
      <ValueForm />
      <ValuesTable />
      <Link href="/">Go back</Link>
    </Layout>
  );
};

export default Category;
