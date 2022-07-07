import React from "react";
import Button from "@mui/material/Button";

const CaptureButton = ({ onCaputreHandler, display }) => {
  return (
    <Button
      variant="contained"
      onClick={onCaputreHandler}
      sx={{ width: "100%", display: display }}
    >
      Capture
    </Button>
  );
};

export default CaptureButton;
