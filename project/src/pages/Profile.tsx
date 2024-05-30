import { Heading } from "@components/common/Heading/Heading";
import { useAppSelector } from "@hooks/hooks";

const Profile = () => {
  const accountInfo = useAppSelector((state) => state.authSlice.user);
  return (
    <>
      <Heading content="Account Info" />
      <ul>
        <li>First Name : {accountInfo?.firstName}</li>
        <li>Last Name : {accountInfo?.firstName}</li>
        <li>Email : {accountInfo?.email}</li>
      </ul>
    </>
  );
};

export default Profile;
