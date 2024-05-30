import { TStatus } from "@util/types";
import axios from "axios";
import { useState } from "react";

const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TStatus>("idle");
  const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setEnteredEmail(email);
    setEmailAvailabilityStatus("checking");
    try {
      const response = await axios.get(
        `http://localhost:4000/users?email=${email}`
      );
      if (response.data.length) {
        setEmailAvailabilityStatus("notAvailable");
      } else {
        setEmailAvailabilityStatus("available");
      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
    }
  };
  return {
    checkEmailAvailability,
    emailAvailabilityStatus,
    enteredEmail,
    setEnteredEmail,
    setEmailAvailabilityStatus
  };
};

export default useCheckEmailAvailability;
