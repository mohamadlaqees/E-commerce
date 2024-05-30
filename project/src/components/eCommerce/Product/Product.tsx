import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./Product.module.css";
import { TProduct } from "@util/types";
import { memo, useEffect, useState } from "react";
import Like from "@assets/like.svg?react";
import LikeFill from "@assets/like-fill.svg?react";
import likeToggle from "@store/WishList/act/LikeToggle";
import { useAppDispatch } from "@hooks/hooks";
import ProductInfo from "../ProductInfo/ProductInfo";
import addToCart from "@store/Cart/act/addToCart";
const { wishListBtn } = styles;

const Product: React.FC<TProduct> = memo((props) => {
  const dispatch = useAppDispatch();
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const remainQuantity = props.max - (props.quantity ?? 0);

  const addToCartHandler = () => {
    dispatch(addToCart(props.id));
    setClicked(true);
  };

  const addToWishList = () => {
    if (props.isAuthenticated === true) {
      if (!isLoading) {
        setIsLoading(true);
        dispatch(likeToggle(props.id))
          .unwrap()
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
      }
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    let timer: number;
    if (clicked) {
      timer = setTimeout(() => {
        setClicked(false);
      }, 400);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [clicked]);

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to login first to add this item to your wishlist.
        </Modal.Body>
      </Modal>

      <ProductInfo
        img={props.img}
        price={props.price}
        title={props.title}
        direction="row"
      >
        <div className={wishListBtn} onClick={addToWishList}>
          {isLoading ? (
            <Spinner animation="border" size="sm" variant="primary" />
          ) : props.isLiked ? (
            <LikeFill />
          ) : (
            <Like />
          )}
        </div>
        <h3>
          {remainQuantity
            ? `you can add ${remainQuantity}`
            : `you can't add more`}
        </h3>
        <Button
          variant="info"
          style={{ color: "white", width: "100%" }}
          onClick={addToCartHandler}
          disabled={clicked || !remainQuantity}
        >
          {clicked ? (
            <>
              <Spinner animation="border" size="sm" />
              Loading...
            </>
          ) : (
            "Add to cart"
          )}
        </Button>
      </ProductInfo>
    </>
  );
});

export default Product;
