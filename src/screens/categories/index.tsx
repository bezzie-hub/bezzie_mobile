import React from 'react';
import {Text, View, FlatList, useWindowDimensions} from 'react-native';

import {useTheme} from '@react-navigation/native';

import useStyles from './useStyles';
import useCommonStyles from '@config/useCommonStyles';
import OptimizedScene from '@components/optimizedScene';
import CustomStatusBar from '@components/customStatusBar';
import Item from './item';
import useGetTheme from '@utils/useGetTheme';
import useGetOrientation from '@utils/useGetOrientation';
import useCategoriesState from './useCategoriesState';

const Categories = (_props: any) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const {isDark} = useGetTheme();
  const orientation = useGetOrientation();
  const {width} = useWindowDimensions();
  const {categories} = useCategoriesState();

  const renderItem = ({item, index}: any) => <Item index={index} item={item} />;

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <OptimizedScene>
        <View style={[styles.container]}>
          <Text style={[commonStyles.headText]} maxFontSizeMultiplier={1}>
            Categories
          </Text>
          <View style={[styles.innerContainer]}>
            <FlatList
              key={`cart-${orientation}-${
                width > 1200
                  ? 7
                  : orientation === 'LANDSCAPE' || width > 600
                  ? 5
                  : 3
              }`}
              style={styles.listContainer}
              contentContainerStyle={[commonStyles.scrollContent]}
              data={categories}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item: any) => item.name}
              renderItem={renderItem}
              numColumns={
                width > 1200
                  ? 7
                  : orientation === 'LANDSCAPE' || width > 600
                  ? 5
                  : 3
              }
            />
          </View>
        </View>
      </OptimizedScene>
    </>
  );
};

export default Categories;
