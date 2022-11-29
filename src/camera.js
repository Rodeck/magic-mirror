import React, { useState, useRef } from "react";
import InputComponent from "./input";
import { Camera } from "react-camera-pro";
import { FaCamera, FaCaretSquareLeft, FaCaretSquareRight, FaSave, FaTrash } from 'react-icons/fa';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const CameraComponent = () => {
  const pictureButtons = 2;
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const capture = () => {
    console.log("Take a picture");
    const photo = camera.current.takePhoto();
    setImage(photo);
    setSelectedButton(0);
  }

  const discard = () => {
    console.log("Discarding picture.");
    setImage(null);
  }

  const save = () => {
    var newImageList = images.concat([image]);
    console.log(newImageList.length);
    setImages(newImageList);
    setImage(null);
  }

  const left = () => {
    let nextButton = selectedButton - 1;
    if (nextButton < 0) {
      setSelectedButton(pictureButtons - 1);
    } else {
      setSelectedButton(nextButton);
    }
  }

  const confirm = () => {
    if (selectedButton === 0) {
      save();
    } else if (selectedButton === 1) {
      discard();
    }
  }

  const right = () => {
    let nextButton = selectedButton + 1;
    if (nextButton === pictureButtons) {
      setSelectedButton(0);
    } else {
      setSelectedButton(nextButton);
    }
  }

  const buttonClicked = (button) => {
    if (image === null && button === "button-1") {
      capture();
    } else if (image !== null) {
      if (button === "button-0")
        left();

      if (button === "button-1")
        confirm();

      if (button === "button-2")
        right();
    }
  }

  const cameraElement = (<Camera style={{height: "100%"}} ref={camera} />);
  const imageElement = (<img style={{
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '0px',
    top: '0px'
  }} src={image} />);

  const cameraEnabledInput = (
    <div style={{ marginTop: "10px" }}>
      <button disabled style={{ height: "50px", width: "50px", marginRight: "10px" }}>

        <FaCaretSquareLeft></FaCaretSquareLeft>

      </button>
      <button style={{ height: "50px", width: "50px", marginRight: "10px" }}>

        <FaCamera></FaCamera>

      </button>
      <button disabled style={{ height: "50px", width: "50px" }}>

        <FaCaretSquareRight></FaCaretSquareRight>

      </button>


    </div>
  );

  const pictureTakenInput = (
    <div>
      <div style={{ marginTop: "10px" }}>
        <button style={{ height: "50px", width: "50px", marginRight: "10px", backgroundColor: (selectedButton === 0 ? 'green' : 'white') }}>

          <FaSave></FaSave>

        </button>
        <button style={{ height: "50px", width: "50px", marginRight: "10px", backgroundColor: (selectedButton === 1 ? 'green' : 'white') }}>

          <FaTrash></FaTrash>

        </button>


      </div>
    </div>
  );

  const translation = windowDimensions.width / 2 - 110;
  const controlsWrapper = (
    <div style={{ height: "70px", width: "220px", position: "absolute", left: `${translation}px`, "bottom": "50px", backgroundColor: "white"}}>
      {image === null ? cameraEnabledInput : pictureTakenInput}
    </div>
  );

  const takenPictures = (
    <div style={{ height: "150px", position: "absolute", left: "0px", width: "100%", backgroundColor: "rgba(100, 111, 143, 0.3)", zIndex: "2" }}>
      {images.map(image => (
        <div style={{display: "inline-block", marginRight: "10px", marginTop: "10px"}}>
          <img src={image} style={{ height: "130px", width: "130px" }}></img>
        </div>
      ))}
    </div>
  )

  return (
    <div>
      {images.length > 0 ? takenPictures : <div></div>}
      {image === null ? cameraElement : imageElement}
      <InputComponent onClick={buttonClicked}></InputComponent>
      {controlsWrapper}
    </div>
  );
}

export default CameraComponent;