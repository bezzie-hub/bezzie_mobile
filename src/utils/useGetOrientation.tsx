import {useWindowDimensions} from 'react-native';

const useGetOrientation = () => {
  const {width, height} = useWindowDimensions();
  return height < width ? 'LANDSCAPE' : 'PORTRAIT';
};

export default useGetOrientation;
