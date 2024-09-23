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
import useForgotPasswordState from './useForgotPasswordState';

const ForgotPasswordModal: React.FC<any> = () => {
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
  } = useForgotPasswordState();

  return (
    <View style={styles.container}>
      <Text maxFontSizeMultiplier={1} style={styles.head}>
        Forgot Password
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

export default ForgotPasswordModal;
