import {useContext, useEffect, useState} from 'react';
import * as Yup from 'yup';
import {useDebouncedCallback} from 'use-debounce';
import {FormikHelpers, useFormik} from 'formik';

import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import {clearError, login} from '@src/store/slices/user';
import {ModalCtx} from '@components/modalStructure';
import {AuthModalCtx} from '@src/navigations/auth';

interface Values {
  username: string;
  password: string;
}

function useLoginState() {
  const {error, loading} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const ModalCtxConsumer = useContext(ModalCtx);
  const AuthModalCtxConsumer = useContext(AuthModalCtx);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is Required'),
    password: Yup.string().required('Password is Required'),
  });

  const onSubmit = async (
    values: Values,
    {setSubmitting, resetForm}: FormikHelpers<Values>,
  ) => {
    const params = {
      username: values.username,
      password: values.password,
    };
    const resultAction = await dispatch(login(params));
    if (login.fulfilled.match(resultAction)) {
      ModalCtxConsumer?.setModalVisible(false);
      resetForm();
    }
    setSubmitting(false);
  };

  const debouncedSubmit = useDebouncedCallback(onSubmit, 300);

  const {
    setFieldError,
    handleChange,
    setFieldTouched,
    values,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      username: 'testuseremail@yopmail.com',
      password: 'admin@123',
    },
    validationSchema: LoginSchema,
    onSubmit: debouncedSubmit,
  });

  useEffect(() => {
    if (error) {
      setFieldError('password', error);
      dispatch(clearError());
    }
  }, [dispatch, error, setFieldError]);

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
    setEmail: AuthModalCtxConsumer?.setEmail,
  };
}

export default useLoginState;
