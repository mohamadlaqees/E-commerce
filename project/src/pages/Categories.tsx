import GridList from "@components/common/GridList/GridList";
import { Heading } from "@components/common/Heading/Heading";
import Category from "@components/eCommerce/Category/Category";
import Loading from "@components/feedback/Loading/Loading";
import CategorySkeleton from "@components/feedback/skeletons/CategorySkeleton/CategorySkeleton";
import useCategories from "@hooks/useCategories";
import { TCategory } from "@util/types";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Outlet, json } from "react-router-dom";

const Categories = () => {
  const { data, isLoading } = useCategories();

  return (
    <Container>
      <Heading content="Categories" />
      <Loading
        status={isLoading === true ? "pending" : "idle"}
        error={null}
        skeleton={<CategorySkeleton />}
      >
        <GridList
          data={data}
          renderItem={(item) => <Category {...item} isLoading={isLoading} />}
        />
        <Outlet />
      </Loading>
    </Container>
  );
};

export default Categories;

export const loadCategories = async () => {
  const response = await axios.get<TCategory[]>(
    "http://localhost:4000/categories"
  );
  if (!response.data) {
    throw json({ message: "Could not fetch data" }, { status: 400 });
  } else {
    return response.data as TCategory[];
  }
};
