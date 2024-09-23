import service from '@services/index';
import Config from 'react-native-config';

const CartService = {
  getCart: async () => {
    try {
      const res: any = await service.get(Config.GET_CART!);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  addToCart: async (params: {
    item_code: string;
    qty: number;
    with_items?: number;
  }) => {
    try {
      const res: any = await service.post(Config.ADD_TO_CART!, params);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  selectAddress: async (params: {address_name: string}) => {
    try {
      const res: any = await service.post(Config.CART_SELECT_ADDRESS!, {
        ...params,
        address_type: 'Billing',
      });
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  applyCoupon: async (params: {code: string}) => {
    try {
      const res: any = await service.post(Config.APPLY_COUPON!, params);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  placeCartOrder: async () => {
    try {
      const res: any = await service.post(Config.PLACE_ORDER!, {});
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  makePayment: async (params: {sales_order_id: string}) => {
    try {
      const res: any = await service.post(Config.MAKE_PAYMENT!, params);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
};

export default CartService;
