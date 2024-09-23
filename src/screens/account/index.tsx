import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import useStyles from './useStyles';
import useCommonStyles from '@config/useCommonStyles';
import OptimizedScene from '@components/optimizedScene';
import {ScrollView} from 'react-native-gesture-handler';

import CustomStatusBar from '@components/customStatusBar';
import Item from './item';
import useScale from '@utils/useScale';

import useGetTheme from '@utils/useGetTheme';
import {ROUTER} from '@navigations/routes';
import {deleteAccount, logout} from '@src/store/slices/user';
import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConfirmModal from '@src/components/confirmModal';

const Account = (props: any) => {
  const {colors} = useTheme();
  const {ms} = useScale();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const {isDark} = useGetTheme();
  const dispatch = useAppDispatch();
  const {isAuthenticated, user} = useAppSelector(state => state.user);
  const [confirmLogoutVisible, setConfirmLogoutVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);

  const contentList = isAuthenticated
    ? [
        'orders',
        'address',
        'change-password',
        'settings',
        'privacy-policy',
        'contact',
        'delete-account',
        'logout',
      ]
    : ['settings', 'privacy-policy', 'contact'];

  const renderContent = (
    key:
      | 'orders'
      | 'address'
      | 'change-password'
      | 'settings'
      | 'privacy-policy'
      | 'contact'
      | 'logout'
      | 'delete-account',
    index: number,
  ) => {
    switch (key) {
      case 'orders':
        return (
          <Item
            key="orders"
            name={'Orders'}
            onPress={() => {
              props.navigation.navigate(ROUTER.ORDERS);
            }}
            icon=""
            index={index}
            alternativeIcon={
              <MaterialIcons
                color={colors.text}
                name="local-mall"
                size={ms(20)}
                style={styles.leftIcon}
                allowFontScaling={false}
              />
            }
          />
        );

      case 'address':
        return (
          <Item
            key="address"
            name={'Addresses'}
            onPress={() => {
              props.navigation.navigate(ROUTER.ADDRESSES);
            }}
            icon=""
            index={index}
            alternativeIcon={
              <FontAwesome
                color={colors.text}
                name="address-card"
                size={ms(20)}
                style={styles.leftIcon}
                allowFontScaling={false}
              />
            }
          />
        );
      case 'change-password':
        return (
          <Item
            key="change-password"
            name={'Change Password'}
            onPress={() => {
              props.navigation.navigate(ROUTER.CHANGE_PASSWORD);
            }}
            icon=""
            index={index}
            alternativeIcon={
              <MaterialCommunityIcons
                color={colors.text}
                name="key-change"
                size={ms(20)}
                style={styles.leftIcon}
                allowFontScaling={false}
              />
            }
          />
        );
      case 'settings':
        return (
          <Item
            key="settings"
            name={'Settings'}
            onPress={() => {
              props.navigation.navigate(ROUTER.SETTINGS);
            }}
            icon="settings"
            index={index}
          />
        );
      case 'privacy-policy':
        return (
          <Item
            key="privacy-policy"
            name={'Privacy Policy'}
            onPress={() => {}}
            icon="document-text"
            index={index}
          />
        );
      case 'contact':
        return (
          <Item
            key="contact"
            name={'Contact Us'}
            onPress={() => {}}
            icon="call"
            index={index}
          />
        );
      case 'logout':
        return (
          <Item
            key="logout"
            name={'Sign Out'}
            onPress={() => {
              setConfirmLogoutVisible(true);
            }}
            icon="log-out"
            index={index}
          />
        );
      case 'delete-account':
        return (
          <Item
            key="delete-account"
            name={'Delete Account'}
            onPress={() => {
              setDeleteAccountModalVisible(true);
            }}
            icon=""
            index={index}
            alternativeIcon={
              <MaterialCommunityIcons
                color={colors.text}
                name="account-remove"
                size={ms(20)}
                style={styles.leftIcon}
                allowFontScaling={false}
              />
            }
          />
        );
    }
  };

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <ConfirmModal
        key="logout-modal"
        confirmText="Are you sure to Logout? Please confirm to logout of this
      application."
        onCancel={() => setConfirmLogoutVisible(false)}
        onConfirm={() => {
          setConfirmLogoutVisible(false);
          dispatch(logout());
        }}
        open={confirmLogoutVisible}
        setOpen={setConfirmLogoutVisible}
      />
      <ConfirmModal
        key="delete-modal"
        confirmText="Are you sure to Delete your account? Please confirm to delete your account."
        onCancel={() => setDeleteAccountModalVisible(false)}
        onConfirm={() => {
          setDeleteAccountModalVisible(false);
          dispatch(deleteAccount());
        }}
        open={deleteAccountModalVisible}
        setOpen={setDeleteAccountModalVisible}
      />
      <OptimizedScene>
        <ScrollView
          style={[styles.container]}
          contentContainerStyle={styles.contentContainer}>
          <Text style={[commonStyles.headText]} allowFontScaling={false}>
            Account
          </Text>
          {isAuthenticated && (
            <View style={styles.accountCard}>
              <Ionicons
                color={colors.text}
                name={'person'}
                size={ms(40)}
                style={styles.accountIcon}
                allowFontScaling={false}
              />
              <View>
                <Text style={styles.fullName} maxFontSizeMultiplier={1}>
                  {user?.full_name}
                </Text>
                <Text style={styles.email} maxFontSizeMultiplier={1}>
                  {user?.email}
                </Text>
              </View>
            </View>
          )}
          <View style={[styles.innerContainer]}>
            {contentList.map((key, index) => renderContent(key as any, index))}
          </View>
        </ScrollView>
      </OptimizedScene>
    </>
  );
};

export default Account;
