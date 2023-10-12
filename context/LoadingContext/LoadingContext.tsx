"use client";
import React from "react";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import { RootState } from "@/store";
interface LoadingProps {
  loading: boolean;
}

export const LoadingContext = React.createContext<LoadingProps>({
  loading: false,
});

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useSelector((state: RootState) => state.loadingStore);
  const theme = useTheme();
  return (
    <LoadingContext.Provider
      value={{
        loading,
      }}
    >
      {children}
      <Backdrop
        sx={{
          color: theme.palette.primary.main,
          zIndex: theme.zIndex.modal + 100,
        }}
        timeout={{
          exit: theme.transitions.duration.leavingScreen + 500,
        }}
        open={loading}
      >
        <CircularProgress
          color="primary"
          aria-busy={loading}
          aria-describedby="loading-progress"
        />
      </Backdrop>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
