import { TCategory } from "@util/types";
import styles from "./Category.module.css";
import { Link } from "react-router-dom";
const { categoryImg, categoryTitle, loadImg } = styles;

const Category: React.FC<TCategory> = (props) => {
  return (
    <div>
      <Link to={`/products/${props.prefix}`}>
        <div className={props.isLoading ? loadImg : categoryImg}>
          <img src={props.img} alt="" />
        </div>
        <h4 className={categoryTitle}>{props.title}</h4>
      </Link>
    </div>
  );
};

export default Category;
