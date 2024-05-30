import { TProductInfo } from "@util/types";
import styles from "./ProductInfo.module.css";

const ProductInfo = ({
  title,
  img,
  price,
  direction = "row",
  children,
  style,
  quantity,
}: TProductInfo) => {
  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
      <div className={`${styles[`productImg-${direction}`]}`}>
        <img src={img} alt={title} />
      </div>
      <div className={`${styles[`productInfo-${direction}`]}`}>
        <h2>{title}</h2>
        <h3>{price?.toFixed(2)}</h3>
        {quantity && <h3>Total quantity : {quantity}</h3>}
        {quantity && <h3>Total price : {(quantity * price).toFixed(2)}</h3>}
        {children}
      </div>
    </div>
  );
};

export default ProductInfo;
