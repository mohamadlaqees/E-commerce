import styles from "./HeaderCounter.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const { Container, pumpAnimated, totalNum } = styles;
const HeaderCounter = ({
  totalQuantity,
  Icon,
  path,
}: {
  totalQuantity: number;
  Icon: React.ReactNode;
  path: string;
}) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const bubble = `${totalNum} ${isAnimate ? pumpAnimated : ""}`;

  useEffect(() => {
    setIsAnimate(true);
    const bouncing = setTimeout(() => {
      setIsAnimate(false);
    }, 400);

    return () => clearTimeout(bouncing);
  }, [totalQuantity]);

  return (
    <Link to={path}>
      <div className={Container}>
        <div style={{ position: "relative", zIndex: 2 }}>{Icon} </div>
        {totalQuantity !== 0 ? (
          <div className={bubble}>{totalQuantity}</div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
};

export default HeaderCounter;
