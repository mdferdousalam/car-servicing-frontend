import { useGetUserByIdQuery } from "../redux/features/auth/auth";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "./hook";


const useCurrentUser = () => {
  // Get the current user from Redux state
  const user = useAppSelector(selectCurrentUser);

  // Fetch additional data related to the user, if necessary
  const { data: userData, isLoading: userIsLoading } = useGetUserByIdQuery(
    user?.userId,
    {
      skip: !user?.userId,
    }
  );

  return {
    userData: userData?.data,
    userIsLoading,
  };
};

export default useCurrentUser;
