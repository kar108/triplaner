import React from 'react';
import {Text, View} from 'react-native';
import {Button, Icon, Typography} from '../components';
import {base} from '../assets/styles';
import {COLORS, SIZES} from '../utils/constants';
import { useNavigation } from '@react-navigation/native';

function Landing() {
  const {
    px_s,
    d_flex,
    justify_center,
    align_center,
    mt_xxl,
    mt_xl,
    mt_l,
    row,
    mb_xxs,
    ml_xs,
    py_xl,
    bg_primary,
  } = base;

  const navigation = useNavigation<any>();

  return (
    <View style={[d_flex, align_center, {flex: 1,justifyContent:'space-evenly'},px_s,base.py_xs,]}>
      <Typography textColor='primary' size={50} weight='BLD' style={{fontWeight:'800'}} >TriPlaner</Typography>
      <Icon height={20} width={40} name="logo" />
      <View style={[px_s,{width:'100%'}]}>
      <Button
        textColor="white"
        style={[{backgroundColor: COLORS.primary,width:'100%'}]}
        size={18}
        textStyle={{fontWeight: '800'}}
        onPress={() => { navigation.navigate('SignUp');}}>
        Signup
      </Button>
      <Button
        textColor="white"
        style={{backgroundColor: COLORS.primary}}
        size={18}
        textStyle={{fontWeight: '800'}}
        onPress={() => { navigation.navigate('Login');}}>
        Login
      </Button>
      </View>
    </View>
  );
}

export default Landing;
