import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';

import useStyles from './useStyles';
import AppliedFilters from './appliedFilters';
import ProductList from './list';
import OptimizedScene from '@components/optimizedScene';
import CustomStatusBar from '@components/customStatusBar';
import useGetTheme from '@utils/useGetTheme';
import Search from '@components/search';
import useGetOrientation from '@utils/useGetOrientation';
import useProductListState from './useProductListState';

const Products = (props: any) => {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();
  const styles = useStyles();
  const {isDark} = useGetTheme();
  const orientation = useGetOrientation();
  const {
    products,
    loading,
    page,
    loadNextPage,
    onReload,
    isRefreshing,
    appliedFilterDetails,
  } = useProductListState(props);

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <OptimizedScene>
        <>
          <Search isHome={false} />
          <View style={[styles.container]}>
            {orientation === 'PORTRAIT' &&
              appliedFilterDetails.item_group.length > 0 && (
                <AppliedFilters filters={appliedFilterDetails} />
              )}
            <ProductList
              width={width}
              products={products}
              loading={loading}
              loadNextPage={() => loadNextPage(page + 1)}
              onReload={onReload}
              isRefreshing={isRefreshing}
            />
          </View>
        </>
      </OptimizedScene>
    </>
  );
};

export default Products;
