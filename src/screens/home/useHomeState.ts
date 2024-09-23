import ProductService from '@src/services/products.service';
import showToast from '@src/utils/showToast';
import {useCallback, useEffect, useState} from 'react';

function useHomeState() {
  const [whatsNew, setWhatsNew] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHomeProducts = useCallback(() => {
    ProductService.home()
      .then(async res => {
        if (res.status_code === 200) {
          setWhatsNew(res.data.whats_new);
          setFeatured(res.data.featured);
          setPopular(res.data.popular);
        } else {
          throw new Error(res.message);
        }
      })
      .catch(err => {
        showToast(err.message || 'something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getHomeProducts();
  }, [getHomeProducts]);

  return {
    whatsNew,
    featured,
    popular,
    loading,
  };
}

export default useHomeState;
