import * as Yup from 'yup';
import {useDebouncedCallback} from 'use-debounce';
import {FormikHelpers, useFormik} from 'formik';

import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import {setAuthModalStatus} from '@src/store/slices/other';
import AuthService from '@src/services/auth.service';
import showToast from '@src/utils/showToast';
import {AuthModalCtx} from '@src/navigations/auth';
import {useContext} from 'react';

interface Values {
  otp: string;
}

function useForgotPasswordOtpState() {
  const {error, loading} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const AuthModalCtxConsumer = useContext(AuthModalCtx);

  const ForgotPasswordOtpSchema = Yup.object().shape({
    otp: Yup.string()
      .length(6, 'Please enter a valid OTP')
      .required('OTP is Required'),
  });

  const onSubmit = async (
    values: Values,
    {setSubmitting, resetForm}: FormikHelpers<Values>,
  ) => {
    AuthService.forgotPasswordverifyOtp({
      ...values,
      username: AuthModalCtxConsumer?.email || '',
    })
      .then(res => {
        if (res.status_code === 200) {
          AuthModalCtxConsumer?.setOtpVerificationToken(res.data.token);
          dispatch(setAuthModalStatus('resetPassword'));
          resetForm();
        } else {
          throw new Error(res.message);
        }
      })
      .catch(err => {
        showToast(err.message || 'something went wrong');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const debouncedSubmit = useDebouncedCallback(onSubmit, 300);

  const {
    handleChange,
    setFieldTouched,
    values,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: ForgotPasswordOtpSchema,
    onSubmit: debouncedSubmit,
  });

  return {
    loading,
    error,
    handleChange,
    setFieldTouched,
    values,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    dispatch,
  };
}

export default useForgotPasswordOtpState;
