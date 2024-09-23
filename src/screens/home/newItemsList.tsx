import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, useWindowDimensions, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useScale from '@utils/useScale';
import useStyles from './useStyles';
import getImagePath from '@src/utils/getPath';
import {navigate} from '@src/navigations';
import {ROUTER, RootStackParamList} from '@src/navigations/routes';
import {useAppDispatch} from '@src/store/hooks';
import {clearFilters} from '@src/store/slices/categories';

const NewItemsList: React.FC<{
  items: any[];
}> = ({items}) => {
  const styles = useStyles();
  const {ms} = useScale();
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const dispatch = useAppDispatch();

  let itemLimit = width < ms(515) ? 2 : width < ms(800) ? 4 : 5;

  let letTopItems = items.slice(1, itemLimit + 1);
  let leftBottomItems = items.slice(
    itemLimit + 1,
    2 * itemLimit + (width < ms(515) ? 1 : width < ms(800) ? 2 : 2),
  );

  return (
    <>
      <Pressable
        key={'newimg' + items[0].key}
        onPress={() =>
          navigate(ROUTER.PDP as keyof RootStackParamList, {
            item_code: items[0].item_code,
          })
        }>
        <Image
          source={{uri: getImagePath(items[0]?.website_image)}}
          style={styles.newLeftImg}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </Pressable>
      <View style={styles.newRight}>
        <View style={styles.rightTop}>
          {letTopItems.map(item => {
            return (
              <Pressable
                key={'rightTop' + item.item_code}
                onPress={() =>
                  navigate(ROUTER.PDP as keyof RootStackParamList, {
                    item_code: item.item_code,
                  })
                }>
                <Image
                  source={{uri: getImagePath(item.website_image)}}
                  style={styles.rightTopImg}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
              </Pressable>
            );
          })}
        </View>
        <View style={styles.rightBottom}>
          {leftBottomItems.map(item => {
            return (
              <Pressable
                key={'rightBottom' + item.item_code}
                onPress={() =>
                  navigate(ROUTER.PDP as keyof RootStackParamList, {
                    item_code: item.item_code,
                  })
                }>
                <Image
                  source={{uri: getImagePath(item.website_image)}}
                  style={styles.rightBottomImg}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
              </Pressable>
            );
          })}
          <Pressable
            style={styles.newListForwardBtn}
            key="new-next"
            onPress={() => {
              dispatch(clearFilters());
              navigate(ROUTER.PLP as keyof RootStackParamList, {});
            }}>
            <Ionicons
              name="arrow-forward-outline"
              size={ms(30)}
              color={colors.primary}
              maxFontSizeMultiplier={1}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default NewItemsList;
