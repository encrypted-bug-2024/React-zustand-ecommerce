import React from "react";
import { IconButton, useTheme, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { ColorContext } from "../ColorContext";

export const ToggleButton = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorContext);

  return (
    <Tooltip
      title={
        theme.palette.mode === "dark"
          ? "Turn on the light"
          : "Turn off the light"
      }
    >
      <IconButton
        onClick={colorMode.toggleColorMode}
        color="inherit"
        size="large"
      >
        {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
    // </Box>
  );
};
