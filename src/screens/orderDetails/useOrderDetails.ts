import showToast from '@src/utils/showToast';
import {useCallback, useEffect, useState} from 'react';
import OrderService from '@src/services/order.service';

function useOrderDetailState(props: any) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getOrder = useCallback((orderId: string) => {
    OrderService.getOrderDetails(orderId)
      .then(async (res: any) => {
        if (res?.status_code === 200) {
          setOrder(res?.data);
        } else {
          throw new Error(res.message);
        }
      })
      .catch(err => {
        showToast(err.message || 'something went wrong');
        setOrder([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (props.route?.params?.orderId) {
      getOrder(props.route?.params?.orderId);
    }
  }, [getOrder, props.route?.params?.orderId]);

  return {
    getOrder,
    loading,
    order,
  };
}

export default useOrderDetailState;
