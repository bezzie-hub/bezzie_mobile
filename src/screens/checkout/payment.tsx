import React from 'react';
import {Text, View, Pressable} from 'react-native';

import {useTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useCommonStyles from '@config/useCommonStyles';

import useStyles from './useStyles';

import payment from './paymentData.json';
import useScale from '@utils/useScale';
import AnimatedListItem from '@src/components/animatedListItem';

const Payment: React.FC<{
  totalAmount: string;
}> = ({totalAmount}) => {
  const {colors} = useTheme();
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const {ms} = useScale();

  const item = payment[0];

  return (
    <AnimatedListItem index={1} styles={[styles.w100]}>
      <>
        <View style={styles.rowSpacBtw}>
          <Text
            maxFontSizeMultiplier={1}
            style={[styles.sectionHead, styles.mt5]}>
            Payment
          </Text>
        </View>
        <View key={item.id} style={[styles.animItem]}>
          <View style={[commonStyles.shadow, styles.item]}>
            <View style={[styles.itemLeft, styles.justifyCenter]}>
              <View style={styles.paymentItem}>
                <Text maxFontSizeMultiplier={1} style={[styles.paymentTitle]}>
                  {item.name}
                </Text>
                <View style={styles.paymentAmountContainer}>
                  <MaterialIcons
                    color={colors.contentText}
                    name={item.icon}
                    size={24}
                    maxFontSizeMultiplier={1}
                  />
                  <Text
                    maxFontSizeMultiplier={1}
                    style={[styles.paymentAmount]}>
                    {totalAmount}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.right}>
              <Pressable
                style={[styles.iconBtn, {backgroundColor: colors.switch}]}>
                <MaterialIcons
                  color={colors.white}
                  name={'done'}
                  size={ms(20)}
                  maxFontSizeMultiplier={1}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </>
    </AnimatedListItem>
  );
};
export default Payment;
