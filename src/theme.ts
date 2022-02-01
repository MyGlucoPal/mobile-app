import { 
  DefaultTheme as LightTheme,  
  DarkTheme
} from "react-native-paper";
import type { Theme } from "react-native-paper/lib/typescript/types";

const theme: Theme = {
  dark: false,
  roundness: LightTheme.roundness,
  mode: "adaptive",
  colors: {
    primary: "#725AC1",
    background: "#F7ECE1",
    surface: "#CAC4CE",
    accent: "#8D86C9",
    error: LightTheme.colors.error,
    text: LightTheme.colors.text,
    onSurface: "#CAC4CE",
    disabled: LightTheme.colors.disabled,
    placeholder: LightTheme.colors.placeholder,
    backdrop: "#242038",
    notification: "#242038"
  },
  fonts: LightTheme.fonts,
  animation: LightTheme.animation,
};

export {
  theme,
  LightTheme,
  DarkTheme
};