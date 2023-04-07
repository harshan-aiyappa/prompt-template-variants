import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const HomeScreen = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ background: "var(--blue-two)" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          Prompt Template Variants
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HomeScreen;
