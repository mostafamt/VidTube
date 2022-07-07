import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LiveTvIcon from "@mui/icons-material/LiveTv";

const Appbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ m: 0 }} position="absolute">
          <Container fixed>
            <Toolbar>
              <LiveTvIcon sx={{ m: 1 }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                VidTube
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Toolbar></Toolbar>
    </>
  );
};

export default Appbar;
