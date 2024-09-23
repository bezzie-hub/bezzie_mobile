import React from 'react';
import {Text, View, Pressable, Animated} from 'react-native';

import {navigate} from '@navigations/index';
import {RootStackParamList, ROUTER} from '@navigations/routes';
import useStyles from './useStyles';
import getImagePath from '@src/utils/getPath';

const ListItem: React.FC<{
  item: any;
  index: number;
}> = ({item}) => {
  const styles = useStyles();

  return (
    <Pressable
      style={styles.listItem}
      onPress={() =>
        navigate(ROUTER.PDP as keyof RootStackParamList, {
          item_code: item.item_code,
        })
      }>
      <Animated.Image
        source={{uri: getImagePath(item.website_image)}}
        style={styles.itemImg}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <View style={[styles.content]}>
        <View>
          <Text
            numberOfLines={2}
            textBreakStrategy="simple"
            maxFontSizeMultiplier={1}
            ellipsizeMode="tail"
            style={[styles.itemTitle, {}]}>
            {item.item_name}
          </Text>
        </View>
        <Text style={[styles.price]} maxFontSizeMultiplier={1}>
          {item.formatted_price}
        </Text>
      </View>
    </Pressable>
  );
};

export default ListItem;
