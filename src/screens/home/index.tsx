import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import Search from '@components/search';
import OptimizedScene from '@components/optimizedScene';
import CustomStatusBar from '@components/customStatusBar';

import useScale from '@utils/useScale';
import FeaturedItem from './featuredItem';
import NewItemsList from './newItemsList';
import useStyles from './useStyles';
import useGetTheme from '@utils/useGetTheme';
import {ROUTER} from '@navigations/routes';
import HorizontalList from '@components/horizontalList';
import useHomeState from './useHomeState';
import {useAppDispatch} from '@src/store/hooks';
import {clearFilters} from '@src/store/slices/categories';

const Home = (props: any) => {
  const styles = useStyles();
  const {width} = useWindowDimensions();
  const {ms} = useScale();
  const {colors} = useTheme();
  const {isDark} = useGetTheme();
  const {whatsNew, featured, popular, loading} = useHomeState();
  const dispatch = useAppDispatch();

  const featuredContentCount = Math.floor(width / ms(250));

  const featuredContent = featured.slice(0, featuredContentCount);

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <OptimizedScene loading={loading}>
        {loading ? (
          <ActivityIndicator />
        ) : !whatsNew.length && !featured.length && !popular.length ? (
          <View />
        ) : (
          <ScrollView
            decelerationRate="fast"
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            stickyHeaderIndices={[0]}>
            <Search isHome={true} />
            {whatsNew.length > 0 && (
              <View style={styles.listContainer} key="new">
                <View style={styles.listTitleContainer}>
                  <Text style={styles.listTitle} maxFontSizeMultiplier={1}>
                    WHATS NEW
                  </Text>
                  <Pressable
                    onPress={() => {
                      dispatch(clearFilters());
                      props.navigation.navigate(ROUTER.PLP);
                    }}>
                    <Text style={styles.viewAll} maxFontSizeMultiplier={1}>
                      View all
                    </Text>
                  </Pressable>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.newContentContainer}
                  style={styles.newItemsContainer}>
                  <NewItemsList items={whatsNew} />
                </ScrollView>
              </View>
            )}
            {featured.length > 0 && (
              <View style={styles.listContainer} key="featured">
                <View style={styles.listTitleContainer}>
                  <Text style={styles.listTitle} maxFontSizeMultiplier={1}>
                    FEATURED PRODUCTS
                  </Text>
                </View>
                <View style={styles.featuredItemsContainer}>
                  {featuredContent.map((item, index) => {
                    return (
                      <FeaturedItem item={item} key={`featured-${index}`} />
                    );
                  })}
                </View>
              </View>
            )}
            {popular.length > 0 && (
              <HorizontalList
                title={'POPULAR PRODUCTS'}
                viewAllPress={() => {
                  dispatch(clearFilters());
                  props.navigation.navigate(ROUTER.PLP);
                }}
                data={popular}
                showViewAll={false}
              />
            )}
          </ScrollView>
        )}
      </OptimizedScene>
    </>
  );
};

export default Home;
