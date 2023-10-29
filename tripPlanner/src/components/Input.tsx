import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextStyle,
  ImageStyle,
} from 'react-native';

import {base} from '../assets/styles';
import {COLORS, DIMENSIONS, FONTS, SIZES} from '../utils/constants';
import Icon from './Icon';
import Typography from './Typography';

type Props = {
  iconTextPlaceHolder?: string;
  label?: string;
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  disabled?: boolean;
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  errorText?: any;
  touched?: any;
  maxLength?: number;
  multiline?: boolean;
  minimumHeight?: number;
  passwordIcon?: boolean;
  tooltipInfo?: string;
  selectionColor?:string;
  icon?: {
    name: string;
    action: () => void;
  };
  style?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  IconContainerStyle?: StyleProp<ViewStyle>;
  iconText?: string;
  testId?: string;
  editable?:boolean;
  autofocus?:boolean
};

function Input({
  iconTextPlaceHolder,
  iconText = '',
  label = '',
  value,
  onChange,
  placeholderTextColor = '',
  placeholder = '',
  onBlur = () => {},
  onFocus = () => {},
  disabled = false,
  autoCorrect = false,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  errorText = '',
  touched = false,
  maxLength = 50,
  multiline = false,
  minimumHeight,
  passwordIcon = false,
  tooltipInfo = '',
  icon = {name: '', action: () => {}},
  style,
  wrapperStyle,
  inputStyle,
  iconStyle,
  IconContainerStyle,
  testId,
  editable,
  selectionColor=COLORS.gray45,
  autofocus=false
}: Props): JSX.Element {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const isErrorVisible = errorText && touched;

  // console.log(isErrorVisible,errorText,touched,"visible")

  const containerStyles = {
    borderColor: isErrorVisible ? COLORS.error : COLORS.border,
  };

  const togglePasswordVisibility = (): void =>
    setIsPasswordVisible(prev => !prev);

  const renderLabel = (): React.ReactNode => {
    if (!label || isErrorVisible) return;
    return (
      <Typography
        align="left"
        textColor="gray7"
        style={[base.mb_xs]}
        size={SIZES.unit * 13}>
        {label}
      </Typography>
    );
  };

  const renderIcon = (): React.ReactNode => {
    if (icon.name === 'searchbar') {
      return (
        <TouchableOpacity onPress={icon.action} style={styles.searchBox}>
          <Icon name={icon.name} width={2.5} height={2.5} style={iconStyle} />
        </TouchableOpacity>
      );
    }
    if (icon.name) {
      return (
        <TouchableOpacity
          onPress={icon.action}
          style={[styles.actionBox, IconContainerStyle]}>
          {iconText?<Typography size={SIZES.xl} textColor="black" weight="REG">
            {iconText}
          </Typography>:null}
          <Icon
            name={icon.name}
            width={2}
            height={2}
            style={[iconStyle, base.ml_l]}
          />
        </TouchableOpacity>
      );
    } else if (passwordIcon) {
      return (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.actionBox}>
          <Icon
            name={isPasswordVisible ? 'eyeClosed' : 'eyeOpen'}
            width={2.5}
            height={2.5}
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderError = (): React.ReactNode => {
    // console.log(errorText,"text")
    if (!isErrorVisible) return null;
    return (
      <View style={[base.row, base.d_flex, base.mt_xxs, base.w_90, base.mb_xs]}>
        {/* <Icon style={[base.mr_xxs]} name="error" /> */}
        <Typography weight="REG" textColor="error" size={SIZES.unit * 13}>
          {errorText}
        </Typography>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.wrapper,
          containerStyles,
          disabled ? base.bg_lgray : base.bg_white,
          wrapperStyle,
        ]}>
        {renderIcon()}
        <TextInput
        autoFocus={autofocus}
          selectionColor={selectionColor}
          testID={testId}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onFocus={onFocus}
          onBlur={onBlur}
          editable={!disabled}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          multiline={multiline}
          style={[
            styles.input,
            multiline ? styles.topAlign : {},
            inputStyle,
            minimumHeight ? {minHeight: minimumHeight} : {},
          ]}
        />
      </View>
      {renderLabel()}
      {renderError()}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    // marginBottom: DIMENSIONS.hp(0.0),
  },
  wrapper: {
    width: '100%',
    position: 'relative',
    marginBottom: DIMENSIONS.hp(0.5),
    borderColor: COLORS.white20,
    borderRadius: SIZES.m,
    flexDirection: 'row',
  },
  input: {
    padding:DIMENSIONS.wp(4),
    fontFamily: FONTS.REG,
    fontSize: SIZES.xl,
    width: '100%',
    color: COLORS.black,
    // caretColor: 'red',
  },
  actionBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: DIMENSIONS.wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  searchBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: '4%',
    
  },
  passwordIcon: {
    tintColor: COLORS.gray8,
  },
  topAlign: {
    textAlignVertical: 'top',
  },
});

export default Input;
