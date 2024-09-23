import {useWindowDimensions} from 'react-native';

const useScale = () => {
  const {width, height} = useWindowDimensions();
  const guidelineBaseWidth = 390;
  const guidelineBaseHeight = 644;
  const [shortDimension, longDimension] =
    width < height ? [width, height] : [height, width];

  const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

  const verticalScale = (size: number) =>
    (longDimension / guidelineBaseHeight) * size;

  const isLandscape = width > height;

  return {
    s: scale,
    vs: verticalScale,
    ms: (size: number, factor = 0.5) => size + (scale(size) - size) * factor,
    mvs: (size: number, factor = 0.5) =>
      size + (verticalScale(size) - size) * factor,
    isLandscape,
  };
};

export default useScale;
