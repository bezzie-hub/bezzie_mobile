import ProductService from '@src/services/products.service';
import {useAppSelector} from '@src/store/hooks';
import showToast from '@src/utils/showToast';
import {useCallback, useEffect, useState} from 'react';

function usePDPState(props: any) {
  const [product, setProduct] = useState<any>(null);
  const [productLoading, setProductLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const {addToCartLoading, cart} = useAppSelector(state => state.cart);

  const getHomeProducts = useCallback(() => {
    ProductService.getProductDetails({
      item_code: props.route.params.item_code,
    })
      .then(async (res: any) => {
        if (res.status_code === 200) {
          setProduct(res.data);
          const cartItem = cart?.items.find(v => {
            return v.item_code === res.data.product_info.item_code;
          });
          if (cartItem) {
            setQty(cartItem.qty);
          }
        } else {
          throw new Error(res.message);
        }
      })
      .catch(err => {
        showToast(err.message || 'something went wrong');
      })
      .finally(() => {
        setProductLoading(false);
      });
  }, [cart?.items, props.route.params.item_code]);

  useEffect(() => {
    getHomeProducts();
  }, [getHomeProducts]);

  return {
    product,
    productLoading,
    setQty,
    qty,
    addToCartLoading,
  };
}

export default usePDPState;
