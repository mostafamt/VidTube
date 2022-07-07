import React from "react";
import { storage } from "./firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  uploadString,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import captureVideoFrame from "capture-video-frame";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Controls from "./components/Controls";

import Appbar from "./components/Appbar";

import CircularStatic from "./components/CircularStatic";

const UploadVideo = () => {
  const [video, setVideo] = React.useState(null);
  const [videoList, setVideoList] = React.useState([]);
  const [showState, setShowState] = React.useState(false);
  const [percentage, setPercentage] = React.useState(0);
  const videoListRef = ref(storage, "videos/");

  React.useEffect(() => {
    listAll(videoListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setVideoList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const setVideoUpload = (e) => {
    // console.log("hello");
    setVideo(e.target.files[0]);
  };

  const uploadVideo = () => {
    if (video == null) return;
    const id = v4();
    const videoRef = ref(storage, `videos/${id}`);
    setShowState(true);

    const uploadTask = uploadBytesResumable(videoRef, video);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(parseInt(progress));
        console.log(progress);
        console.log(snapshot.state);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoList((prev) => [...prev, downloadURL]);
          console.log("File available at", downloadURL);
          setShowState(false);
        });

        // getDownloadURL(uploadTask.snaphot.ref).then((url) => {
        // setVideoList((prev) => [...prev, url]);
        //   console.log("File available at", url);
        // });
      }
    );
    // uploadBytes(videoRef, video).then((snapshot) => {
    //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   console.log(progress);
    //   getDownloadURL(snapshot.ref).then((url) => {
    //     setVideoList((prev) => [...prev, url]);
    //   });
    //   alert("Video uploaded successfuly");
    //   setShowState(false);
    // });
  };

  const onCaputreHandler = () => {
    var canvas = document.createElement("CANVAS");
    var video = "my-video";
    canvas.width = 1024;
    canvas.height = 576;
    console.log(canvas);
    canvas.getContext("2d").drawImage(video, 0, 0);
  };

  return (
    <>
      <Appbar />
      <Controls setVideoUpload={setVideoUpload} uploadVideo={uploadVideo} />

      {showState && (
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
      )}

      <Box sx={{ textAlign: "center", width: "70%", m: "0 auto" }}>
        {videoList.map((url, idx) => {
          return (
            <Box key={idx} sx={{ m: 4, width: "100%" }}>
              <video width="100%" controls sx={{ m: "0 auto" }}>
                <source src={url} />
              </video>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default UploadVideo;
