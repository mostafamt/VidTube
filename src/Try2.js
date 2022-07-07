import { useEffect, useRef, useState } from "react";
// import "./styles.css";
import {
  getVideoThumbnail,
  importFileandPreview,
} from "@rajesh896/video-thumbnails-generator";

export default function App() {
  const [image, setImage] = useState();
  const [video, setVideo] = useState();
  const [thumbNumber, setThumbNumber] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoThumb, setVideoThumb] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const refs = useRef({
    video: null,
    loader: null,
    numberInput: null,
    thumbButton: null,
  });

  useEffect(() => {
    if (video) {
      importFileandPreview(video).then((res) => {
        setVideoUrl(res);
      });
      setVideoThumb("");
      setThumbnails([]);
      if (refs.current.video) {
        refs.current.video.style.transform = "scale(1)";
      }

      if (refs.current.numberInput) {
        refs.current.numberInput.style.display = "block";
      }
      if (refs.current.thumbButton) {
        refs.current.thumbButton.style.display = "block";
      }
    }
  }, [video]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <video
          poster={videoThumb}
          style={{
            maxWidth: 600,
            maxHeight: 400,
            transform: "scale(0)",
            transition: "all 0.3s",
          }}
          controls
          id="video"
          ref={(el) => (refs.current.video = el)}
          src={videoUrl}
        >
          <source src={videoUrl} type={video?.type} />
          Your browser does not support the video tag.
        </video>
        <div style={{ display: "flex", marginTop: 25 }}>
          <input
            type="file"
            id="inputfile"
            accept="video/*"
            onChange={(e) => {
              if (e.target.files?.length > 0) {
                setVideo(e.target.files[0]);
              }
            }}
          />
          <div
            id="numberWrapper"
            style={{ display: "none" }}
            ref={(el) => (refs.current.numberInput = el)}
          >
            <label for="numberofthumbnails" style={{ marginLeft: 15 }}>
              Enter number of thumbnails to generate
            </label>
            <input
              type="number"
              id="numberofthumbnails"
              onChange={(e) => {
                setThumbNumber(parseInt(e.target.value, 0));
              }}
            />
          </div>
        </div>
        <div
          style={{ marginTop: 25, display: "none" }}
          id="buttonWrapper"
          ref={(el) => (refs.current.thumbButton = el)}
        >
          <button
            id="generatethumbnails"
            onClick={() => {
              if (video) {
                if (refs.current.loader) {
                  refs.current.loader.style.display = "block";
                }
                console.log("hi");
                getVideoThumbnail(video, 20).then((thumb) => {
                  console.log(typeof thumb);
                  console.log(thumb);
                  setImage(thumb);
                });
                // generateVideoThumbnails(video, thumbNumber).then((thumbs) => {
                //   setThumbnails(thumbs);
                //   if (refs.current.loader) {
                //     refs.current.loader.style.display = "none";
                //   }
                // });
              }
            }}
          >
            Generate Thumbnails
          </button>
        </div>
      </div>
      <div
        id="loader"
        style={{ display: "none", textAlign: "center" }}
        ref={(el) => (refs.current.loader = el)}
      >
        <img
          src="https://i.giphy.com/media/l3nWhI38IWDofyDrW/giphy.webp"
          alt=""
        />
      </div>
      <div
        id="thumbnails"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          transition: "all 0.3s",
        }}
      >
        <img src={image} alt="img" height="200px" />
        {thumbnails.map((item) => {
          return (
            <img
              src={item}
              style={{ width: 200, margin: 10, cursor: "pointer" }}
              alt=""
              onClick={() => {
                setVideoThumb(item);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          );
        })}
      </div>
    </>
  );
}
