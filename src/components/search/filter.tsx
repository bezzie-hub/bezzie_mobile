import React from 'react';
import {Text, View, Pressable, ScrollView, Modal} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useFilterStyles from './useFilterStyles';
import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import {
  CategoriesType,
  applyFilter,
  changeItemGroup,
  clearFilters,
  syncFilters,
} from '@src/store/slices/categories';

const Filter = ({visible, setVisible}: any) => {
  const {colors} = useTheme();
  const styles = useFilterStyles();

  const {filters, filterCategories} = useAppSelector(state => state.categories);

  const dispatch = useAppDispatch();

  const renderFilterItemContent = (
    content: {
      title: string;
      content: {
        items: any[];
        isGeneric: boolean;
        type: 'item_group';
      };
    },
    index: number,
  ) => {
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

  const renderHeader = (content: any) => {
    return (
      <Text allowFontScaling={false} style={[styles.accordionTitle]}>
        {content.title}
      </Text>
    );
  };

  const renderContent = (content: any, index: number) => {
    const ctn = content.content.isGeneric ? (
      <View />
    ) : (
      renderFilterItemContent(content, index)
    );
    return <View style={[styles.list]}>{ctn}</View>;
  };

  let allSections = [...filterCategories];

  return (
    <Modal visible={visible} style={{backgroundColor: colors.background}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Pressable
          onPress={() => {
            dispatch(syncFilters());
            setVisible(false);
          }}
          style={styles.closeBtnContainer}>
          <MaterialIcons
            color={colors.text}
            name={'close'}
            size={28}
            allowFontScaling={false}
          />
        </Pressable>
        <View style={[styles.first]}>
          <Accordion
            sectionContainerStyle={styles.accordionSectionContainer}
            sections={allSections.filter(item => item.content.items.length > 0)}
            activeSections={Array(allSections.length)
              .fill(0, 0, allSections.length)
              .map((_, i) => i)}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={_active => {}}
            expandMultiple
            underlayColor={'transparent'}
          />
        </View>
      </ScrollView>
      <View style={[styles.btnContainer]}>
        <Pressable
          style={[styles.btn, styles.clearBtn]}
          android_ripple={{
            radius: 20,
            borderless: true,
            color: colors.white,
          }}
          onPress={() => {
            dispatch(clearFilters());
            setVisible(false);
          }}>
          <Text
            allowFontScaling={false}
            style={[styles.btnText, styles.clearBtnText]}>
            Clear
          </Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.applyBtn]}
          android_ripple={{
            radius: 20,
            borderless: true,
            color: colors.white,
          }}
          onPress={() => {
            dispatch(applyFilter());
            setVisible(false);
          }}>
          <Text
            allowFontScaling={false}
            style={[styles.btnText, styles.applyBtnText]}>
            Apply
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default Filter;
