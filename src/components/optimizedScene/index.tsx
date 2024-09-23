import {useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {InteractionManager, View, ActivityIndicator} from 'react-native';
import FadeInView from '../fadeIn';
import useStyles from './useStyles';

const OptimizedScene: React.FC<{
  children: React.ReactElement;
  loading?: Boolean;
}> = ({children, loading = false}) => {
  const [interactionsComplete, setInteractionsComplete] = useState(false);
  const {colors} = useTheme();
  const styles = useStyles();

  useEffect(() => {
    const handle = InteractionManager.runAfterInteractions(() => {
      setInteractionsComplete(true);
    });
    return () => {
      handle.cancel();
    };
  }, []);

  if (!interactionsComplete || loading) {
    return (
      <View style={styles.loaderContainer}>
        <View style={styles.loader}>
          <ActivityIndicator color={colors.secondary} size="large" />
        </View>
      </View>
    );
  }

  return <FadeInView>{children}</FadeInView>;
};

export default OptimizedScene;
