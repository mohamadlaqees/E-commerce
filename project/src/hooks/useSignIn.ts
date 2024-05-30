import {
  useActionData,
  useNavigate,
  useSearchParams,
  useNavigation,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { IAuthSlice, TFormInputs } from "@util/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@Validation/SignInSchema";
import { useEffect } from "react";
import axios from "axios";
import { addUser, saveToken } from "@store/Auth/authSlice";

const useSignIn = () => {
  const [message, setMessage] = useSearchParams();
  const redirect = useNavigate();
  const navigate = useNavigation();
  const response = useActionData() as IAuthSlice;
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.authSlice);

  const {
    register,
    formState: { errors },
  } = useForm<TFormInputs>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (
      response !== null &&
      response !== undefined &&
      !axios.isAxiosError(response)
    ) {
      if (message.get("message")) {
        setMessage("");
      }
      const token = response.accessToken;
      const user = response.user;
      dispatch(saveToken({ token }));
      dispatch(addUser({ user }));
      redirect("/");
    }
  }, [response, dispatch, redirect, setMessage, message]);

  return { accessToken, message, register, errors, navigate, response };
};

export default useSignIn;
