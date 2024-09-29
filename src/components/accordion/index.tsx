import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import useStyles from './useStyles';
import {useAppSelector, useAppDispatch} from '@src/store/hooks';
import {CategoriesType, changeItemGroup} from '@src/store/slices/categories';
import {useTheme} from '@react-navigation/native';
import AccordionItem from './accordionItem';

const Accordion: React.FC<{
  section: any;
  index: number;
}> = ({section, index}) => {
  const open = useSharedValue(true);
  const styles = useStyles();

  const {filters} = useAppSelector(state => state.categories);
  const {colors} = useTheme();

  const dispatch = useAppDispatch();

  const onPress = () => {
    open.value = !open.value;
  };

  const renderHeader = (content: any) => {
    return (
      <Text allowFontScaling={false} style={[styles.accordionTitle]}>
        {content.title}
      </Text>
    );
  };

  const renderFilterItemContent = (content: {
    title: string;
    content: {
      items: any[];
      isGeneric: boolean;
      type: 'item_group';
    };
  }) => {
    const items = content.content.items;
    return items.map((item, _i) => {
      let isSelected = false;
      isSelected = !!filters.item_group.find(
        (grp: CategoriesType) => grp.name === item.name,
      );
      return (
        <Pressable
          onPress={() => {
            dispatch(
              changeItemGroup({
                item: item,
                index: index,
                isSelected: !isSelected,
              }),
            );
          }}
          key={item.name}
          style={[
            styles.itemStyle,
            styles.accordionContentStyle,
            {
              borderColor: isSelected ? colors.secondary : colors.contentText,
            },
          ]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.f10,
              {
                color: isSelected ? colors.secondary : colors.contentText,
              },
            ]}>
            {item.name}
          </Text>
        </Pressable>
      );
    });
  };

  const renderContent = (content: any) => {
    const ctn = content.content.isGeneric ? (
      <View />
    ) : (
      renderFilterItemContent(content)
    );
    return (
      <View style={styles.parent}>
        <AccordionItem isExpanded={open} viewKey="Accordion">
          <View style={[styles.list]}>{ctn}</View>
        </AccordionItem>
      </View>
    );
  };

  return (
    <View style={styles.accordionSectionContainer}>
      <Pressable onPress={onPress}>{renderHeader(section)}</Pressable>
      {renderContent(section)}
    </View>
  );
};

export default Accordion;
