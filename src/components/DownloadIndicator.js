import React from "react";
import CircularStatic from "./CircularStatic";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DownloadIndicator = ({ percentage }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        m: "4rem auto",
        width: "60%",
        bgcolor: "#fafafa",
        borderRadius: "1rem",
        p: "1.5rem 2rem",
        boxShadow: "1px 1px 3px #aaaaaa",
      }}
    >
      <CircularStatic progress={percentage} />
      <Typography>Uploading...</Typography>
    </Box>
  );
};

export default DownloadIndicator;
