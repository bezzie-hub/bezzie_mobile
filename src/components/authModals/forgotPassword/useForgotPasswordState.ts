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
  username: string;
}

function useForgotPasswordState() {
  const {error, loading} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const AuthModalCtxConsumer = useContext(AuthModalCtx);

  const ForgotPasswordSchema = Yup.object().shape({
    username: Yup.string()
      .matches(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        'Please enter a valid email',
      )
      .required('Email is Required'),
  });

  const onSubmit = async (
    values: Values,
    {setSubmitting, resetForm}: FormikHelpers<Values>,
  ) => {
    AuthService.forgotPassword(values)
      .then(res => {
        if (res.status_code === 200) {
          if (AuthModalCtxConsumer?.setEmail) {
            AuthModalCtxConsumer.setEmail(values.username);
          }
          showToast('OTP Send Successfully to the mail-Id');
          dispatch(setAuthModalStatus('forgot-otp'));
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
      username: AuthModalCtxConsumer?.email || '',
    },
    validationSchema: ForgotPasswordSchema,
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

export default useForgotPasswordState;
