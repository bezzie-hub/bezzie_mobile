import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import {getCart} from '@src/store/slices/cart';
import {useCallback} from 'react';

function useCartState() {
  const dispatch = useAppDispatch();
  const {cart, cartLoading} = useAppSelector(state => state.cart);

  useFocusEffect(
    useCallback(() => {
      dispatch(getCart({}));
    }, [dispatch]),
  );

  return {
    cart,
    loading: cartLoading,
  };
}

export default useCartState;
