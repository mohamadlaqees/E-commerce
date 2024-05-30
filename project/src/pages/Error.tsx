import LottieHanlder from "@components/feedback/LottieHanlder/LottieHanlder";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <Container
      className="d-flex flex-column align-items-center mt-5 "
      style={{ marginTop: "15px" }}
    >
      <LottieHanlder type="notFound" />
      <Link to={"/"} replace={true}>
        Home
      </Link>
    </Container>
  );
};

export default Error;
