import { Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

const OrderSkeleton = () => {
  const renderSkeletons = Array(2)
    .fill(0)
    .map((_, idx) => (
      <Row
        key={idx}
        sx={3}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ContentLoader
          speed={2}
          width={800}
          height={100}
          viewBox="0 0 800 100"
          backgroundColor="#f2f2f2"
          foregroundColor="#ecebeb"
        >
          <rect x="32" y="22" rx="0" ry="0" width="800 " height="30" />
          <rect x="30" y="64" rx="0" ry="0" width="800" height="30" />
        </ContentLoader>
      </Row>
    ));
  return <Row>{renderSkeletons}</Row>;
};

export default OrderSkeleton;
