import React from "react";

import captureVideoFrame from "capture-video-frame";
import { storage } from "./firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  uploadString,
} from "firebase/storage";

import {
  getVideoThumbnail,
  importFileandPreview,
} from "@rajesh896/video-thumbnails-generator";

import path from "./Peter Crouch overhead kick - Liverpool v Galatasaray - 2006_07-AvbPf7xrfN4.mp4";

import { saveAs, getFileName } from "file-saver";

const ExtractFrame = () => {
  const [image, setImage] = React.useState(null);

  const onExtractHandler = () => {
    const frame = captureVideoFrame("my-video", "jpeg");
    const formData = new FormData();
    formData.append("file", frame.blob, `my-screenshot.${frame.format}`);
    let dataURI = frame.dataUri;
    setImage(dataURI);
    console.log(typeof frame);
    const message = dataURI;
    const imageRef = ref(storage, `images/test.jpeg`);
    console.log(typeof message);
    // uploadString(imageRef, message, "data_url").then((snapshot) => {
    //   console.log("Uploaded");
    // });
    // // const imageRef = ref(storage, `images/test`);
    // uploadBytes(imageRef, formData).then(() => {
    //   // getDownloadURL(snapshot.ref).then((url) => {
    //   //   setImageList((prev) => [...prev, url]);
    //   // });
    //   alert("Image Uploaded");
    // });
    // var filename = "test.jpg";
    // var storageRef = ref("/images/" + filename);
    // // var message = "data:image/jpg;base64," + frame.dataUri;
    // uploadString(message, "data_url").then(function (snapshot) {
    //   console.log("Uploaded a data_url string!");
    // });
    // // Data URL string
    // const message4 = frame.dataUri;
    // uploadString(storageRef, message4, "base64url").then((snapshot) => {
    //   console.log("Uploaded a data_url string!");
    // });
  };

  React.useEffect(() => {}, []);

  const clickHandler = () => {
    let img = document.querySelector("img");
    let imagePath = img.getAttribute("src");
    getFileName(imagePath);
  };

  return (
    <div>
      <div>
        <video id="my-video" height="200px" controls>
          <source src={path} type="video/mp4" />
        </video>
      </div>
      <div>
        <button onClick={onExtractHandler}>extract</button>
      </div>
      <img
        id="my-screenshot"
        alt="img"
        src={image}
        style={{
          height: "300px",
        }}
      />
    </div>
  );
};

export default ExtractFrame;

/*<div>
        <video id="my-video" height="200px" controls>
          <source src={path} type="video/mp4" />
        </video>
      </div> */
/* <div>
        <button onClick={onExtractHandler}>extract</button>
      </div>
      <img
        id="my-screenshot"
        alt="img"
        src={image}
        style={{
          height: "300px",
        }}
      /> *
    // </div> */

/**
     * 
     * <div>
      <video id="my-video" height="200px" controls>
        <source
          src={
            "https://firebasestorage.googleapis.com/v0/b/uploadingfiles-221e5.appspot.com/o/videoEditing%2F4c6c7d34-3e04-4dd3-9088-20326a38e838.mp4?alt=media&token=080a3234-477d-4540-b817-171e6c75b488"
          }
          type="video/mp4"
        />
      </video>
      <div>
        <button onClick={onExtractHandler}>extract</button>
      </div>
      <img
        id="my-screenshot"
        alt="img"
        src={image}
        style={{
          height: "300px",
        }}
      />
    </div>
     */

/**
     * 
     * // <video src="https://firebasestorage.googleapis.com/v0/b/uploadingfiles-221e5.appspot.com/o/videoEditing%2F4c6c7d34-3e04-4dd3-9088-20326a38e838.mp4?alt=media&token=080a3234-477d-4540-b817-171e6c75b488"></video>
    // <div>
    // <video id="my-video" height="200px" controls>
    //   <source src={"https://youtu.be/YOAeBSCkArA"} type="video/mp4" />
    // </video>
     */
