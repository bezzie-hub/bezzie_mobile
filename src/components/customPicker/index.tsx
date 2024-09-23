import React from 'react';
import {ActionSheetIOS, Platform, Pressable, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

import useStyles from './useStyles';
import useGetTheme from '@src/utils/useGetTheme';

const CustomPicker: React.FC<{
  label: string;
  onBlur: () => void;
  onValueChange: (_v: any) => void;
  items: {value: any; label: any}[];
  selectedValue: any;
  hidePlaceholder?: boolean;
  enabled?: boolean;
  showPickerForIos?: boolean;
  overridePickerBackground?: string;
}> = ({
  label,
  onBlur,
  onValueChange,
  items,
  selectedValue,
  hidePlaceholder,
  enabled = true,
  overridePickerBackground,
}) => {
  const {colors} = useTheme();
  const styles = useStyles({
    overridePickerBackground,
  });
  const {isDark} = useGetTheme();

  const formPicker = () => {
    let list = items.map(v => v.label);

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', ...list],
        cancelButtonIndex: 0,
        userInterfaceStyle: isDark ? 'dark' : 'light',
      },
      buttonIndex => {
        if (buttonIndex && items[buttonIndex - 1]) {
          onValueChange(items[buttonIndex - 1].value);
        }
      },
    );
  };

  return Platform.OS !== 'ios' ? (
    <Picker
      selectedValue={selectedValue}
      style={styles.dropdown}
      numberOfLines={1}
      mode="dropdown"
      dropdownIconColor={colors.text}
      enabled={enabled}
      onBlur={onBlur}
      onValueChange={onValueChange}>
      {!hidePlaceholder && (
        <Picker.Item
          label={label}
          value={''}
          color={colors.text}
          style={styles.pickerItemStyle}
          key="placeholder"
        />
      )}
      {items.map(v => (
        <Picker.Item
          key={v.value}
          label={v.label}
          value={v.value}
          color={colors.text}
          style={styles.pickerItemStyle}
        />
      ))}
    </Picker>
  ) : (
    <Pressable
      style={styles.iosBtn}
      disabled={!enabled}
      onPress={() => {
        formPicker();
      }}>
      <Text
        maxFontSizeMultiplier={1}
        allowFontScaling={false}
        style={styles.iosText}>
        {selectedValue
          ? items.find(v => v.value === selectedValue)?.label
          : label}
      </Text>
    </Pressable>
  );
};
export default CustomPicker;
