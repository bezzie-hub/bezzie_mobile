import React, {useEffect, useState} from 'react';
import {Pressable, View, ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';
import {forwardRef} from 'react';

import useScale from '@utils/useScale';

import useStyles from './useStyles';

const NumericInput = forwardRef(
  (
    props: {
      onChange: (v: number) => any;
      value: number;
      totalWidth: number;
      totalHeight: number;
      minValue: number;
      editable: boolean;
      rounded: boolean;
      textColor: string;
      iconColor: string;
      iconSize: number;
      rightButtonBackgroundColor: string;
      leftButtonBackgroundColor: string;
      inputStyle: ViewStyle;
      borderColor: string;
      showBorder?: boolean;
    },
    ref: any,
  ) => {
    const styles = useStyles();
    const {ms} = useScale();

    const {
      onChange,
      value,
      totalWidth,
      totalHeight,
      editable,
      rounded,
      textColor,
      iconColor,
      iconSize,
      rightButtonBackgroundColor,
      leftButtonBackgroundColor,
      inputStyle,
      showBorder,
      borderColor,
    } = props;

    const [cQty, setCQty] = useState(value);

    const onQtyChange = (v: number) => {
      setCQty(v);
      onChange(v);
    };

    useEffect(() => {
      setCQty(value);
    }, [value]);

    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.numericInput,
          borderRadius: rounded ? ms(5) : 0,
          height: totalHeight - ms(2),
          borderWidth: showBorder ? ms(1) : 0,
          borderColor: borderColor,
        }}>
        <Pressable
          onPress={() => {
            onQtyChange(cQty - 1);
          }}
          style={{
            ...styles.leftBtn,
            backgroundColor: leftButtonBackgroundColor,
            width: totalWidth / 3,
          }}>
          <Ionicons name="remove" color={iconColor} size={iconSize} />
        </Pressable>
        <TextInput
          ref={ref}
          editable={editable}
          enabled={editable}
          style={{
            ...styles.textInput,
            color: textColor,
            width: totalWidth / 3,
            ...inputStyle,
          }}
          value={cQty.toString()}
          onChangeText={t => {
            onQtyChange(parseInt(t, 10));
          }}
          keyboardType="number-pad"
        />
        <Pressable
          onPress={() => {
            onQtyChange(cQty + 1);
          }}
          style={{
            ...styles.rightBtn,
            backgroundColor: rightButtonBackgroundColor,
            width: totalWidth / 3,
          }}>
          <Ionicons name="add" color={iconColor} size={iconSize} />
        </Pressable>
      </View>
    );
  },
);

export default NumericInput;
