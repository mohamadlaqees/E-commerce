import { TLoading } from "@util/types";
import LottieHanlder from "../LottieHanlder/LottieHanlder";

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  skeleton: JSX.Element;
};

const Loading: React.FC<LoadingProps> = (props) => {
  if (props.status === "pending") {
    return props.skeleton;
  } else if (props.error) {
    return (
      <div>
        <LottieHanlder type="error" message="error" />
      </div>
    );
  }
  return <div>{props.children}</div>;
};

export default Loading;
