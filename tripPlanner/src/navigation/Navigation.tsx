import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./stacks/Root";

function Navigation (): JSX.Element {

  return(
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default Navigation;
