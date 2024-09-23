import Config from 'react-native-config';

const getImagePath = (path: string) => `${Config.BASE_URL}${path}`;

export default getImagePath;
