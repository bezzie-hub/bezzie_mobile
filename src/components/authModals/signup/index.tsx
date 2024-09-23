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
import useSignupStyles from './useSignupStyles';

import useSignupState from './useSignupState';
import {setAuthModalStatus} from '@src/store/slices/other';

const SignupModal: React.FC<any> = () => {
  const {colors} = useTheme();
  const styles = useSignupStyles();

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
  } = useSignupState();

  return (
    <View style={styles.container}>
      <Text maxFontSizeMultiplier={1} style={styles.head}>
        SIGNUP
      </Text>
      <InputStructure
        label={'Email'}
        error={errors.email && touched.email ? errors.email : ''}>
        <TextInput
          maxFontSizeMultiplier={1}
          placeholder={'Email'}
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor={colors.border}
          value={values.email}
          onChangeText={(v: string) => {
            setFieldValue('email', v);
          }}
          onBlur={() => {
            setFieldTouched('email');
          }}
        />
      </InputStructure>
      <InputStructure
        label={'Name'}
        error={errors.full_name && touched.full_name ? errors.full_name : ''}>
        <TextInput
          maxFontSizeMultiplier={1}
          placeholder={'Name'}
          style={styles.input}
          placeholderTextColor={colors.border}
          value={values.full_name}
          onChangeText={(v: string) => {
            setFieldValue('full_name', v);
          }}
          onBlur={() => {
            setFieldTouched('full_name');
          }}
        />
      </InputStructure>
      <InputStructure
        label={'Mobile'}
        error={
          errors.mobile_number && touched.mobile_number
            ? errors.mobile_number
            : ''
        }>
        <TextInput
          maxFontSizeMultiplier={1}
          placeholder={'Mobile'}
          style={styles.input}
          keyboardType="number-pad"
          placeholderTextColor={colors.border}
          value={values.mobile_number}
          onChangeText={(v: string) => {
            setFieldValue('mobile_number', v);
          }}
          onBlur={() => {
            setFieldTouched('mobile_number');
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
          style={[styles.btnContainer, styles.btnStyle]}
          android_ripple={{
            radius: 20,
            borderless: true,
            color: colors.white,
          }}
          disabled={loading}
          onPress={() => handleSubmit()}>
          {loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text maxFontSizeMultiplier={1} style={[styles.btnTitle]}>
              Signup
            </Text>
          )}
        </Pressable>
      </View>
      <View style={styles.signUp}>
        <Text maxFontSizeMultiplier={1} style={styles.signupText}>
          Already have an account?{' '}
          <Text
            onPress={() => {
              dispatch(setAuthModalStatus('login'));
            }}
            maxFontSizeMultiplier={1}
            style={styles.signUpTextBtn}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignupModal;
