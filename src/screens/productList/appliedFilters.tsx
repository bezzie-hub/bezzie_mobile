import React from 'react';
import {Text, FlatList, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';

import useStyles from './useStyles';
import {
  Filters,
  applyFilter,
  changeItemGroup,
} from '@src/store/slices/categories';
import {useAppDispatch} from '@src/store/hooks';

const AppliedFilters: React.FC<{filters: Filters}> = ({filters}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const filterData = [...filters.item_group];

  return (
    <FlatList
      data={filterData}
      horizontal
      keyExtractor={(item, index) => `${index}`}
      style={styles.filter}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
      renderItem={({item, index}) => {
        return (
          <Pressable
            onPress={async () => {
              await dispatch(
                changeItemGroup({
                  item: item,
                  index: index,
                  isSelected: false,
                }),
              );
              dispatch(applyFilter());
            }}
            key={item.name}
            android_ripple={{
              radius: 20,
              borderless: true,
              color: colors.white,
            }}
            style={[styles.filterItem]}>
            <Text allowFontScaling={false} style={[styles.filterName]}>
              {item.name}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

export default AppliedFilters;
