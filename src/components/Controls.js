import React from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Controls = ({ setVideoUpload, uploadVideo }) => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ m: "0 auto", textAlign: "center", maxWidth: "70%" }}
    >
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Input
          type="file"
          onChange={(e) => setVideoUpload(e)}
          variant="contained"
          sx={{ width: "100%" }}
        />
      </Grid>
      {/* <Grid item lg={4} md={4} sm={12} xs={12}>
        <Button
          variant="contained"
          onClick={uploadVideo}
          sx={{ width: "100%" }}
        >
          Upload Video
        </Button>
      </Grid> */}
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Button
          variant="contained"
          // onClick={onCaputreHandler}
          sx={{ width: "100%" }}
        >
          Capture
        </Button>
      </Grid>
    </Grid>
  );
};

export default Controls;
