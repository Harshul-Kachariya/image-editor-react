import React, { useEffect, useRef } from "react";
import "./App.css";
import * as markerjs2 from "markerjs2";
import * as cropro from "cropro";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import { MdOutlineCropRotate } from "react-icons/md";

const App = () => {
  const imgRef = useRef(null);

  const imageUrl =
    "https://cdn.jewelpro.app/orders/9b3ce630-5ee1-4add-9bd6-37222629ce60/4452cf74-55c4-4223-be0a-8dd0058b2918.jpg";

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.src = imageUrl;
    }
  }, []);

  const showMarkerArea = () => {
    if (imgRef.current !== null) {
      const markerArea = new markerjs2.MarkerArea(imgRef.current);
      markerArea.addEventListener("render", (event) => {
        if (imgRef.current) {
          imgRef.current.src = event.dataUrl;
        }
      });
      markerArea.show();
    }
  };

  const showCropArea = () => {
    if (imgRef.current !== null) {
      const cropArea = new cropro.CropArea(imgRef.current);
      cropArea.addRenderEventListener((dataUrl) => {
        if (imgRef.current) {
          imgRef.current.src = dataUrl;
        }
      });
      cropArea.show();
    }
  };

  const handleDownload = () => {
    if (imgRef.current) {
      const link = document.createElement("a");
      link.download = "editedImage.png";
      link.href = imgRef.current.src;
      link.click();
    }
  };

  return (
    <div className="App px-6 justify-center items-center flex flex-col gap-5 w-screen h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Image Annotation and Cropping Demo
      </h1>
      <div>
        <div className="relative flex flex-col mb-4">
          <div className="h-10 pl-5 w-96 text-2xl font-bold text-white space-x-6 bg-zinc-900 flex">
            <button onClick={showMarkerArea}>
              <AiOutlineForm />
            </button>
            <button onClick={showCropArea}>
              <MdOutlineCropRotate />
            </button>
            <button onClick={handleDownload}>
              <AiOutlineDownload />
            </button>
          </div>
        </div>
        <div>
          <img
            ref={imgRef}
            src={imageUrl}
            alt="Editable"
            className="w-96 h-96 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
