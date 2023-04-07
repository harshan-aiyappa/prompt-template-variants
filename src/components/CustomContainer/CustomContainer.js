import React from "react";
import { Button } from "@mui/material";
import { Box, Container } from "@mui/system";
const CustomContainer = (props) => {
  return (
    <Container
      maxWidth={false}
      sx={{ flexGrow: 1, marginTop: "2em", border: "1px solid green" }}
      disableGutters={true}
    >
      {props.children}
    </Container>
  );
};

export default CustomContainer;
