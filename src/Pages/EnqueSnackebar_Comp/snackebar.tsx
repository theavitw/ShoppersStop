import { Snackbar } from "@mui/material";
import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";

interface SnackbarContextProps {
  showSnackbar: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
  });

  const showSnackbar = (message: string) => {
    setSnackbarState({ open: true, message });
  };

  const handleClose = () => {
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbarState.open}
        message={snackbarState.message}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "green",
            borderRadius: "10px",
          },
          "& .MuiSnackbarContent-message": { color: "white" },
          "& .MuiSnackbarContent-action": { color: "white" },
        }}
      />
    </SnackbarContext.Provider>
  );
};
