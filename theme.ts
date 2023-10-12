import { PaletteMode } from "@mui/material";
import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
export const getDesignTokens = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              light: "#e2ebf0",
              main: "#0C9713",
              dark: "#000",
            },
            // divider: "#E4E6EB",
            background: {
              default: "#f5f5f5",
              paper: "#fff",
            },
            text: {
              primary: grey[900],
              secondary: "#9ca3af",
            },
            secondary: {
              main: "#E4E6EB",
            },
            error: {
              main: "#F25C45",
            },
            success: {
              main: "#007F4F",
            },
            custom: {
              textShadow:
                "0 0 10px #fff, 0 0 8px #fff, 0 0 10px #fff, 0 0 40px #0fa, 0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa, 0 0 150px #0fa",
              lightGreen: "#0C9713",
              gray: "#8B9DAF",
              boxShadow: "rgba(0, 0, 0, 0.15)",
              rgbaPrimary: "rgba(12, 151, 19, 0.15)",
              orange: "linear-gradient(to right, #FE562D, #F0951A)",
              border: "#EDEFF4",
              gradientOverlay:
                "linear-gradient(180deg ,rgba(240, 242, 245, 1) 0%, rgba(240, 242, 245, 0.2) 30%,rgba(240, 242, 245, 0.3) 50%, rgba(240, 242, 245, 0.5) 70%, rgba(240, 242, 245, 1) 90%)",
              gradientCover: "rgba(240, 242, 245, 0)",
              gradientLight:
                "linear-gradient(to top, #EEEBE8 0%, #EEEBE8 100%)",
              gradientButton: "linear-gradient(to right, #EEEBE8, #FDFDFD)",
              gradientDeepSpace: "#fff",
              bgInput: "#e2ebf0",
              colorInfo: "#004AAD",
              colorError: "#A80002",
              colorSuccess: "#08650d",
            },
            header: {
              background: "#e2ebf0",
            },
            navigation: {
              background: "#e2ebf0",
              color: "#000",
            },
          }
        : {
            // palette values for dark mode
            primary: {
              light: "#e2ebf0",
              main: "#0C9713",
              dark: "#000",
            },
            // divider: "#2d2f34",
            background: {
              default: "#000",
              paper: "#141414",
            },
            text: {
              primary: "#e2ebf0",
              secondary: "#9ca3af",
            },
            secondary: {
              main: "#9A7D0F",
            },
            error: {
              main: "#F25C45",
            },
            success: {
              main: "#007F4F",
            },
            custom: {
              textShadow:
                "0 0 10px #fff, 0 0 8px #fff, 0 0 10px #fff, 0 0 40px #0fa, 0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa, 0 0 150px #0fa",
              lightGreen: "#22c55e",
              gray: "#8B9DAF",
              orange: "linear-gradient(to right, #FE562D, #F0951A)",
              border: "#EDEFF4",
              boxShadow: "rgba(255, 255, 255, 0.15)",
              rgbaPrimary: "rgba(12, 151, 19, 0.3)",
              gradientOverlay:
                "linear-gradient(180deg ,rgba(24, 24, 24, 1) 0%, rgba(24, 24, 24, 0.35) 30%,rgba(24, 24, 24, 0.5) 50%, rgba(24, 24, 24, 0.7) 70%, rgba(24, 24, 24, 1) 90%)",
              gradientCover:
                "linear-gradient(180deg ,rgba(24, 24, 24, 0) 0%, rgba(24, 24, 24, 0.35) 30%,rgba(24, 24, 24, 0.5) 50%, rgba(24, 24, 24, 0.7) 70%, rgba(24, 24, 24, 1) 90%)",
              gradientLight: "linear-gradient(to top, #232526, #414345)",
              gradientButton: "linear-gradient(to right, #475462, #2C343F)",
              gradientDeepSpace: "#000",
              bgInput: "#343441",
              colorInfo: "#004AAD",
              colorError: "#A80002",
              colorSuccess: "#08650d",
            },
            header: {
              background: "#e2ebf0",
            },
            navigation: {
              background: "#e2ebf0",
              color: "#000",
            },
          }),
    },
    components: {
      ...(mode === "light"
        ? {
            MuiDialog: {
              styleOverrides: {
                paper: { backgroundColor: "#F0F2F5" },
              },
            },
            MuiTypography: {
              styleOverrides: {
                root: { color: "#0F1418" },
              },
            },
            MuiSpeedDialIcon: {
              styleOverrides: {
                root: { color: "#0C9713" },
              },
            },
          }
        : {
            MuiDialog: {
              styleOverrides: {
                paper: { backgroundColor: "#23252B" },
              },
            },
          }),
      MuiDialog: {
        styleOverrides: {
          paper: { backgroundImage: "unset" },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
            boxShadow: "none",
            textTransform: "none",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });
