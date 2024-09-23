import {useAppSelector} from '@src/store/hooks';

function useCategoriesState() {
  const {categories, categoriesLoading} = useAppSelector(
    state => state.categories,
  );

  return {
    categories,
    loading: categoriesLoading,
  };
}

export default useCategoriesState;
