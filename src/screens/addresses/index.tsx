import React from 'react';
import {Text, View, FlatList, Pressable, ActivityIndicator} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import useStyles from './useStyles';
import useCommonStyles from '@config/useCommonStyles';
import OptimizedScene from '@components/optimizedScene';
import Swipe from '@components/swipeActions';

import AnimatedListItem from '@components/animatedListItem';
import Header from '@components/header';
import useGetOrientation from '@utils/useGetOrientation';
import CustomStatusBar from '@components/customStatusBar';
import useGetTheme from '@utils/useGetTheme';
import useAddressesState from './useAddressesState';
import {ROUTER, RootStackParamList} from '@src/navigations/routes';
import {StackNavigationProp} from '@react-navigation/stack';
import ConfirmModal from '@src/components/confirmModal';

const Addresses = (props: any) => {
  const {colors} = useTheme();
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const orientation = useGetOrientation();
  const {isDark} = useGetTheme();
  const {
    addresses,
    loading,
    onDeleteAddress,
    isDeletingAddress,
    setDeleteAddressOpen,
    deleteAddressOpen,
    clearDeleteAddress,
  } = useAddressesState();
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

  const renderItem = ({item, index}: any) => {
    return (
      <AnimatedListItem index={index} styles={[styles.animItem]}>
        <Swipe
          containerStyle={styles.swipeContainerStyle}
          itemStyle={[styles.item]}
          leftIcon={{
            type: 'material',
            name: 'edit',
          }}
          rightIcon={{
            type: 'material',
            name: 'delete-outline',
          }}
          leftIconType="success"
          rightIconType="danger"
          leftAction={() => {
            navigate(ROUTER.CREATE_EDIT_ADDRESS! as keyof RootStackParamList, {
              address: item,
            });
          }}
          rightAction={() => {
            setDeleteAddressOpen({
              open: true,
              name: item.name,
              index: index,
              title: item.title,
            });
          }}>
          <View style={styles.itemLeft}>
            <View>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[styles.itemTitle]}>
                {item.custom_full_name}
              </Text>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[styles.itemDesc]}>
                {item.address_line1}
              </Text>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[styles.itemDesc]}>
                {item.address_line2}
              </Text>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[styles.itemDesc]}>
                {item.city}, {item.state},{item.pincode}
              </Text>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[styles.itemDesc]}>
                {item.country}
              </Text>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[styles.itemDesc]}>
                Phone number: {item.phone}
              </Text>
            </View>
          </View>
        </Swipe>
      </AnimatedListItem>
    );
  };

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <ConfirmModal
        confirmText={`Are you sure you want to delete this ${
          deleteAddressOpen.title || 'Address'
        }? Please confirm to delete this address.`}
        onCancel={clearDeleteAddress}
        onConfirm={() => {
          onDeleteAddress(deleteAddressOpen.name, deleteAddressOpen.index);
          clearDeleteAddress();
        }}
        open={deleteAddressOpen.open}
        setOpen={v => {
          if (!v) {
            clearDeleteAddress();
          }
        }}
      />
      <OptimizedScene loading={loading}>
        <View
          style={[
            commonStyles.container,
            {backgroundColor: colors.background},
          ]}>
          {isDeletingAddress && (
            <View style={styles.addressOverlay}>
              <ActivityIndicator color={colors.secondary} size={'large'} />
            </View>
          )}
          <Header title={'Addresses'} />
          <FlatList
            key={'cart-' + orientation}
            numColumns={orientation === 'LANDSCAPE' ? 2 : 1}
            style={[commonStyles.scrollContainer]}
            contentContainerStyle={commonStyles.scrollContent}
            data={addresses}
            keyExtractor={item => item.name}
            renderItem={renderItem}
            ListFooterComponent={
              <AnimatedListItem index={addresses.length}>
                <Pressable
                  onPress={() => {
                    props.navigation.navigate(ROUTER.CREATE_EDIT_ADDRESS);
                  }}
                  style={styles.addBtn}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.addAddress, {color: colors.success}]}>
                    Add New Address
                  </Text>
                </Pressable>
              </AnimatedListItem>
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText} maxFontSizeMultiplier={1}>
                  No Address Found
                </Text>
              </View>
            }
          />
        </View>
      </OptimizedScene>
    </>
  );
};

export default Addresses;
