import { Heading } from "@components/common/Heading/Heading";
import Input from "@components/forms/Input/Input";
import useSignIn from "@hooks/useSignIn";
import { IAuthSlice } from "@util/types";
import axios from "axios";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { Form, Navigate, useNavigation } from "react-router-dom";

const SignIn = () => {
  const { accessToken, message, register, errors, response } = useSignIn();
  const navigate = useNavigation();

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Heading content="SignIn" />
      <Row>
        <>
          {message.get("message") === "login Required" && (
            <Alert variant="danger">{message.get("message")}</Alert>
          )}
          {message.get("message") === "Account created successfully" && (
            <Alert variant="success">{message.get("message")}</Alert>
          )}
          {axios.isAxiosError(response) && (
            <Alert variant="danger">{response.response?.data}</Alert>
          )}
        </>
        <Col md={{ span: 6, offset: 3 }}>
          <Form method="POST">
            <Input label="email" name="email" register={register} type="text" />
            <Input
              label="password"
              register={register}
              errors={errors.password?.message}
              name="password"
              type="password"
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "white", marginBottom: "100px" }}
              disabled={navigate.state === "submitting"}
            >
              {navigate.state === "submitting" ? (
                <>
                  <Spinner animation="border" size="sm" /> ...Loading
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;

export const authLogin = async ({ request }) => {
  const data = await request.formData();

  const event = {
    email: data.get("email"),
    password: data.get("password"),
  };
  try {
    const response = await axios.post<IAuthSlice>(
      "http://localhost:4000/login",
      event
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
