import { TLottie, lottieFilesMap } from "@util/types";
import Lottie from "lottie-react";

const LottieHanlder = ({ type, message }: TLottie) => {
  const lottie = lottieFilesMap[type];
  return (
    <div className="d-flex flex-column align-items-center mt-5 ">
      <Lottie animationData={lottie} style={{ width : "400px" }} />
      {message && <h3>{message}</h3>}
    </div>
  );
};

export default LottieHanlder;
