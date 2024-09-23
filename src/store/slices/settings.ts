import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import SettingsService from '@src/services/settings.service';

interface SettingsState {
  settingsLoading: boolean;
  settingsError: string;
  pageSize: number;
  enableFieldFilters: boolean;
  hideVariants: boolean;
  enableVariants: boolean;
  showPrice: boolean;
  showStockAvailability: boolean;
  showQuantity: boolean;
  allowItemsNotInStock: boolean;
  showApplyCouponCode: boolean;
}

const initialState: SettingsState = {
  settingsLoading: false,
  settingsError: '',
  pageSize: 10,
  enableFieldFilters: false,
  hideVariants: true,
  enableVariants: false,
  showPrice: true,
  showStockAvailability: true,
  showQuantity: true,
  allowItemsNotInStock: false,
  showApplyCouponCode: false,
};

export const getSettings = createAsyncThunk(
  'settings/getSettings',
  async (_, {rejectWithValue}) => {
    try {
      const response: any = await SettingsService.getSettings();
      if (response?.status_code === 200) {
        return response.data;
      } else {
        throw new Error(response?.message || '');
      }
    } catch (err: any) {
      return rejectWithValue(err.message || 'Something went wrong');
    }
  },
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSettings.pending, state => {
      state.settingsLoading = true;
      state.settingsError = '';
    });
    builder.addCase(getSettings.fulfilled, (state, action) => {
      state.settingsError = '';
      state.settingsLoading = false;
      state.pageSize = action.payload.products_per_page;
      state.enableFieldFilters = action.payload.enable_field_filters === 1;
      state.hideVariants = action.payload.hide_variants === 1;
      state.enableVariants = action.payload.enable_variants === 1;
      state.showPrice = action.payload.show_price === 1;
      state.showStockAvailability =
        action.payload.show_stock_availability === 1;
      state.showQuantity = action.payload.show_quantity_in_website === 1;
      state.allowItemsNotInStock =
        action.payload.allow_items_not_in_stock === 1;
      state.showApplyCouponCode =
        action.payload.show_apply_coupon_code_in_website === 1;
    });
    builder.addCase(getSettings.rejected, (state, action) => {
      state.settingsError = (action?.payload as string) || '';
      state.settingsLoading = false;
    });
  },
});

export const {setPageSize} = settingsSlice.actions;
export default settingsSlice.reducer;
