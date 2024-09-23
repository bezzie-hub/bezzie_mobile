import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import InputStructure from '../../inputStructure/inputStructure';
import useLoginStyles from './useLoginStyles';

import useLoginState from './useLoginState';
import {setAuthModalStatus} from '@src/store/slices/other';

const LoginModal: React.FC<any> = () => {
  const {colors} = useTheme();
  const styles = useLoginStyles();

  const {
    showPassword,
    loading,
    setFieldTouched,
    values,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    dispatch,
    setEmail,
  } = useLoginState();

  return (
    <View style={styles.container}>
      <Text maxFontSizeMultiplier={1} style={styles.head}>
        LOGIN
      </Text>
      <InputStructure
        label={'Email'}
        error={errors.username && touched.username ? errors.username : ''}>
        <TextInput
          maxFontSizeMultiplier={1}
          placeholder={'Email'}
          style={styles.input}
          placeholderTextColor={colors.border}
          value={values.username}
          onChangeText={(v: string) => {
            setFieldValue('username', v);
          }}
          onBlur={() => {
            setFieldTouched('username');
          }}
        />
      </InputStructure>
      <InputStructure
        label={'Password'}
        error={errors.password && touched.password ? errors.password : ''}>
        <TextInput
          maxFontSizeMultiplier={1}
          placeholder={'Password'}
          style={[styles.input, styles.passwordInput]}
          placeholderTextColor={colors.border}
          value={values.password}
          secureTextEntry={!showPassword}
          onChangeText={v => {
            setFieldValue('password', v);
          }}
          onBlur={() => {
            setFieldTouched('password');
          }}
        />
      </InputStructure>
      <View style={styles.bottom}>
        <Pressable
          onPress={() => {
            if (values.username && !errors.username && setEmail) {
              setEmail(values.username);
            }
            dispatch(setAuthModalStatus('forgotPassword'));
          }}>
          <Text maxFontSizeMultiplier={1} style={styles.forgotText}>
            Forgot Password?
          </Text>
        </Pressable>
        <Pressable
          style={[styles.btnContainer, styles.btnStyle]}
          android_ripple={{
            radius: 20,
            borderless: true,
            color: colors.white,
          }}
          onPress={() => handleSubmit()}>
          {loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text maxFontSizeMultiplier={1} style={[styles.btnTitle]}>
              Login
            </Text>
          )}
        </Pressable>
      </View>
      <View style={styles.signUp}>
        <Text maxFontSizeMultiplier={1} style={styles.signupText}>
          Don't have an account?{' '}
          <Text
            onPress={() => {
              dispatch(setAuthModalStatus('signup'));
            }}
            maxFontSizeMultiplier={1}
            style={styles.signUpTextBtn}>
            Signup
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginModal;
