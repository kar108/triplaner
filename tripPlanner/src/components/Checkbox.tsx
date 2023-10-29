import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";

import { COLORS, DIMENSIONS, SIZES } from "../utils/constants";
import { base } from "../assets/styles";
import Typography from "./Typography";
import Icon from "./Icon";

type Props = {
  children?: JSX.Element;
  onPress: (status: boolean) => void;
  checked?: boolean;
  errorText?: string;
  style?: StyleProp<ViewStyle>;
  strict?: boolean;
  reRender?: boolean
}

function Checkbox ({ children, onPress, style, checked = false, errorText, strict = false, reRender = false }: Props): JSX.Element {

  const [status, setStatus] = useState<boolean>(checked);

  const anchor = strict? checked : status;

  useEffect(() => {
    if(reRender) {
      setStatus(checked)
    }
  }, [checked])

  const toggleStatus = (): void => {
    if(strict) {
      onPress(!status);
    } else {
      setStatus(prev => {
        onPress(!prev);
        return !prev;
      });
    }
  }
  const renderIcon = (): React.ReactNode => {
    if(anchor){
      return <Icon name="tick" height={1.5} width={1.5} style={{tintColor:'primary'}} />;
    }
    return null;
  }

  const renderError = (): React.ReactNode => {
    if(errorText){
      return <Typography size={SIZES.l} textColor="error" style={[base.mb_0, base.mt_xs]}>{errorText}</Typography>;
    }
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={[base.row, styles.row]}>
        <TouchableOpacity
          onPress={toggleStatus}
          style={[styles.box, anchor ? styles.checked : styles.unChecked]}
        >
          {renderIcon()}
        </TouchableOpacity>
        {/* {children} */}
      </View>
      {renderError()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DIMENSIONS.hp(1.5),
  },
  row: {
    alignItems: "center"
  },
  box: {
    height: DIMENSIONS.hp(2),
    width: DIMENSIONS.hp(2),
    borderRadius: SIZES.xxs,
    borderWidth: SIZES.xxs,
    marginRight: DIMENSIONS.wp(2),
    alignItems: "center",
    justifyContent: "center"
  },
  checked: {
    backgroundColor: COLORS.white,
    borderRadius:6,
    padding:7,
  },
  unChecked: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.white
  }
});

export default Checkbox;