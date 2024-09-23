import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import {getCart} from '@src/store/slices/cart';
import {produce} from 'immer';
import {useCallback, useEffect, useState} from 'react';

function useCartState() {
  const dispatch = useAppDispatch();
  const {cart, cartLoading} = useAppSelector(state => state.cart);
  const [isItemsValid, setIsItemsValid] = useState<boolean[]>([]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getCart({}));
    }, [dispatch]),
  );

  useEffect(() => {
    setIsItemsValid(new Array(cart?.items.length));
  }, [cart?.items]);

  const setItemValid = (isValid: boolean, index: number) => {
    setIsItemsValid(
      produce(draft => {
        draft[index] = isValid;
      }),
    );
  };

  return {
    cart,
    loading: cartLoading,
    isItemsValid,
    setItemValid,
  };
}

export default useCartState;
