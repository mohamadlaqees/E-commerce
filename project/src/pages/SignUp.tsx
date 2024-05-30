import { Heading } from "@components/common/Heading/Heading";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import FormB from "react-bootstrap/Form";
import Input from "@components/forms/Input/Input";
import { Form, Navigate, json, redirect } from "react-router-dom";
import axios from "axios";
import useSignUp from "@hooks/useSignUp";

const SignUp = () => {
  const {
    accessToken,
    register,
    errors,
    emailAvailabilityStatus,
    emailOnBlurHanlder,
    navigate,
  } = useSignUp();

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Heading content="SignUp" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form method="POST">
            <Input
              label="firstName"
              register={register}
              errors={errors.firstName?.message}
              name="firstName"
              type="text"
            />
            <Input
              label="lastName"
              register={register}
              errors={errors.lastName?.message}
              name="lastName"
              type="text"
            />
            <Input
              label="email"
              register={register}
              errors={errors.email?.message}
              name="email"
              type="text"
              availability={
                emailAvailabilityStatus === "available"
                  ? "Available email"
                  : emailAvailabilityStatus === "notAvailable"
                  ? "Email already used"
                  : emailAvailabilityStatus === "failed"
                  ? "Server error"
                  : ""
              }
              pending={
                emailAvailabilityStatus === "checking"
                  ? emailAvailabilityStatus
                  : ""
              }
              onBlur={emailOnBlurHanlder}
            />
            <Input
              label="password"
              register={register}
              errors={errors.password?.message}
              name="password"
              type="password"
            />
            <Input
              label="confirmPassword"
              register={register}
              errors={errors.confirmPassword?.message}
              name="confirmPassword"
              type="password"
            />

            <FormB.Group className="mb-3" controlId="formBasicCheckbox">
              <FormB.Check type="checkbox" label="Check me out" />
            </FormB.Group>

            <Button
              variant="info"
              type="submit"
              style={{ color: "white", marginBottom: "100px" }}
              disabled={
                emailAvailabilityStatus === "notAvailable" ||
                emailAvailabilityStatus === "checking" ||
                navigate.state === "submitting"
              }
            >
              {navigate.state === "submitting" ? (
                <>
                  <Spinner animation="border" size="sm" /> ...Loading
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SignUp;

export const authRegister = async ({ request }) => {
  const data = await request.formData();

  const event = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    password: data.get("password"),
  };
  try {
    await axios.post("http://localhost:4000/register", event);
  } catch (error) {
    throw json({ message: "error in SignUp" }, { status: 400 });
  }
  return redirect("/signIn?message=Account created successfully");
};
