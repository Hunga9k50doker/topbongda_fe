import React from "react";
import type { ThemeConfig } from "antd";
import { ConfigProvider, theme } from "antd";

interface ThemeAntProps {
  themeMUI: any;
  mode: string;
  children: React.ReactNode;
}

export const ThemeAnt = ({ themeMUI, mode, children }: ThemeAntProps) => {
  //config theme antd follow MUI theme
  const customTheme: ThemeConfig = {
    token: {
      colorText: themeMUI.palette.text.primary,
      colorBgContainer: themeMUI.palette.background.default,
      colorPrimaryBg: themeMUI.palette.background.paper,
      colorBorder: themeMUI.palette.custom.gray,
      colorInfoBorderHover: themeMUI.palette.primary.main,
      colorInfo: themeMUI.palette.custom.colorInfo,
      colorPrimary: themeMUI.palette.primary.main,
    },
    algorithm: [mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm],
  };

  return <ConfigProvider theme={customTheme}>{children} </ConfigProvider>;
};
