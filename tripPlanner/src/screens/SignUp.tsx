import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {base, styles} from '../assets/styles';
import {Button, Icon, Input, Typography} from '../components';
import {COLORS, DIMENSIONS, SIZES} from '../utils/constants';
import auth from '@react-native-firebase/auth';
import {useLoader, useSnackbar, useStore} from '../hooks';
import {useUserDispatch, useUserState} from '../hooks/globalState';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';

type typeError = {
  email: boolean;
  password: boolean;
};

const SignUp = () => {
  const dispatch = useUserDispatch();
  const navigation = useNavigation<any>();
  const userState = useUserState();
  const snackbar = useSnackbar();
  const GlobalLoader = useLoader();

  const [error, setError] = useState<typeError>({
    email: false,
    password: false,
  });

  const [emailError, setEmailError] = useState<any>({status: false, msg: ''});
  const [credential, setCredential] = useState<any>(null);
  const {setToken, setCustomerId} = useStore();

  const registerSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please enter username'),
    email: yup
      .string()
      .test('check email', 'Please enter your Email ID', function (value: any) {
        setEmailError({status: false, msg: ''});
        const emailPattern =
          /^\s*[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\s*$/;
        return emailPattern.test(value);
      })
      .required('Please enter your Email ID'),
    password: yup
      .string()
      .required(
        'Minimum 8 characters with uppercase and lowercase letters, numbers & symbols',
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Minimum 8 characters with uppercase and lowercase letters, numbers & symbols',
      ),
  });

  async function createAccount(values: any) {
    GlobalLoader.start();
    auth()
      .createUserWithEmailAndPassword(
        values.email,
        values.password,
      )
      .then(async(res:any) => {
        console.log(res,'User account created & signed in!');
        await auth().currentUser?.updateProfile({displayName:values?.name});
        dispatch({auth: true, email:res?.user?.email , userId :res?.user?.uid , fullName:values?.name});
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setEmailError({
            status: true,
            msg: 'Provided Email ID is already registered with us',
          });
        }
        if (error.code === 'auth/provider-already-linked') {
          setEmailError({
            status: true,
            msg: 'Provided Email is already registered with us',
          });
        }
        if (error.code === 'auth/unknown') {
          setEmailError({
            status: true,
            msg: 'Provided Email is already registered with us',
          });
        }
        if (error.code === 'auth/invalid-email') {
          setEmailError({status: true, msg: 'Invalid Email'});
        }
        GlobalLoader.stop();
      });
    // try {
    //   const credential = auth.EmailAuthProvider.credential(
    //     values.email,
    //     values.password,
    //   );
    //   setCredential(credential);
    //   let userData = await auth().currentUser?.linkWithCredential(credential);

      // dispatch({...userState, auth: true});
    // } catch (error: any) {
    //   if (error.code === 'auth/email-already-in-use') {
    //     setEmailError({
    //       status: true,
    //       msg: 'Provided Email ID is already registered with us',
    //     });
    //   }
    //   if (error.code === 'auth/provider-already-linked') {
    //     setEmailError({
    //       status: true,
    //       msg: 'Provided Email is already registered with us',
    //     });
    //   }
    //   if (error.code === 'auth/unknown') {
    //     setEmailError({
    //       status: true,
    //       msg: 'Provided Email is already registered with us',
    //     });
    //   }
    //   if (error.code === 'auth/invalid-email') {
    //     setEmailError({status: true, msg: 'Invalid Email'});
    //   }
    //   GlobalLoader.stop();
    // }
  }

  const handleNext = (values: any) => {
    createAccount(values);
  };

  const {
    mt_xxs,
    d_flex,
    align_center,
    mb_s,
    row,
    mt_m,
    pl_xl,
    bg_white20,
    justify_between,
    w_100,
  } = base;

  return (
    <View style={[base.px_m, base.py_l, d_flex]}>
      <Typography
        align="center"
        textColor="primary"
        size={40}
        weight="BLD"
        style={[base.mb_s, {fontWeight: '800'}]}>
        SignUp
      </Typography>
      <Formik
        initialValues={{email: '', password: '',name:''}}
        onSubmit={(values: any) => {
          handleNext({
            ...values,
            email: values.email.trim(),
          });
        }}
        validationSchema={registerSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          setFieldValue,
        }) => (
          <>
          <Input
              onBlur={handleBlur('name')}
              autoCapitalize="none"
              wrapperStyle={{borderColor: COLORS.gray6, borderWidth: 1}}
              placeholderTextColor={COLORS.gray8}
              placeholder="Username"
              value={values.name}
              onChange={handleChange('name')}
              label="Enter username"
              errorText={errors.name}
              touched={touched.name}
            />
            <Input
              onBlur={handleBlur('email')}
              autoCapitalize="none"
              wrapperStyle={{borderColor: COLORS.gray6, borderWidth: 1}}
              placeholderTextColor={COLORS.gray8}
              placeholder="Email"
              value={values.email.trim()}
              onChange={handleChange('email')}
              label="Enter your email id"
              errorText={errors.email}
              touched={touched.email}
            />
            {emailError.status ? (
              <View
                style={[
                  base.row,
                  base.d_flex,
                  base.mt_xxs,
                  base.w_90,
                  base.mb_xs,
                ]}>
                {/* <Icon style={[base.mr_xxs]} name="error" /> */}
                <Typography
                  weight="REG"
                  textColor="error"
                  size={SIZES.unit * 13}>
                  {emailError.msg}
                </Typography>
              </View>
            ) : null}
            <Input
              passwordIcon={true}
              secureTextEntry={true}
              wrapperStyle={{borderColor: COLORS.gray6, borderWidth: 1}}
              placeholderTextColor={COLORS.gray8}
              placeholder="Create password"
              onBlur={handleBlur('password')}
              value={values.password}
              onChange={handleChange('password')}
              label="Minimum 8 characters with uppercase and lowercase letters, numbers & symbols."
              errorText={errors.password}
              touched={touched.password}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Typography
                align="center"
                textColor="primary"
                style={[base.mt_l, base.mb_m]}
                make500={true}
                size={SIZES.unit * 14}>
                Already have an account? Login
              </Typography>
            </TouchableOpacity>
            <Button
              disabled={
                !values.email || !values.password || !values.name || errors.email ? true : false
              }
              testId="next"
              textColor="white"
              style={[mt_m, base.bg_primary]}
              onPress={handleSubmit}>
              SignUp
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const Styles = StyleSheet.create({
  paperCont: {
    width: '47.5%',
  },
  actionBox: {
    position: 'absolute',
    top: 0,
    right: '80%',
    bottom: 0,
    width: DIMENSIONS.wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  number: {
    // width:'85%',
    // marginLeft:'2%'
  },
  btn: {
    width: '48.75%',
  },
  searchBar: {
    backgroundColor: COLORS.gray35,
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray35,
    width: '100%',
    height: 112,
    borderRadius: 10,
  },
  paperActive: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 112,
    borderRadius: 10,
    borderColor: COLORS.light_primary,
    backgroundColor: COLORS.gray35,
    borderWidth: 2,
  },
  paperActive1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.light_primary,
    width: '100%',
    height: 112,
    borderRadius: 10,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray3,
    flex: 1,
  },
});

export default SignUp;
