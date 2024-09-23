import '@react-navigation/native';
import {ColorType} from './colorType';

// Override the theme in react native navigation to accept our custom theme props.
declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    dark: boolean;
    colors: ColorType;
  };
  export function useTheme(): ExtendedTheme;
}
