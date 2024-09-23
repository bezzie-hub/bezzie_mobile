import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import useStyles from './useStyles';
import useCommonStyles from '@config/useCommonStyles';
import OptimizedScene from '@components/optimizedScene';

import Header from '@components/header';
import CustomStatusBar from '@components/customStatusBar';
import useGetTheme from '@utils/useGetTheme';
import InputStructure from '@src/components/inputStructure/inputStructure';
import useChangePasswordState from './useChangePasswordState';

const ChangePassword = (_props: any) => {
  const {colors} = useTheme();
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const {isDark} = useGetTheme();
  const {
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    values,
    isSubmitting,
    handleSubmit,
  } = useChangePasswordState();

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <OptimizedScene>
        <View
          style={[
            commonStyles.container,
            {backgroundColor: colors.background},
          ]}>
          <Header title={'Change Password'} />
          <ScrollView
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            style={[styles.container]}
            contentContainerStyle={styles.contentContainer}>
            <InputStructure
              label={'Old Password'}
              error={
                errors?.old_password && touched.old_password
                  ? errors.old_password
                  : ''
              }>
              <TextInput
                maxFontSizeMultiplier={1}
                placeholder={'Old Password'}
                style={styles.input}
                placeholderTextColor={colors.border}
                value={values.old_password}
                secureTextEntry={true}
                onChangeText={(v: string) => {
                  setFieldValue('old_password', v);
                }}
                onBlur={() => {
                  setFieldTouched('old_password');
                }}
              />
            </InputStructure>
            <InputStructure
              label={'Password'}
              error={
                errors?.password && touched.password ? errors.password : ''
              }>
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
                errors?.re_password && touched.re_password
                  ? errors.re_password
                  : ''
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
                style={[styles.btnContainer, styles.btnStyle]}
                android_ripple={{
                  radius: 20,
                  borderless: true,
                  color: colors.white,
                }}
                onPress={() => {
                  Keyboard.dismiss();
                  handleSubmit();
                }}>
                {isSubmitting ? (
                  <ActivityIndicator color={colors.white} size="small" />
                ) : (
                  <Text maxFontSizeMultiplier={1} style={[styles.btnTitle]}>
                    Submit
                  </Text>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </OptimizedScene>
    </>
  );
};

export default ChangePassword;
