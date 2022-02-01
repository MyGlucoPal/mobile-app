import { DefaultTheme } from "react-native-paper";
import type { Theme } from "react-native-paper/lib/typescript/types";

const theme: Theme = {
  dark: false,
  roundness: DefaultTheme.roundness,
  mode: "adaptive",
  colors: {
    primary: "#725AC1",
    background: "#F7ECE1",
    surface: "#CAC4CE",
    accent: "#8D86C9",
    error: DefaultTheme.colors.error,
    text: DefaultTheme.colors.text,
    onSurface: "#CAC4CE",
    disabled: DefaultTheme.colors.disabled,
    placeholder: DefaultTheme.colors.placeholder,
    backdrop: "#242038",
    notification: "#242038",
  },
  fonts: DefaultTheme.fonts,
  animation: DefaultTheme.animation,
};

export default theme;
