import service from '@services/index';
import Config from 'react-native-config';

const ProductService = {
  home: async () => {
    try {
      const res: any = await service.get(Config.HOME!);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  getAllProducts: async (params?: {start?: number}) => {
    try {
      const res = await service.get(Config.GET_ALL_PRODUCTS!, {params});
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  getAllProductsWithFilters: async (params: {
    field_filters?: any;
    attribute_filters?: any;
    start?: number;
    item_group?: string;
    search?: string;
  }) => {
    try {
      const res = await service.get(Config.GET_PRODUCTS_WITH_FILTERS!, {
        params,
      });
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  getAllProductsWithCategory: async (params: {
    start?: number;
    item_group?: string;
  }) => {
    try {
      const res = await service.get(Config.GET_PRODUCTS_WITH_CATEGORIES!, {
        params,
      });
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  getCategories: async () => {
    try {
      const res = await service.get(Config.GET_CATEGORIES!);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  getAllCategories: async () => {
    try {
      const res = await service.get(Config.GET_ALL_CATEGORIES!);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  searchProduct: async (params?: {start?: number; search?: string}) => {
    try {
      const res = await service.get(Config.SEARCH_PRODUCTS!, {params});
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  getProductDetails: async (params: {item_code: string}) => {
    try {
      const res = await service.get(Config.GET_PRODUCT_DETAILS!, {params});
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  getReviews: async (params: {
    item_code: string;
    start: number;
    end: number;
  }) => {
    try {
      const res = await service.get(Config.GET_PRODUCT_REVIEWS!, {params});
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  addReviews: async (params: {
    item_code: string;
    title: string;
    rating: number;
    comment: string;
  }) => {
    try {
      const res = await service.post(Config.ADD_PRODUCT_REVIEW!, params);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
};

export default ProductService;
