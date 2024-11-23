import { useState, useCallback } from "react";

const useSnackbar = () => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success", // You can add severity like "success", "error", etc.
  });

  const showSnackbar = useCallback((message: string, severity: string = "success") => {
    setSnackbarState({ open: true, message, severity });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbarState((prev) => ({ ...prev, open: false }));
  }, []);

  return {
    snackbarState,
    showSnackbar,
    closeSnackbar,
  };
};

export default useSnackbar;
