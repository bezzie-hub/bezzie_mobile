import AddressService from '@src/services/address.service';
import showToast from '@src/utils/showToast';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {produce} from 'immer';

function useAddressesState() {
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

  return {
    addresses,
    loading,
    onDeleteAddress,
    isDeletingAddress,
    setDeleteAddressOpen,
    deleteAddressOpen,
    clearDeleteAddress,
  };
}

export default useAddressesState;
