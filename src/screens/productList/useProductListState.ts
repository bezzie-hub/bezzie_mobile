import ProductService from '@src/services/products.service';
import {useAppSelector} from '@src/store/hooks';
import showToast from '@src/utils/showToast';
import {useCallback, useEffect, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';

function useProductListState(_props: any) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const {pageSize} = useAppSelector(state => state.settings);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {appliedFilters, search, appliedFilterDetails} = useAppSelector(
    state => state.categories,
  );

  const getProducts = useCallback(
    (
      s: string,
      start: number,
      filters:
        | {
            item_group: string;
            attribute_filters: any;
            field_filters: any;
          }
        | {},
    ) => {
      if (start === 0) {
        setProducts([]);
        setHasReachedEnd(false);
      }
      setLoading(true);
      ProductService.getAllProductsWithFilters({
        search: s,
        start,
        ...filters,
      })
        .then(async (res: any) => {
          if (res.status_code === 200) {
            if (res.data.length < pageSize) {
              setHasReachedEnd(true);
            }
            if (start > 0) {
              setProducts(v => [...v, ...res.data]);
            } else {
              setProducts(res.data);
            }
            setPage(1 + start / pageSize);
          } else {
            throw new Error(res.message);
          }
        })
        .catch(err => {
          showToast(err.message || 'something went wrong');
        })
        .finally(() => {
          setIsRefreshing(false);
          setLoading(false);
        });
    },
    [pageSize],
  );

  useEffect(() => {
    getProducts(search, 0, appliedFilters);
  }, [appliedFilters, getProducts, search]);

  const loadNextPage = (p: number) => {
    if (!hasReachedEnd && !loading) {
      getProducts(search || '', (p - 1) * pageSize, appliedFilters);
    }
  };

  return {
    loading,
    appliedFilters,
    setPage,
    getProducts,
    products,
    page,
    hasReachedEnd,
    pageSize,
    isRefreshing,
    loadNextPage: useDebouncedCallback(loadNextPage, 500),
    onReload: () => {
      setIsRefreshing(true);
      setProducts([]);
      getProducts(search || '', 0, appliedFilters);
    },
    appliedFilterDetails,
  };
}

export default useProductListState;
