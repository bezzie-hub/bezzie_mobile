import {useTheme} from '@react-navigation/native';
import React, {createContext} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useScale from '@utils/useScale';
import useStyles from './useStyles';

interface PropType {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
  children: React.ReactNode;
}

type ContextType = {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
};

export const ModalCtx = createContext<ContextType | undefined>({
  modalVisible: false,
  setModalVisible: () => {},
});

const ModalStructure: React.FC<PropType> = ({
  modalVisible,
  setModalVisible,
  children,
}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const {ms} = useScale();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      statusBarTranslucent
      style={styles.modal}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <KeyboardAvoidingView behavior={'padding'}>
        <TouchableOpacity
          style={styles.modal}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}>
          <Pressable onPress={() => {}} style={styles.content}>
            <Pressable
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={ms(17)} color={colors.secondary} />
            </Pressable>
            <ModalCtx.Provider
              value={{
                modalVisible: modalVisible,
                setModalVisible: setModalVisible,
              }}>
              {children}
            </ModalCtx.Provider>
          </Pressable>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalStructure;
