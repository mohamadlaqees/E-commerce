import { useNavigation } from "react-router-dom";
import { useAppSelector } from "./hooks";
import { useForm } from "react-hook-form";
import { TFormInputs } from "@util/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@Validation/SignUpSchema";
import useCheckEmailAvailability from "./useCheckEmailAvailability";

const useSignUp = () => {
  const navigate = useNavigation();
  const { accessToken } = useAppSelector((state) => state.authSlice);

  const {
    register,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm<TFormInputs>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const {
    checkEmailAvailability,
    emailAvailabilityStatus,
    enteredEmail,
    setEmailAvailabilityStatus,
    setEnteredEmail,
  } = useCheckEmailAvailability();

  const emailOnBlurHanlder = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== e.target.value) {
      checkEmailAvailability(e.target.value);
    }
    if (isDirty && invalid) {
      setEnteredEmail(null);
      setEmailAvailabilityStatus("idle");
    }
  };

  return {
    navigate,
    emailAvailabilityStatus,
    emailOnBlurHanlder,
    register,
    errors,
    accessToken,
  };
};

export default useSignUp;
