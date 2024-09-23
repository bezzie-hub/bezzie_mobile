import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ProductService from '@src/services/products.service';

export type CategoriesType = {
  name: string;
  image: string;
  is_group?: 0 | 1;
  childs?: {
    name: string;
    image: string;
  }[];
};

export type FilterType = {
  title: string;
  content: {
    items: any[];
    isGeneric: boolean;
    type: 'item_group' | 'attribute';
  };
};

export type Filters = {
  item_group: CategoriesType[];
  attribute_filters: any;
  field_filters: any;
};

export interface CategoriesState {
  categoriesLoading: boolean;
  categoriesError: string;
  categories: CategoriesType[];
  search: string;
  filters: Filters;
  appliedFilterDetails: Filters;
  appliedFilters: {
    item_group?: string;
    attribute_filters?: any;
    field_filters?: any;
  };
  filterCategories: FilterType[];
  appliedFilterCategories: FilterType[];
}

const initialState: CategoriesState = {
  categoriesLoading: false,
  categoriesError: '',
  categories: [],
  search: '',
  filters: {
    item_group: [],
    attribute_filters: {},
    field_filters: {},
  },
  appliedFilterDetails: {
    item_group: [],
    attribute_filters: {},
    field_filters: {},
  },
  appliedFilters: {},
  filterCategories: [
    {
      title: 'Categories',
      content: {
        items: [],
        isGeneric: false,
        type: 'item_group',
      },
    },
  ],
  appliedFilterCategories: [],
};

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, {rejectWithValue}) => {
    try {
      const response: any = await ProductService.getCategories();
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

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    selectAttributeFilter(
      state,
      action: PayloadAction<{
        key: string;
        value: string;
      }>,
    ) {
      if (action.payload.value) {
        state.filters.attribute_filters[action.payload.key] =
          action.payload.value;
      } else {
        delete state.filters.attribute_filters[action.payload.key];
      }
    },
    applyFilter(state) {
      state.appliedFilters.item_group =
        state.filters.item_group.at(-1)?.name || '';
      state.appliedFilters.attribute_filters = state.filters.attribute_filters;
      state.appliedFilters.field_filters = state.filters.field_filters;
      state.appliedFilterDetails = state.filters;
      state.appliedFilterCategories = state.filterCategories;
    },
    applySearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    syncFilters(state) {
      state.filters = state.appliedFilterDetails;
      state.filterCategories = state.appliedFilterCategories;
    },
    clearFilters(state) {
      state.filters = {
        item_group: [],
        attribute_filters: {},
        field_filters: {},
      };
      state.appliedFilters = {};
      state.appliedFilterDetails = {
        item_group: [],
        attribute_filters: {},
        field_filters: {},
      };
      state.filterCategories = [state.filterCategories[0]];
    },
    setPreviousFilters(
      state,
      action: PayloadAction<{
        filterCategories: FilterType[];
        appliedFilterDetails: Filters;
        filters: Filters;
      }>,
    ) {
      state.filterCategories =
        action.payload.filterCategories ?? state.filterCategories;
      state.appliedFilterDetails =
        action.payload.appliedFilterDetails ?? state.appliedFilterDetails;
      state.filters = action.payload.filters ?? state.filters;
    },
    changeItemGroup(state, action) {
      const itemGroups = state.filters.item_group.slice(
        0,
        action.payload.index,
      );
      if (action.payload.isSelected) {
        state.filters.item_group = [...itemGroups, action.payload.item];
        if (
          action.payload.item.childs &&
          action.payload.item.childs.length > 0
        ) {
          const filterCats = state.filterCategories.slice(
            0,
            action.payload.index + 1,
          );
          state.filterCategories = [
            ...filterCats,
            {
              title: action.payload.item.name,
              content: {
                items: action.payload.item.childs,
                isGeneric: false,
                type: 'item_group',
              },
            },
          ];
        }
      } else {
        state.filters.item_group = itemGroups;
        const filterCats = state.filterCategories.slice(
          0,
          action.payload.index + 1,
        );
        state.filterCategories = [...filterCats];
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getCategories.pending, state => {
      state.categoriesLoading = true;
      state.categoriesError = '';
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categoriesError = '';
      state.categoriesLoading = false;
      state.categories = action.payload.slice(1);
      state.filterCategories[0].content.items = action.payload.slice(1);
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.categoriesError = (action?.payload as string) || '';
      state.categoriesLoading = false;
    });
  },
});

export const {
  applyFilter,
  applySearch,
  clearFilters,
  selectAttributeFilter,
  syncFilters,
  setPreviousFilters,
  changeItemGroup,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
