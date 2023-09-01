import React, { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";
interface ITheme {
  toggleTheme: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ITheme | undefined>(undefined);
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Must be inside the provider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // state and functions
  const [theme, setTheme] = useState<Theme>("dark");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const values = {
    toggleTheme: toggleTheme,
    theme: theme,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
