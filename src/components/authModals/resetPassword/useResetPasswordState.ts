import {useContext, useState} from 'react';
import * as Yup from 'yup';
import {useDebouncedCallback} from 'use-debounce';
import {FormikHelpers, useFormik} from 'formik';

import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import {setAuthModalStatus} from '@src/store/slices/other';
import AuthService from '@src/services/auth.service';
import showToast from '@src/utils/showToast';
import {AuthModalCtx} from '@src/navigations/auth';

interface Values {
  password: string;
  re_password: string;
}

function useResetPasswordState() {
  const {error, loading} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const AuthModalCtxConsumer = useContext(AuthModalCtx);

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$@#%])(?!.* ).{6,20}$/,
        "Password Should have at least one number, one uppercase and one lowercase character, one special symbol('$', '@', '#', '%') and between 6 to 20 characters long.",
      )
      .required('Password is Required'),
    re_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('ConfirmPassword is Required'),
  });

  const onSubmit = async (
    values: Values,
    {setSubmitting, resetForm}: FormikHelpers<Values>,
  ) => {
    AuthService.resetPassword({
      ...values,
      username: AuthModalCtxConsumer?.email || '',
      token: AuthModalCtxConsumer?.otpVerificationToken || '',
    })
      .then(res => {
        if (res.status_code === 200) {
          AuthModalCtxConsumer?.setEmail && AuthModalCtxConsumer.setEmail('');
          AuthModalCtxConsumer?.setOtpVerificationToken &&
            AuthModalCtxConsumer.setOtpVerificationToken('');
          showToast('Password Reset Successfull');
          dispatch(setAuthModalStatus('login'));
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
      password: '',
      re_password: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: debouncedSubmit,
  });

  return {
    showPassword,
    setShowPassword,
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

export default useResetPasswordState;
