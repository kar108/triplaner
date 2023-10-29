import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Input, Typography} from '../components';
import {base, styles} from '../assets/styles';
import {COLORS, SIZES, DIMENSIONS} from '../utils/constants';
import auth from '@react-native-firebase/auth';
import {useLoader, useSnackbar, useStore} from '../hooks';
import {useUserDispatch, useUserState} from '../hooks/globalState';
import {useNavigation} from '@react-navigation/native';
import {Formik, FormikProps} from 'formik';
import * as yup from 'yup';


type FormType = {
  email: string;
  password: string;
};

type typeError = {
  password: boolean;
};

const Login = () => {
  const snackbar = useSnackbar();

  const dispatch = useUserDispatch();
  const {setToken, setCustomerId} = useStore();
  const userState = useUserState();
  const navigation = useNavigation<any>();
  const loader = useLoader();



  const EmailLoginSchema = yup.object().shape({
    email: yup
      .string()
      .test('check email', 'Please enter your Email ID', function (value: any) {
        setEmailError({status:false,msg:''});
        const emailPattern =
          /^\s*[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\s*$/;
        return emailPattern.test(value);
      })
      .required('Please enter your Email ID'),
    password: yup
      .string()
      .test(
        'check password',
        'Please enter your password',
        function (value: any) {
          setError({...error, password: false});
          return true;
        },
      )
      .required('Please enter your password'),
  });


  const [form, setForm] = useState<FormType>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<typeError>({
    password: false,
  });

  const [emailError, setEmailError] = useState<any>({status:false,msg:''});

  console.log('form', form);



  const handleLogin = async (values: any) => {
    try {
      const {email, password} = values;
      setError({...error, password: false});
      // setEmailError(false);
      loader.start();
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          // Signed in
          console.log('User logged in through email: ', email, userCredential);
          const user:any = userCredential.user;
          console.log(user, 'user');
          dispatch({auth: true, email:user?.email , userId :user?.uid , fullName:user?.displayName});
        })
        .catch((err: any) => {
          loader.stop();
          console.log(err.code);
          console.log(err.message);
          if (
            err.code === 'auth/user-not-found'
          ) {
            setEmailError({status:true,msg:'Email ID is not registered with this account'});
          }
          if (
            err.code === 'auth/invalid-email'
          ) {
            setEmailError({status:true,msg:'Invalid Email ID'});
          }
          
          if (
            err.code === 'auth/invalid-password' ||
            err.code === 'auth/wrong-password'
          ) {
            setError({...error, password: true});
          }
          if (err.code === 'auth/too-many-requests') {
            snackbar.show({
              message: 'Too many request! Try again later',
              type: snackbar.types.ERROR,
            });
          }
          if (err.code === 'auth/network-request-failed') {
            snackbar.show({
              message: 'Network request failed',
              type: snackbar.types.ERROR,
            });
          }
          if (err.code === 'auth/invalid-login') {
            setError({...error, password: true});
          }
        });
    } catch (e) {
      console.log('Login error:', e);
      setError({...error, password: true});
      setEmailError({status:true,msg:'Invalid Email ID'});
    }
  };


  const {
    py_l,
    px_s,
    d_flex,
    align_center,
    mt_m,
    mt_l,
    mt_xxs,
    mb_xs,
    mb_m,
    m_xs,
    op50,
  } = base;
  return (
      <View style={[base.px_m,py_l,d_flex]}>
        <Typography align='center' textColor='primary' size={40} weight='BLD' style={[base.mb_s,{fontWeight:'800'}]} >Login</Typography>
        <Formik
          initialValues={form}
          onSubmit={(values: FormType) => {
            console.log(values, 'val');
            handleLogin({...values, email: values.email.trim()});
          }}
          validationSchema={EmailLoginSchema}>
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
                onBlur={handleBlur('email')}
                wrapperStyle={{
                  borderColor: COLORS.gray6,
                  borderWidth: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.20)',
                }}
                placeholderTextColor={COLORS.gray8}
                placeholder="Email"
                value={values.email.trim()}
                onChange={handleChange('email')}
                autoCapitalize="none"
                label={emailError.status ? '' : 'Provide registered email address'}
                errorText={errors.email}
                touched={touched.email}
              />
              {emailError.status ? (
                <View style={[base.row, base.d_flex, base.mt_xxs, base.w_90]}>
                  {/* <Icon style={[base.mr_xxs]} name="error" /> */}
                  <Typography
                    weight="REG"
                    textColor="error"
                    style={[base.mb_xs]}
                    size={SIZES.unit * 13}>
                    {emailError.msg}
                  </Typography>
                </View>
              ) : null}
              <Input
                passwordIcon={true}
                wrapperStyle={{
                  borderColor: COLORS.gray6,
                  borderWidth: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.20)',
                }}
                placeholderTextColor={COLORS.gray8}
                placeholder="Password"
                value={values.password}
                onBlur={handleBlur('password')}
                onChange={handleChange('password')}
                label={error.password ? '' : 'Provide your registered password'}
                errorText={errors.password}
                touched={touched.password}
                secureTextEntry={true}
              />
              {error.password ? (
                <View style={[base.row, base.d_flex, base.mt_xxs, base.w_90]}>
                  {/* <Icon style={[base.mr_xxs]} name="error" /> */}
                  <Typography
                    weight="REG"
                    textColor="error"
                    style={[base.mb_xs]}
                    size={SIZES.unit * 13}>
                    Wrong password. Try again or click ‘Forgot password’ to
                    reset it
                  </Typography>
                </View>
              ) : null}
              <View style={[mt_l]}>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignUp');}}>
                  <Typography
                    align="center"
                    textColor="primary"
                    style={[m_xs, mb_m]}
                    make500={true}
                    size={SIZES.unit * 14}>
                    Dont have an account ? Sign Up
                  </Typography>
                </TouchableOpacity>
                <Button
                  disabled={!values.email || !values.password}
                  testId="login"
                  textColor="white"
                  style={{backgroundColor: COLORS.primary}}
                  size={18}
                  textStyle={{fontWeight: '800'}}
                  onPress={handleSubmit}>
                  Login
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
  );
};

export default Login;
