import { Backdrop, CircularProgress } from "@mui/material";
import React, { FC } from "react";

interface BackdropLoadingProps {
  loading: boolean;
}

const BackdropLoading: FC<BackdropLoadingProps> = ({ loading }) => {
  return (
    <Backdrop
      open={loading}
      sx={(theme) => ({ color: "#fff", zIndex: 999999 })}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoading;
