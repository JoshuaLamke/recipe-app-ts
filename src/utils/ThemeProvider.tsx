import React, { createContext, useState } from 'react';

type Theme = {
  primaryBtnColor: string;
  primaryBtnBackground: string;
  secondaryBtnColor: string;
  secondaryBtnBackground: string;
  primary: string;
  secondary: string;
  bgDark1: string;
  bgDark2: string;
  textPrimary: string;
};

const Themes: Record<string, Theme> = {
  original: {
    primaryBtnColor: '#0CCA98',
    primaryBtnBackground: '#121212',
    secondaryBtnColor: '#db9aee',
    secondaryBtnBackground: '#ffffff',
    primary: '#0CCA98',
    secondary: '#db9aee',
    bgDark1: '#121212',
    bgDark2: '#2b2a2a',
    textPrimary: '#ffffff',
  },
};

interface ThemeContextValues {
  theme: Theme;
  setTheme: (name: string) => void;
}

export const ThemeContext = createContext<ThemeContextValues | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(Themes.original);

  const setThemeByName = (name: string) => {
    setTheme(Themes[name]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeByName }}>
      {children}
    </ThemeContext.Provider>
  );
};
