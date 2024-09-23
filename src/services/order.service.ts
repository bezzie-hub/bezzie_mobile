import service from '@services/index';
import Config from 'react-native-config';

const OrderService = {
  getOrders: async () => {
    try {
      const res: any = await service.get(Config.GET_ORDERS!);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  getOrderDetails: async (sales_order: string) => {
    try {
      const res: any = await service.get(Config.GET_ORDER_DETAILS!, {
        params: {
          sales_order,
        },
      });
      return res?.data;
    } catch (error) {
      return error;
    }
  },
};

export default OrderService;
