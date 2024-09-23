import CartService from '@src/services/cart.service';
import {useAppSelector, useAppDispatch} from '@src/store/hooks';
import {getCart} from '@src/store/slices/cart';
import showToast from '@src/utils/showToast';
import {useState} from 'react';

function useCheckoutState(_props: any) {
  const [showAddressModal, setShowAddressModal] = useState<{
    show: boolean;
  }>({
    show: false,
  });
  const {cart} = useAppSelector(state => state.cart);
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const dispatch = useAppDispatch();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlacedModalOpen, setOrderPlacedModalOpen] = useState(false);

  const onSelectAddress = async (address_name: string) => {
    setIsUpdatingAddress(true);
    try {
      const res = await CartService.selectAddress({
        address_name,
      });
      if (res.status_code === 200) {
        await dispatch(
          getCart({
            isUpdateCart: true,
          }),
        );
      } else {
        throw new Error(res.message || '');
      }
      setIsUpdatingAddress(false);
    } catch (err) {
      setIsUpdatingAddress(false);
      showToast((err as any).message || 'Something went wrong');
    }
  };

  const onPlaceOrder = async () => {
    try {
      if (!cart?.billing_address) {
        return showToast('Please select address');
      }
      setIsPlacingOrder(true);
      const res = await CartService.placeCartOrder();
      if (res.status_code === 200) {
        setOrderPlacedModalOpen(true);
        dispatch(getCart({isUpdateCart: false}));
      } else {
        throw new Error(res.message || '');
      }
    } catch (err) {
      showToast((err as any).message || 'Something went wrong');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return {
    showAddressModal,
    setShowAddressModal,
    cart,
    isUpdatingAddress,
    setIsUpdatingAddress,
    dispatch,
    onSelectAddress,
    onPlaceOrder,
    isPlacingOrder,
    setOrderPlacedModalOpen,
    orderPlacedModalOpen,
  };
}

export default useCheckoutState;
