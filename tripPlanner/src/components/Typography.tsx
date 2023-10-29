import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle, TouchableOpacity, View } from "react-native";

import { COLORS, DIMENSIONS, FONTS, SIZES } from "../utils/constants";
import { Color, Font } from "../utils/types";
import { base } from "../assets/styles";
import Button from "./Button";

type Props = {
  children: React.ReactNode;
  textColor?: Color;
  size?: number;
  weight?: Font;
  style?: StyleProp<TextStyle>;
  lines?: number;
  align?: "left" | "center" | "right";
  mb?: number;
  make500?:boolean;
  testID?:string;
}

function Typography ({
  children,
  textColor = "text",
  size = SIZES.xl,
  weight = "REG",
  style,
  lines,
  align = "left",
  mb = 0,
  make500=false,
  testID
}: Props): JSX.Element {

  const fontStyle = make500 ? getStyles1(textColor, size, align, mb) : getStyles(textColor, size,weight, align, mb)
  const {d_flex,row}=base;

  return(
      <Text
      style={[fontStyle,{fontWeight:make500?'500':undefined}, style]}
      // style={[{fontWeight:'500'}]}
      numberOfLines={lines}
      testID={testID}
    >
      {children}
    </Text>
  );
}

function getStyles1 (
  color: Color,
  size: number,
  align: "left" | "center" | "right",
  mb: number,
): TextStyle {
  return StyleSheet.create({
    textStyle: {
      color: COLORS[color],
      fontSize: size,
      textAlign: align,
      marginBottom: DIMENSIONS.hp(mb),
      fontWeight:'500'
    }
  }).textStyle;
}

function getStyles (
  color: Color,
  size: number,
  font: Font,
  align: "left" | "center" | "right",
  mb: number,
): TextStyle {
  return StyleSheet.create({
    textStyle: {
      color: COLORS[color],
      fontSize: size,
      fontFamily: FONTS[font],
      textAlign: align,
      marginBottom: DIMENSIONS.hp(mb),
      fontWeight:'500'
    }
  }).textStyle;
}

export default Typography;