import { TSuspence } from "@util/types";
import {  Suspense } from "react";
import LottieHanlder from "../LottieHanlder/LottieHanlder";

const SuspensePage = ({ children, type }: TSuspence) => {
  return (
    <Suspense fallback={<LottieHanlder type={type} />}>{children}</Suspense>
  );
};

export default SuspensePage;
