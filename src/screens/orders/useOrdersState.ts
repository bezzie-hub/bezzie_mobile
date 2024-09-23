import showToast from '@src/utils/showToast';
import {useCallback, useEffect, useState} from 'react';
import OrderService from '@src/services/order.service';

function useOrdersState() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getOrders = useCallback(() => {
    OrderService.getOrders()
      .then(async (res: any) => {
        if (res?.status_code === 200) {
          setOrders(res?.data);
        } else {
          throw new Error(res.message);
        }
      })
      .catch(err => {
        showToast(err.message || 'something went wrong');
        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return {
    getOrders,
    loading,
    orders,
  };
}

export default useOrdersState;
