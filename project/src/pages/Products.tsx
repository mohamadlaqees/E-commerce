import GridList from "@components/common/GridList/GridList";
import { Heading } from "@components/common/Heading/Heading";
import Product from "@components/eCommerce/Product/Product";
import Loading from "@components/feedback/Loading/Loading";
import ProductSkeleton from "@components/feedback/skeletons/ProductSkeleton/ProductSkeleton";
import useProducts from "@hooks/useProducts";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Params, json } from "react-router-dom";

const Products = () => {
  const { prefix, itemFullInfo, isLoading } = useProducts();

  return (
    <Container>
      <Heading content={`${prefix} Products`} />
      <Loading status={isLoading} error={null} skeleton={<ProductSkeleton />}>
        <GridList
          data={itemFullInfo}
          renderItem={(product) => <Product {...product} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;

export const getProducts = async ({ params }: { params: Params<string> }) => {
  const source = axios.CancelToken.source();
  const prefix = params.prefix;
  const response = await axios.get(
    `http://localhost:4000/products?cat_prefix=${prefix}`,
    { cancelToken: source.token } // Pass the cancel token to the request
  );
  if (!response) {
    throw json({ message: "Could not fetch data" }, { status: 400 });
  } else {
    return { data: response.data, cancelRequest: source.cancel };
  }
};
