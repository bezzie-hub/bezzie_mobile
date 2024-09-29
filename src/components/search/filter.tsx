import React from 'react';
import {Text, View, Pressable, ScrollView, Modal} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useFilterStyles from './useFilterStyles';
import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import {
  applyFilter,
  clearFilters,
  syncFilters,
} from '@src/store/slices/categories';
import Accordion from '../accordion/index';

const Filter = ({visible, setVisible}: any) => {
  const {colors} = useTheme();
  const styles = useFilterStyles();

  const {filterCategories} = useAppSelector(state => state.categories);

  const dispatch = useAppDispatch();

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
          {allSections.map((section, index) => {
            return (
              <Accordion section={section} index={index} key={section.title} />
            );
          })}
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
