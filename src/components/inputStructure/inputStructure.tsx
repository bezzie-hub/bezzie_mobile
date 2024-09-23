import {useTheme} from '@react-navigation/native';
import {FormikErrors} from 'formik';
import React from 'react';
import {Text, View, ViewStyle} from 'react-native';

import useStyles from './useStyles';

interface PropTypes {
  label: string;
  children: React.ReactNode;
  error?: string | FormikErrors<any> | string[] | FormikErrors<any>[];
  required?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: ViewStyle;
}

const InputStructure: React.FC<PropTypes> = ({
  label,
  children,
  error,
  required,
  containerStyle,
  labelStyle,
}) => {
  const {colors} = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.input}>
      <View
        style={{
          ...styles.inputItem,
          ...containerStyle,
          borderColor: error ? colors.dangerBackground : colors.border,
        }}>
        <Text
          maxFontSizeMultiplier={1}
          style={{
            ...styles.label,
            color: colors.text,
            backgroundColor: colors.background,
            ...labelStyle,
          }}>
          {label}
          <Text maxFontSizeMultiplier={1} style={styles.req}>
            {required ? '*' : ''}
          </Text>
        </Text>
        <View style={styles.inputContainer}>{children}</View>
      </View>
      {error && (
        <Text maxFontSizeMultiplier={1} style={{...styles.errorText}}>
          {(error as string) || ''}
        </Text>
      )}
    </View>
  );
};

export default InputStructure;
