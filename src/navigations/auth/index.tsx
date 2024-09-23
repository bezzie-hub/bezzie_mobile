import React, {createContext, useState} from 'react';
import LoginModal from '@components/authModals/login/login';
import ModalStructure from '@components/modalStructure';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setAuthModalStatus} from '@store/slices/other';
import SignupModal from '@src/components/authModals/signup';
import {View} from 'react-native';
import ForgotPasswordModal from '@src/components/authModals/forgotPassword';
import ForgotPasswordOtpModal from '@src/components/authModals/forgotPasswordOtp';
import ResetPasswordModal from '@src/components/authModals/resetPassword';

export const navigationRef: any = React.createRef();

type ContextType = {
  email: string;
  setEmail: (v: string) => void;
  otpVerificationToken: string;
  setOtpVerificationToken: (v: string) => void;
};

export const AuthModalCtx = createContext<ContextType | undefined>({
  email: '',
  setEmail: () => {},
  otpVerificationToken: '',
  setOtpVerificationToken: () => {},
});

function Auth(): JSX.Element {
  const {authModalStatus} = useAppSelector(state => state.other);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [otpVerificationToken, setOtpVerificationToken] = useState('');

  function clearAuthModal() {
    dispatch(setAuthModalStatus('none'));
  }

  function renderModalContent() {
    switch (authModalStatus) {
      case 'login':
        return <LoginModal />;

      case 'signup':
        return <SignupModal />;

      case 'forgotPassword':
        return <ForgotPasswordModal />;

      case 'forgot-otp':
        return <ForgotPasswordOtpModal />;

      case 'resetPassword':
        return <ResetPasswordModal />;

      default:
        return <View />;
    }
  }

  return (
    <>
      <ModalStructure
        modalVisible={authModalStatus !== 'none'}
        setModalVisible={clearAuthModal}>
        <AuthModalCtx.Provider
          value={{
            email,
            setEmail,
            otpVerificationToken,
            setOtpVerificationToken,
          }}>
          {renderModalContent()}
        </AuthModalCtx.Provider>
      </ModalStructure>
    </>
  );
}

export default Auth;
