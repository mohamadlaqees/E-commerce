import GridList from "@components/common/GridList/GridList";
import { Heading } from "@components/common/Heading/Heading";
import Product from "@components/eCommerce/Product/Product";
import Loading from "@components/feedback/Loading/Loading";
import LottieHanlder from "@components/feedback/LottieHanlder/LottieHanlder";
import ProductSkeleton from "@components/feedback/skeletons/ProductSkeleton/ProductSkeleton";
import useWishList from "@hooks/useWishList";

const WishList = () => {
  const { wishListItems, loading, error, itemFullInfo } = useWishList();
  return (
    <>
      <Heading content="WishList" />
      <Loading status={loading} error={error} skeleton={<ProductSkeleton />}>
        {wishListItems.length > 0 ? (
          <>
            <GridList
              data={itemFullInfo}
              renderItem={(product) => <Product {...product} />}
            />
          </>
        ) : (
          <LottieHanlder type="emptyCart" message="empty" />
        )}
      </Loading>
    </>
  );
};

export default WishList;
