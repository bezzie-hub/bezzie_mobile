import React, {useCallback, useState} from 'react';
import {Text, View, Pressable, Modal, ActivityIndicator} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useStyles from './useStyles';
import Swipe from '@components/swipeActions';
import AnimatedListItem from '@components/animatedListItem';

import useScale from '@utils/useScale';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddressService from '@src/services/address.service';
import showToast from '@src/utils/showToast';
import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTER, RootStackParamList} from '@src/navigations/routes';
import {produce} from 'immer';
import ConfirmModal from '@src/components/confirmModal';

const AddressModal: React.FC<{
  confirmOpen: boolean;
  cancelAction: () => void;
  selectedAddress: string;
  onSelectAddress: (address_name: string) => void;
  isUpdatingAddress: boolean;
}> = ({
  confirmOpen,
  cancelAction,
  selectedAddress,
  isUpdatingAddress,
  onSelectAddress,
}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const {ms} = useScale();
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeletingAddress, setIsDeletingAddress] = useState(false);
  const [deleteAddressOpen, setDeleteAddressOpen] = useState({
    open: false,
    name: '',
    index: -1,
    title: '',
  });

  const getAddresses = useCallback(() => {
    AddressService.getBillingAddresses()
      .then(async (res: any) => {
        if (res?.status_code === 200) {
          setAddresses(res?.data);
        } else {
          throw new Error(res.message);
        }
      })
      .catch(err => {
        showToast(err.message || 'something went wrong');
        setAddresses([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAddresses();
    }, [getAddresses]),
  );

  const onDeleteAddress = (name: string, index: number) => {
    setIsDeletingAddress(true);
    AddressService.deleteAddress(name)
      .then(res => {
        if (res.status_code === 200) {
          setAddresses(
            produce(draft => {
              draft.splice(index, 1);
            }),
          );
        } else {
          throw new Error(res?.message || '');
        }
      })
      .catch(err => {
        showToast(err.message || 'Something went wrong');
      })
      .finally(() => {
        setIsDeletingAddress(false);
      });
  };

  const clearDeleteAddress = () => {
    setDeleteAddressOpen({
      open: false,
      name: '',
      index: -1,
      title: '',
    });
  };

  return (
    <>
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
      <Modal
        visible={confirmOpen}
        statusBarTranslucent={true}
        animationType="slide"
        transparent={true}
        onDismiss={() => {
          cancelAction();
        }}
        onRequestClose={() => {
          cancelAction();
        }}>
        <GestureHandlerRootView style={styles.modalContainer}>
          <SafeAreaView style={styles.addressSafeView}>
            <View style={styles.modalContent}>
              {(isUpdatingAddress || isDeletingAddress) && (
                <View style={styles.addressOverlay}>
                  <ActivityIndicator color={colors.secondary} size={'large'} />
                </View>
              )}
              <Pressable style={styles.closeBtn} onPress={cancelAction}>
                <Ionicons name="close" color={colors.danger} size={ms(25)} />
              </Pressable>
              {loading ? (
                <View style={styles.emptyContainer}>
                  <ActivityIndicator color={colors.secondary} size={'small'} />
                </View>
              ) : (
                <FlatList
                  data={addresses}
                  stickyHeaderIndices={[0]}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={
                    <AnimatedListItem index={0} styles={[styles.modalListHead]}>
                      <Text
                        maxFontSizeMultiplier={1}
                        style={[styles.sectionHead, styles.modalHead]}>
                        Billing Address
                      </Text>
                    </AnimatedListItem>
                  }
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText} maxFontSizeMultiplier={1}>
                        No Address Found
                      </Text>
                    </View>
                  }
                  renderItem={({item, index}) => {
                    return (
                      <AnimatedListItem
                        index={index + 1}
                        key={item.name}
                        styles={[styles.animItem]}>
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
                            cancelAction();
                            navigate(
                              ROUTER.CREATE_EDIT_ADDRESS! as keyof RootStackParamList,
                              {
                                address: item,
                              },
                            );
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
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                                maxFontSizeMultiplier={1}
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
                                {item.city}, {item.state}, {item.pincode}
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
                          <View style={styles.right}>
                            <Pressable
                              disabled={isUpdatingAddress}
                              onPress={() => {
                                onSelectAddress(item.name);
                              }}
                              style={[
                                styles.iconBtn,
                                selectedAddress === item.name
                                  ? {
                                      backgroundColor: colors.switch,
                                    }
                                  : {backgroundColor: colors.lightPrimary},
                              ]}>
                              <MaterialIcons
                                color={colors.white}
                                name={'done'}
                                size={ms(20)}
                                maxFontSizeMultiplier={1}
                              />
                            </Pressable>
                          </View>
                        </Swipe>
                      </AnimatedListItem>
                    );
                  }}
                  ListFooterComponent={
                    <AnimatedListItem index={addresses.length + 1}>
                      <Pressable
                        style={styles.addAddressBtn}
                        onPress={() => {
                          cancelAction();
                          navigate(
                            ROUTER.CREATE_EDIT_ADDRESS! as keyof RootStackParamList,
                          );
                        }}>
                        <Text
                          maxFontSizeMultiplier={1}
                          style={[styles.addAddress]}>
                          Add New Address
                        </Text>
                      </Pressable>
                    </AnimatedListItem>
                  }
                />
              )}
            </View>
          </SafeAreaView>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
};
export default AddressModal;
