import { TInput } from "@util/types";
import { Form, InputGroup, Spinner } from "react-bootstrap";
import { FieldValues } from "react-hook-form";

const Input = <TFieldValue extends FieldValues>({
  register,
  errors,
  label,
  name,
  type,
  availability,
  pending,
  onBlur,
}: TInput<TFieldValue>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control
          type={type}
          {...register(name)}
          isInvalid={
            errors ||
            availability === "Email already used" ||
            availability === "failed"
              ? true
              : false
          }
          isValid={availability === "Available email" ? true : false}
          onBlur={onBlurHandler}
          prefix="tesr"
          disabled={pending === "checking"}
          autoComplete="password"
        />
        {pending === "checking" ? (
          <InputGroup.Text>
            <Spinner animation="border" size="sm" variant="primary" />
          </InputGroup.Text>
        ) : (
          ""
        )}
        <Form.Control.Feedback type="invalid">
          {availability === "Email already used" || availability === "failed"
            ? availability
            : errors}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="valid">
          {availability}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export default Input;
