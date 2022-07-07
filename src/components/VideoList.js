import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const VideoList = ({ videoList }) => {
  return (
    <Container fixed>
      <Grid container spacing={8} justifyContent="center" alignItems="center">
        {videoList.map((video, idx) => {
          return (
            <Grid key={video.video_url} item lg={6} md={6} sm={12} xs={12}>
              {/* <Box key={idx} sx={{ my: 4, width: "100%" }}> */}
              <video width="100%" controls poster={video.poster_url}>
                <source src={video.video_url} type={video?.type} />
              </video>
              {/* </Box> */}
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default VideoList;
