import { Button, Form } from "react-bootstrap";
import styles from "./CartItem.module.css";
import { TProduct } from "@util/types";
import { memo } from "react";
import ProductInfo from "../ProductInfo/ProductInfo";

const { cartItem, cartItemSelection } = styles;
type TCartItemProps = TProduct & {
  changeItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: ({ id }: { id: number }) => void;
};

export const CartItem = memo(
  ({
    id,
    title,
    price,
    img,
    quantity,
    max,
    changeItemQuantity,
    removeCartItem,
  }: TCartItemProps) => {
    const options = Array(max)
      .fill(0)
      .map((_, inx) => (
        <option key={inx + 1} value={inx + 1}>
          {inx + 1}
        </option>
      ));

    const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
      changeItemQuantity(id, +event.target.value);
    };

    const removeHandler = () => {
      removeCartItem({ id: id });
    };
    return (
      <div className={cartItem}>
        <ProductInfo img={img} price={price} title={title} direction="column">
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={removeHandler}
          >
            Remove
          </Button>
        </ProductInfo>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select
            aria-label="Default select example"
            value={quantity}
            onChange={changeHandler}
          >
            {options}
          </Form.Select>
        </div>
      </div>
    );
  }
);
