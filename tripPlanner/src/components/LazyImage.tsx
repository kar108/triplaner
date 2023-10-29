import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
// import {SvgUri} from 'react-native-svg';

import {base} from '../assets/styles';
import {COLORS, DIMENSIONS, SIZES} from '../utils/constants';
import Typography from './Typography';
import Icon from './Icon';
import {useNavigation} from '@react-navigation/native';
// import FastImage from 'react-native-fast-image';
// import coverImage from "../assets/images/coverImage"

type Props = {
  backIcon?: boolean;
  url: string;
  style?: StyleProp<ImageStyle | ViewStyle>;
  lazy?: boolean;
  height?: number;
  width?: number;
  showLoader?: boolean;
  showError?: boolean;
  errorFallback?: JSX.Element;
  dynamic?: boolean;
};

function LazyImage({
  backIcon = false,
  url,
  style,
  height = 2,
  width = 2,
  lazy = true,
  showLoader = true,
  showError = false,
  errorFallback,
}: Props): JSX.Element {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState<boolean>(lazy);
  const [error, setError] = useState<boolean>(false);

  const isSvg = url?.includes?.('.svg');

  const stopLoading = () => {
    setLoading(false);
  };

  const startLoading = () => {
    setLoading(true);
  };

  const setErrorState = () => setError(true);

  const getSource = () => {
    if (url) {
      return {uri: url};
    } else {
      return require('../assets/images/defaultProfileImage.png');
    }
    return undefined;
  };

  if (error && showError) {
    return (
      errorFallback || (
        <Typography size={SIZES.font} textColor="form" align="center" mb={1}>
          Image not found
        </Typography>
      )
    );
  }

  if (isSvg) {
    return (
      // <SvgUri
      //   renderToHardwareTextureAndroid
      //   uri={url}
      //   style={[getStyles(height, width), style, base.bg_white]}
      // />
      <></>
    );
  }

  // Image.getSize(url,(w,h)=>{
  //   console.log(url);
  //   console.log('w ->',w);
  //   console.log('h ->',h);
  // })

  return (
    <View style={styles.relative}>
      {backIcon ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            zIndex: 80,
            top: DIMENSIONS.hp(4),
            left: DIMENSIONS.wp(4),
          }}>
          <Icon name="lessthan" />
        </TouchableOpacity>
      ) : null}
      
      <Image
        source={getSource()}
        style={[
          getStyles(height, width),
          style as ImageStyle,
          base.bg_white as ImageStyle,
        ]}
        onLoadEnd={stopLoading}
        onLoadStart={startLoading}
        onError={setErrorState}
      />
      {/* <FastImage
                  style={[
                    getStyles(height, width),
                    style as ImageStyle,
                    base.bg_white as ImageStyle,
                  ]}
                  source={getSource()}
                /> */}
      {/* {loading && showLoader ? (
        <View style={[styles.skeleton]}>
          <ActivityIndicator color={COLORS.primary} />
        </View>
      ) : null} */}
    </View>
  );
}

const getStyles = function (y: number, x: number): ImageStyle {
  return StyleSheet.create({
    icon: {
      height: DIMENSIONS.hp(y),
      width: DIMENSIONS.hp(x),
      resizeMode: 'cover',
    },
  }).icon;
};

const styles = StyleSheet.create({
  relative: {
    position: 'relative',
  },
  skeleton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LazyImage;
