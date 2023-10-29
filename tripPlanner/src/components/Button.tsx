import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent
} from "react-native";

import { COLORS, DIMENSIONS, SIZES } from "../utils/constants";
import { Color } from "../utils/types";
import { base } from "../assets/styles";
import Typography from "./Typography";

type Props = {
  testId?:string;
  children: React.ReactNode;
  onPress: any;
  textColor?: Color;
  disabled?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

function Button ({
  testId,
  children,
  onPress,
  textColor = "white",
  disabled = false,
  size = SIZES.xl,
  style,
  textStyle
}: Props):JSX.Element {

  const { align_center, justify_center, bg_white } = base;

  // const opacity = disabled? .6: 1;

  return(
    <TouchableOpacity

    testID={testId}
      style={disabled?[styles.buttonContainer, align_center, justify_center, style ,{backgroundColor:COLORS.gray8}]:[styles.buttonContainer, align_center, justify_center, bg_white, style]}
      onPress={onPress}
      disabled={disabled}

    >
      <Typography
        size={size}
        textColor={disabled?'gray6':textColor}
        weight="BLD"
        style={[textStyle]}
      >
        {children}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn:{
    fontWeight:'bold'
  },
  buttonContainer: {
    width: '100%',
    borderRadius: SIZES.l,
    marginBottom: DIMENSIONS.hp(1.5),
    padding: DIMENSIONS.wp(4),
    borderColor: COLORS.white,
    borderWidth: 1,
  }
})

export default Button