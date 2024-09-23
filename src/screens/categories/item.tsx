import React from 'react';
import {ImageBackground, Pressable, Text, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import useStyles from './useStyles';

import AnimatedListItem from '@components/animatedListItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, ROUTER} from '@navigations/routes';
import LinearGradient from 'react-native-linear-gradient';
import useGetTheme from '@utils/useGetTheme';
import getImagePath from '@src/utils/getPath';
import {useAppDispatch} from '@src/store/hooks';
import {
  applyFilter,
  changeItemGroup,
  clearFilters,
} from '@src/store/slices/categories';

const Item: React.FC<{
  item: any;
  index: number;
}> = ({index, item}) => {
  const styles = useStyles();
  const {isDark} = useGetTheme();
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  return (
    <AnimatedListItem index={index} styles={[styles.animItem, styles.mh5]}>
      <Pressable
        onPress={async () => {
          dispatch(clearFilters());
          await dispatch(
            changeItemGroup({
              item,
              index: 0,
              isSelected: true,
            }),
          );
          dispatch(applyFilter());
          navigate(ROUTER.PLP as keyof RootStackParamList);
        }}>
        <ImageBackground
          source={{uri: getImagePath(item.image)}}
          style={styles.image}
        />
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          colors={
            isDark
              ? ['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']
              : ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0)']
          }
          locations={[0.2, 1]}
          style={styles.linearGradient}>
          <View style={styles.categoryTextContainer}>
            <Text maxFontSizeMultiplier={1} style={styles.categoryText}>
              {item.name}
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    </AnimatedListItem>
  );
};

export default Item;
