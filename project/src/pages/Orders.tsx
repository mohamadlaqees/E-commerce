import { Heading } from "@components/common/Heading/Heading";
import OrderTable from "@components/eCommerce/OrderTable/OrderTable";
import ProductInfo from "@components/eCommerce/ProductInfo/ProductInfo";
import Loading from "@components/feedback/Loading/Loading";
import LottieHanlder from "@components/feedback/LottieHanlder/LottieHanlder";
import OrderSkeleton from "@components/feedback/skeletons/OrderSkeleton/OrderSkeleton";
import useOrders from "@hooks/useOrders";
import { Alert, Button, Modal } from "react-bootstrap";

const Orders = () => {
  const {
    error,
    loading,
    orderList,
    selectedProduct,
    setSelectedProduct,
    setShowModal,
    showModal,
  } = useOrders();

  const viewDetailHandler = (id: number) => {
    const productDetails = orderList.find((item) => item.id === id);
    const newItem = productDetails?.items ?? [];
    setSelectedProduct((prev) => [...prev, ...newItem]);
    setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(!showModal);
    setSelectedProduct([]);
  };

  return (
    <>
      <Modal show={showModal} onHide={closeHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Product details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              img={el.img}
              price={el.price}
              title={el.title}
              direction="column"
              quantity={el.quantity}
              style={{ marginBottom: "20px" }}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
        {error ? <Alert variant="danger">{error}</Alert> : ""}
      </Modal>
      <Heading content="My order" />
      <Loading status={loading} error={error} skeleton={<OrderSkeleton />}>
        {orderList.length > 0 ? (
          <OrderTable
            orderList={orderList}
            viewDetailHandler={viewDetailHandler}
          />
        ) : (
          <LottieHanlder type="emptyCart" message="empty" />
        )}
      </Loading>
    </>
  );
};

export default Orders;
