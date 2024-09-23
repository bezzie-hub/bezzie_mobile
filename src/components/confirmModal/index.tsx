import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import useStyles from './useStyles';
import ModalStructure from '@src/components/modalStructure';

const ConfirmModal = ({
  open,
  onCancel,
  onConfirm,
  setOpen,
  confirmText,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  setOpen: (v: boolean) => void;
  confirmText: string;
}) => {
  const {colors} = useTheme();
  const styles = useStyles();

  return (
    <ModalStructure modalVisible={open} setModalVisible={setOpen}>
      <View style={styles.confirmContentContainer}>
        <Text maxFontSizeMultiplier={1} style={styles.confirmText}>
          {confirmText}
        </Text>
        <View style={[styles.btnContainer]}>
          <Pressable
            style={[styles.btn, styles.cancelBtn]}
            android_ripple={{
              radius: 20,
              borderless: true,
              color: colors.white,
            }}
            onPress={onCancel}>
            <Text
              allowFontScaling={false}
              style={[styles.btnText, styles.cancelBtnText]}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.confirmBtn]}
            android_ripple={{
              radius: 20,
              borderless: true,
              color: colors.white,
            }}
            onPress={onConfirm}>
            <Text
              allowFontScaling={false}
              style={[styles.btnText, styles.confirmBtnText]}>
              Confirm
            </Text>
          </Pressable>
        </View>
      </View>
    </ModalStructure>
  );
};

export default ConfirmModal;
