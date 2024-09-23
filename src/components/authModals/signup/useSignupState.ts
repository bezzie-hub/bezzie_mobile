import {useContext, useEffect, useState} from 'react';
import * as Yup from 'yup';
import {useDebouncedCallback} from 'use-debounce';
import {FormikHelpers, useFormik} from 'formik';

import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import {clearError, signup} from '@src/store/slices/user';
import {ModalCtx} from '@components/modalStructure';

interface Values {
  email: string;
  full_name: string;
  password: string;
  mobile_number: string;
}

function useLoginState() {
  const {error, loading, signupErrors} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const ModalCtxConsumer = useContext(ModalCtx);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        'Please enter a valid email',
      )
      .required('Email is Required'),
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$@#%])(?!.* ).{6,20}$/,
        "Password Should have at least one number, one uppercase and one lowercase character, one special symbol('$', '@', '#', '%') and between 6 to 20 characters long.",
      )
      .required('Password is Required'),
    full_name: Yup.string()
      .matches(/^[\w][\w\'\-]*( \w[\w\'\-]*)*$/, 'Please enter a valid name')
      .required('FullName is Required'),
    mobile_number: Yup.string()
      .matches(
        /([0-9\ \+\_\-\,\.\*\#\(\)]){1,20}$/,
        'Please enter a valid Phone number',
      )
      .required('MobileNumber is Required'),
  });

  const onSubmit = async (
    values: Values,
    {setSubmitting, resetForm}: FormikHelpers<Values>,
  ) => {
    dispatch(clearError());
    const params = {
      email: values.email,
      full_name: values.full_name,
      password: values.password,
      mobile_number: values.mobile_number,
    };
    const resultAction = await dispatch(signup(params));
    if (signup.fulfilled.match(resultAction)) {
      ModalCtxConsumer?.setModalVisible(false);
      resetForm();
    }
    setSubmitting(false);
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
    setErrors,
  } = useFormik({
    initialValues: {
      email: '',
      full_name: '',
      password: '',
      mobile_number: '',
    },
    validationSchema: SignupSchema,
    onSubmit: debouncedSubmit,
  });

  useEffect(() => {
    if (Object.keys(signupErrors).length > 0) {
      let err = signupErrors;
      setErrors(err);
      dispatch(clearError());
    }
  }, [dispatch, signupErrors, setErrors]);

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

export default useLoginState;
