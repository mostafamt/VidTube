import React from "react";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

const ChooseButton = ({ setVideoUpload }) => {
  return (
    <Box>
      <Input
        type="file"
        inputProps={{ accept: "video/*" }}
        onChange={(e) => setVideoUpload(e)}
        variant="contained"
        sx={{ width: "100%", my: 4 }}
      />
    </Box>
  );
};

export default ChooseButton;
