"use client";
import React, { useState } from "react";
import { ThemeProvider as ThemeProviderMUI } from "@mui/material/styles";
import { Provider as ProviderRedux } from "react-redux";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { store } from "@/store";
import { PaletteMode } from "@mui/material";
import { getDesignTokens } from "@/theme";
import Toast from "@/components/Toast";
import GoTop from "@/components/GoTop";
import { setCookies } from "@/utils";
import { SWRConfig } from "swr";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/createEmotionCache";
import ModalProvider from "@/context/ModalContext/ModalContext";
import LoadingProvider from "@/context/LoadingContext/LoadingContext";
import { ThemeAnt as ThemeProviderAnt } from "@/themeAnt";
import { AuthContextProvider } from "@/context/AuthContext";
import StyledComponentsRegistry from "@/libs/AntdRegistry";
interface ThemeProps {
  mode: string;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  modeInit: PaletteMode;
}

export const ThemeContext = React.createContext<ThemeProps>({
  mode: "light",
  toggleTheme: () => {},
});

const ThemeProvider = ({ children, modeInit }: ThemeProviderProps) => {
  const cache = createEmotionCache();
  const [mode, setMode] = useState<any>(modeInit || "dark");
  const themeMUI: any = React.useMemo(() => getDesignTokens(mode), [mode]);
  const toggleTheme = React.useCallback(() => {
    setCookies("theme", mode === "light" ? "dark" : "light");
    setMode(mode === "light" ? "dark" : "light");
  }, [mode]);

  return (
    <CacheProvider value={cache}>
      <StyledComponentsRegistry>
        <ProviderRedux store={store}>
          <SWRConfig value={{ provider: () => new Map() }}>
            <AuthContextProvider>
              <ThemeContext.Provider value={{ toggleTheme, mode }}>
                <ThemeProviderMUI theme={themeMUI}>
                  {/* theme for ant */}
                  <ThemeProviderAnt mode={mode} themeMUI={themeMUI}>
                    <LoadingProvider>
                      <ModalProvider>
                        <ScopedCssBaseline>
                          <GoogleAnalytics trackPageViews />
                          {children}
                          <Toast theme={mode} />
                          <GoTop />
                        </ScopedCssBaseline>
                      </ModalProvider>
                    </LoadingProvider>
                  </ThemeProviderAnt>
                </ThemeProviderMUI>
              </ThemeContext.Provider>
            </AuthContextProvider>
          </SWRConfig>
        </ProviderRedux>
      </StyledComponentsRegistry>
    </CacheProvider>
  );
};
export default ThemeProvider;
