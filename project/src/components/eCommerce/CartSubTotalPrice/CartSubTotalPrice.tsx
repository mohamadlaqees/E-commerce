import { TProduct } from "@util/types";
import styles from "./CartSubTotalPrice.module.css";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "@hooks/hooks";
import placeOrder from "@store/Order/act/placeOrder";
import { clearproductFullInfo } from "@store/Cart/cartSlice";
import removeCartItem from "@store/Cart/act/removeCartItem";
export const CartSubTotalPrice = ({ products }: { products: TProduct[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const total = products.reduce(
    (acc, curr) => acc + curr.price * curr.quantity!,
    0
  );

  const placeOrderHandler = () => {
    setLoading(true);
    dispatch(placeOrder(total))
      .unwrap()
      .then(() => {
        dispatch(removeCartItem({ type: "removeAll" }));
        dispatch(clearproductFullInfo());
        setShowModal(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Place order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with subTotal {total.toFixed(2)}{" "}
          $
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(!showModal);
              setError("");
            }}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={placeOrderHandler}
            style={{ color: "white" }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" />
                Loading...
              </>
            ) : (
              "Confirm"
            )}{" "}
          </Button>
        </Modal.Footer>
        {error ? <Alert variant="danger">{error}</Alert> : ""}
      </Modal>
      <div className={styles.container}>
        <span>SubTotal:</span>
        <span>{total.toFixed(2)}</span>
      </div>
      <div className={styles.container}>
        <span></span>
        <span>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={() => setShowModal(true)}
          >
            Place Order
          </Button>
        </span>
      </div>
    </>
  );
};
