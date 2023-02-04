import Link from "next/link";
import { useRouter } from "next/router";

const Category = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <p>Category: {id}</p>
      <Link href="/">Home</Link>
    </>
  );
};

export default Category;
