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
import {
  getVideoThumbnail,
  importFileandPreview,
} from "@rajesh896/video-thumbnails-generator";
import { v4 } from "uuid";
import captureVideoFrame from "capture-video-frame";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import Appbar from "./components/Appbar";
import Controls from "./components/Controls";
import DownloadIndicator from "./components/DownloadIndicator";
import VideoList from "./components/VideoList";

import ChooseButton from "./components/ChooseButton";
import CaptureButton from "./components/CaptureButton";
import SelectedCapture from "./components/SelectedCapture";

const App = () => {
  const [time, setTime] = React.useState();
  const [image, setImage] = React.useState();
  const [video, setVideo] = React.useState();
  const [videoUrl, setVideoUrl] = React.useState("");
  const [showState, setShowState] = React.useState(false);
  const [percentage, setPercentage] = React.useState(0);

  const [posterURL, setPosterURL] = React.useState();
  const [videoURL, setVideoURL] = React.useState();
  const [list, setList] = React.useState([]);

  const refs = React.useRef({
    video: null,
    capture: null,
    image: null,
    upload: null,
    loader: null,
    numberInput: null,
    thumbButton: null,
  });

  React.useEffect(() => {
    if (video) {
      importFileandPreview(video).then((res) => {
        setVideoUrl(res);
      });
      if (refs.current.video) {
        refs.current.video.style.transform = "scale(1)";
      }
      if (refs.current.capture) {
        refs.current.capture.style.display = "inline";
      }
      setTime(refs.current.video.currentTime);
    }
    if (image) {
      if (refs.current.image) {
        refs.current.image.style.display = "inline-block";
      }
      if (refs.current.upload) {
        refs.current.upload.style.display = "inline";
      }
    }
  }, [video, image]);

  React.useEffect(() => {
    if (posterURL && videoURL) {
      fetch("https://firestore-ccb06-default-rtdb.firebaseio.com/videos.json", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video_url: videoURL, poster_url: posterURL }),
      })
        .then((response) => response.json())
        .then((data) => {
          setList((prevList) => [
            ...prevList,
            { video_url: videoURL, poster_url: setPosterURL },
          ]);
          setPosterURL();
          setVideoURL();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [posterURL, videoURL]);

  React.useEffect(() => {
    fetch("https://firestore-ccb06-default-rtdb.firebaseio.com/videos.json")
      .then((res) => res.json())
      .then((data) => {
        const keys = Object.keys(data);
        keys.map((key) => {
          setList((prevList) => [...prevList, data[key]]);
        });
      });
  }, []);

  const setVideoUpload = (e) => {
    setVideo(e.target.files[0]);
  };

  const uploadVideo = (id) => {
    if (video == null) return;
    const videoRef = ref(storage, `videos/${id}`);
    setShowState(true);

    const uploadTask = uploadBytesResumable(videoRef, video);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(parseInt(progress));
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setShowState(false);
          setVideoURL(downloadURL);
        });
      }
    );
  };

  const uploadPicture = (id) => {
    const message4 = image;
    const storageRef = ref(storage, `videos/${id}.jpeg`);
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setPosterURL(downloadURL);
      });
    });
  };

  const onCaputreHandler = () => {
    getVideoThumbnail(video, parseInt(time)).then((thumb) => {
      setImage(thumb);
    });
  };

  const onUploadHandler = () => {
    // data_url
    const id = v4();
    uploadVideo(id);
    uploadPicture(id);
  };

  return (
    <>
      <Appbar />
      <Container fixed>
        <ChooseButton setVideoUpload={setVideoUpload} />
        {/* <Controls setVideoUpload={setVideoUpload} uploadVideo={uploadVideo} /> */}

        <Grid container spacing={2} alignItems="end">
          <Grid item lg={8} md={8} sm={8} xs={8}>
            <video
              // poster={videoThumb}
              style={{
                // maxWidth: 600,
                // maxHeight: 400,
                width: "100%",
                transform: "scale(0)",
                transition: "all 0.3s",
                marginRight: "10px",
              }}
              controls
              id="video"
              ref={(el) => (refs.current.video = el)}
              src={videoUrl}
            >
              <source src={videoUrl} type={video?.type} />
              Your browser does not support the video tag.
            </video>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={4}>
            <div
              ref={(el) => (refs.current.image = el)}
              style={{ display: "none" }}
            >
              <img src={image} alt="img" style={{ width: "100%" }} />
            </div>
          </Grid>
        </Grid>

        {/* <CaptureButton display="none" React.forwardRef()={(el) => (refs.current.capture = el)} /> */}
        <Grid
          container
          // spacing={4}
          sx={{ mt: 4, mb: 8 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item lg={6} md={6} sm={6} xs={6} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={onCaputreHandler}
              sx={{ display: "none" }}
              ref={(el) => (refs.current.capture = el)}
            >
              Capture
            </Button>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={onUploadHandler}
              sx={{ display: "none", bgcolor: "secondary.main" }}
              ref={(el) => (refs.current.upload = el)}
            >
              Upload
            </Button>
          </Grid>
        </Grid>

        {showState && <DownloadIndicator percentage={percentage} />}

        <Divider sx={{ my: 4, height: "5px" }} />

        <VideoList videoList={list} />
      </Container>
    </>
  );
};

export default App;
