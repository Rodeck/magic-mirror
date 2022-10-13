import React, { useState, useRef, useEffect } from "react";
import { Camera } from "react-camera-pro";
import Button from 'react-bootstrap/Button';
import { ArrowUp } from 'react-bootstrap-icons';

const CameraComponent = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [savedImages, setSavedImages] = useState([]);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);

  let interval;
  const runTimer = () => {
    interval = !interval && setInterval(() => {
      
      console.log(isCountingDown);
       if (isCountingDown && timerValue >= 0) {
        setTimerValue(t => t > 1 ? t - 1 : 0);

        if (timerValue === 0) {
          console.log("Take photo!");
          takePhoto();
          setIsCountingDown(false);
        }
       }

    }, 1000);
  }

  const takePhoto = () => {
    let newPhoto = camera.current.takePhoto();
    setImage(newPhoto);
    setPhotoTaken(true);
  }

  useEffect(() => {
    runTimer()
    return () => clearInterval(interval);
  }, [isCountingDown, timerValue, camera]);

  let photoElement = !photoTaken ? <Camera ref={camera} /> : <img src={image} alt='Taken photo' />
  let discardButton = photoTaken ? <Button
    onClick={() => {
      setPhotoTaken(false);
    }}>Discard</Button> : null;
  let takePhotoButton = !photoTaken ? <Button
    variant="primary"
    onClick={takePhoto}>
    Take photo
  </Button> : null;
  let timerButton = !photoTaken ? <Button
    variant="primary"
    onMouseDown={() => {
      setTimerValue(5);
      setIsCountingDown(true);
    }}>
    <ArrowUp></ArrowUp>
  </Button> : null;
  let timerElement = timerValue !== 0 ? <span>{timerValue}</span> : null;

  let savePhotoButton = photoTaken ? <Button
  variant="primary"
  onClick={() => {
    var currentImages = savedImages;
    console.log(currentImages);
    currentImages.push(image)
    setSavedImages(currentImages);
    setPhotoTaken(false);
  }}>
  Save photo
  </Button> : null;

  return (
    <div style={{ height: '100%' }}>
      <div style={{ height: '90%', maxHeight: '90%' }}>
        {photoElement}
        <div style={{position: 'absolute', left: '50%', top: '50%'}}>
          {timerElement}
        </div>
      </div>
      <div style={{ height: '10%', position: 'absolute', bottom: 0, margin: '10px' }}>
        {takePhotoButton}
        {timerButton}
        {discardButton}
        {savePhotoButton}
      </div>
    </div>
  );
}

export default CameraComponent;