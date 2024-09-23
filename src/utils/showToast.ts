import {Alert, Platform, ToastAndroid} from 'react-native';

const showToast = (msg: string, time?: 'long' | 'short') => {
  Platform.OS === 'android' &&
    ToastAndroid.showWithGravityAndOffset(
      msg,
      time === 'long' ? ToastAndroid.LONG : ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      50,
    );
  Platform.OS === 'ios' &&
    Alert.alert(msg, undefined, [{text: 'OK'}], {
      cancelable: false,
    });
};

export default showToast;
