import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import useStyles from './useStyles';

import {setAuthModalStatus} from '@src/store/slices/other';
import useForgotPasswordState from './useForgotPasswordOtpState';

const ForgotPasswordOtpModal: React.FC<any> = () => {
  const {colors} = useTheme();
  const styles = useStyles();

  const {
    loading,
    values,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    dispatch,
  } = useForgotPasswordState();

  return (
    <View style={styles.container}>
      <Text maxFontSizeMultiplier={1} style={styles.head}>
        Verify OTP
      </Text>

      <OTPInputView
        style={styles.otp}
        pinCount={6}
        onCodeChanged={code => {
          setFieldValue('otp', code);
        }}
        code={values.otp}
        autoFocusOnLoad
        codeInputFieldStyle={styles.otpItem}
        codeInputHighlightStyle={styles.otpItem}
        selectionColor={colors.text}
      />

      <View style={styles.errContainer}>
        {errors.otp && touched.otp ? (
          <Text maxFontSizeMultiplier={1} style={styles.errorText}>
            {errors.otp}
          </Text>
        ) : (
          <View />
        )}
      </View>

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

export default ForgotPasswordOtpModal;
