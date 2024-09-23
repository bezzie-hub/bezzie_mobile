import React, {useState} from 'react';
import {Pressable, View, useWindowDimensions} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';

import Filter from './filter';
import useStyles from './useStyles';
import useScale from '@utils/useScale';
import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import {applySearch, clearFilters} from '@src/store/slices/categories';
import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTER, RootStackParamList} from '@src/navigations/routes';

type PropType = {
  isHome: boolean;
};

const Search = ({isHome}: PropType) => {
  const [visible, setVisible] = useState(false);
  const {width} = useWindowDimensions();
  const {colors} = useTheme();
  const styles = useStyles();
  const {ms} = useScale();
  const {search} = useAppSelector(state => state.categories);
  const [q, setQ] = useState(search || '');
  const dispatch = useAppDispatch();
  const {navigate, goBack} =
    useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.container]}>
      <Filter width={width} visible={visible} setVisible={setVisible} />
      {!isHome && (
        <Pressable onPress={goBack}>
          <Ionicons name="arrow-back" color={colors.pageHead} size={ms(20)} />
        </Pressable>
      )}
      <View style={styles.searchInputContainer}>
        <Ionicons
          name="search"
          color={colors.text}
          size={ms(20)}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder={'Search Bezzie'}
          style={styles.searchInput}
          placeholderTextColor={colors.text}
          returnKeyType="search"
          value={q}
          onChangeText={tex => {
            setQ(tex);
          }}
          onSubmitEditing={e => {
            if (isHome) {
              dispatch(clearFilters());
            }
            dispatch(applySearch(e.nativeEvent?.text || ''));
            navigate(ROUTER.PLP as keyof RootStackParamList);
          }}
        />
        {!!search && (
          <Pressable
            onPress={() => {
              if (isHome) {
                dispatch(clearFilters());
              }
              setQ('');
              dispatch(applySearch(''));
              navigate(ROUTER.PLP as keyof RootStackParamList);
            }}>
            <Ionicons
              name="close"
              color={colors.text}
              size={ms(20)}
              style={styles.searchIcon}
            />
          </Pressable>
        )}
      </View>
      {!isHome && (
        <Pressable style={[styles.filter]} onPress={() => setVisible(true)}>
          <MaterialIcons
            name="tune"
            color={colors.white}
            size={24}
            allowFontScaling={false}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Search;
