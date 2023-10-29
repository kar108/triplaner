import React, { createContext, useState, useMemo, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { User } from "./types";
import { useStore } from "../hooks";

const initState: User = {
  data: {
    auth:false,
    userId: "",
    fullName: "",
    email:''
},
  update: () => {}
}

// This context stores the user's data globally and provides a function to update it.

const UserContext = createContext<User>(initState);

type Props = {
  children: React.ReactNode;
}

function UserProvider ({ children }: Props): JSX.Element {

  const [user, setUser] = useState<User["data"]>(initState.data);
  const userState = useMemo(() => user, [user, setUser]);
  const isMounted = useRef<boolean>(false);
  const dispatch = useDispatch();
  const { setToken,setCustomerId,setSearchKeys} = useStore();

  const saveState = async (): Promise<void> => {
    const currentState = JSON.stringify(userState);
    await AsyncStorage.setItem("user", currentState);
  }

  const loadState = async (): Promise<void> => {
    const savedState = await AsyncStorage.getItem("user");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setToken(parsedState.token || "")
      setCustomerId(parsedState.userId || "")
      setUser(parsedState);
      setSearchKeys(parsedState.keys||[])
    }
  }

  useEffect(() => {
    // AsyncStorage.clear();
    // console.log("useeffect in context")
    if (isMounted.current) {
      saveState();
    }
  }, [userState]);

  useEffect(() => {
    loadState();
    isMounted.current = true;
  },[]);

  // console.log("UserProvider", userState.token);
  // console.log("UserStore", rest.token);
  return(
    <UserContext.Provider
      value={{
        data: userState,
        update: setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export {
  UserContext,
  UserProvider
}


