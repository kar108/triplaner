import { useContext } from "react";

import { UserContext } from "../stores";
import { User } from "../stores/types";

// Hook to get the data from the UserContext
const useUserState = (): User["data"] => useContext(UserContext).data;

// Hook to get the update function from the UserContext
const useUserDispatch = (): User["update"] => useContext(UserContext).update;

export {
  useUserState,
  useUserDispatch,
}