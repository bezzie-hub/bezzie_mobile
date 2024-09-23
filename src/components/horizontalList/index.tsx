import React from 'react';
import {Text, View, FlatList, Pressable} from 'react-native';

import ListItem from './listItem';
import useStyles from './useStyles';

const HorizontalList: React.FC<{
  title: string;
  viewAllPress: () => void;
  data: any[];
  showViewAll?: boolean;
}> = ({title, viewAllPress, data, showViewAll = true}) => {
  const styles = useStyles();

  const renderListItem = ({item, index}: any) => {
    return <ListItem item={item} index={index} key={`list-${item.key}`} />;
  };

  return (
    <View style={styles.listContainer} key="popular">
      <View style={styles.listTitleContainer}>
        <Text style={styles.listTitle} maxFontSizeMultiplier={1}>
          {title}
        </Text>
        {showViewAll && (
          <Pressable onPress={viewAllPress}>
            <Text style={styles.viewAll} maxFontSizeMultiplier={1}>
              View all
            </Text>
          </Pressable>
        )}
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `ppopular-${item.name}`}
        contentContainerStyle={styles.listContentContainer}
        renderItem={renderListItem}
      />
    </View>
  );
};

export default HorizontalList;
