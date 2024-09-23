import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import CartService from '@src/services/cart.service';
import showToast from '@src/utils/showToast';

export type Cart = {
  cart_id: string;
  shipping_address: any;
  billing_address: any;
  cart: {
    shipping_rules: any;
    currency: string;
    taxes: {
      description: string;
      [key: string]: any;
    }[];
    [key: string]: any;
  };
  items: any[];
} | null;

export interface CartState {
  cart: Cart;
  cartLoading: boolean;
  addToCartLoading: boolean;
  cartError: string;
}

const initialState: CartState = {
  cart: null,
  cartLoading: false,
  cartError: '',
  addToCartLoading: false,
};

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (
    params: {
      isUpdateCart?: boolean;
    },
    {rejectWithValue},
  ) => {
    try {
      const response: any = await CartService.getCart();
      if (response?.status_code === 200) {
        return response.data;
      } else if (response?.status_code === 204) {
        return null;
      } else {
        throw new Error(response?.message || '');
      }
    } catch (err: any) {
      showToast(err.message || 'Something went wrong');
      return rejectWithValue(err.message || 'Something went wrong');
    }
  },
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (
    params: {
      item_code: string;
      qty: number;
      with_items?: number;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const response: any = await CartService.addToCart(params);
      if (response?.status_code === 200 || response?.status_code === 204) {
        await dispatch(getCart({isUpdateCart: true}));
        showToast('Item added to cart');
        return response.data;
      } else {
        const msg =
          response.status_code === 403
            ? `Requested quantity not available.${
                response.data?.stock_qty
                  ? `Only ${response.data?.stock_qty} available.`
                  : ''
              }`
            : '';
        if (msg) {
          await dispatch(getCart({isUpdateCart: true}));
        }
        showToast(msg || response?.message || 'Something went wrong');
        throw new Error(response?.message || '');
      }
    } catch (err: any) {
      return rejectWithValue(err.message || 'Something went wrong');
    }
  },
);

const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearCartError(state) {
      state.cartError = '';
    },
    clearCart(state) {
      state.cart = null;
      state.cartLoading = false;
      state.cartError = '';
      state.addToCartLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCart.pending, (state, action) => {
      state.cartLoading = action.meta.arg.isUpdateCart ? false : true;
      state.cartError = '';
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.cartError = '';
      state.cartLoading = false;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.cartError = (action?.payload as string) || '';
      state.cartLoading = false;
    });
    builder.addCase(addToCart.pending, state => {
      state.addToCartLoading = true;
      state.cartError = '';
    });
    builder.addCase(addToCart.fulfilled, (state, _) => {
      state.cartError = '';
      state.addToCartLoading = false;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.cartError = (action?.payload as string) || '';
      state.addToCartLoading = false;
    });
  },
});

export const {clearCartError, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
