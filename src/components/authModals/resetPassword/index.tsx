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
import useStyles from './useStyles';

import {setAuthModalStatus} from '@src/store/slices/other';
import useResetPasswordState from './useResetPasswordState';

const ResetPasswordModal: React.FC<any> = () => {
  const {colors} = useTheme();
  const styles = useStyles();

  const {
    loading,
    setFieldTouched,
    values,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    dispatch,
  } = useResetPasswordState();

  return (
    <View style={styles.container}>
      <Text maxFontSizeMultiplier={1} style={styles.head}>
        Forgot Password
      </Text>
      <InputStructure
        label={'Password'}
        error={errors?.password && touched.password ? errors.password : ''}>
        <TextInput
          maxFontSizeMultiplier={1}
          placeholder={'Password'}
          style={styles.input}
          placeholderTextColor={colors.border}
          value={values.password}
          secureTextEntry={true}
          onChangeText={(v: string) => {
            setFieldValue('password', v);
          }}
          onBlur={() => {
            setFieldTouched('password');
          }}
        />
      </InputStructure>
      <InputStructure
        label={'Confirm Password'}
        error={
          errors?.re_password && touched.re_password ? errors.re_password : ''
        }>
        <TextInput
          maxFontSizeMultiplier={1}
          placeholder={'Confirm Password'}
          style={styles.input}
          placeholderTextColor={colors.border}
          value={values.re_password}
          secureTextEntry={true}
          onChangeText={(v: string) => {
            setFieldValue('re_password', v);
          }}
          onBlur={() => {
            setFieldTouched('re_password');
          }}
        />
      </InputStructure>

      <View style={styles.bottom}>
        <Pressable
          onPress={() => {
            dispatch(setAuthModalStatus('login'));
          }}>
          <Text maxFontSizeMultiplier={1} style={styles.gobackText}>
            Back to Login
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
              Submit
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default ResetPasswordModal;
