import * as Yup from 'yup';
import {useDebouncedCallback} from 'use-debounce';
import {FormikHelpers, useFormik} from 'formik';
import showToast from '@src/utils/showToast';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/navigations/routes';
import {useAppSelector} from '@src/store/hooks';
import AuthService from '@src/services/auth.service';

type ChangePassword = {
  old_password: string;
  password: string;
  re_password: string;
};

function useChangePasswordState() {
  const {goBack} = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {user} = useAppSelector(state => state.user);

  const ChangePasswordSchema = Yup.object().shape({
    old_password: Yup.string().required('Old Password is Required'),
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$@#%])(?!.* ).{6,20}$/,
        "Password Should have at least one number, one uppercase and one lowercase character, one special symbol('$', '@', '#', '%') and between 6 to 20 characters long.",
      )
      .required('New Password is Required'),
    re_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is Required'),
  });

  const onSubmit = async (
    values: ChangePassword,
    {setSubmitting, resetForm}: FormikHelpers<ChangePassword>,
  ) => {
    try {
      const res = await AuthService.changePassword({
        ...values,
        username: user?.email || '',
      });
      if (res.status_code === 200) {
        showToast('Password Updated');
        resetForm();
        goBack();
      } else if (res.status_code === 403) {
        setErrors(res.data);
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      showToast(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
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
    isSubmitting,
  } = useFormik({
    initialValues: {
      old_password: '',
      password: '',
      re_password: '',
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: debouncedSubmit,
  });

  return {
    handleChange,
    setFieldTouched,
    values,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    isSubmitting,
  };
}

export default useChangePasswordState;
