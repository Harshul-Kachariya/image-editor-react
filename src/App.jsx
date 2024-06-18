import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import * as markerjs2 from "markerjs2";
import * as cropro from "cropro";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import { MdOutlineCropRotate } from "react-icons/md";

const App = () => {
  const imgRef = useRef(null);

  const [imageUrl, setImageUrl] = useState(
    "https://images.pexels.com/photos/11519759/pexels-photo-11519759.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
  );

  const [editedImageData, setEditedImageData] = useState(null);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.src = imageUrl;
    }
  }, []);

  const showMarkerArea = () => {
    try {
      if (imgRef.current !== null) {
        const markerArea = new markerjs2.MarkerArea(imgRef.current);
        markerArea.addEventListener("render", (event) => {
          if (imgRef.current) {
            imgRef.current.src = event.dataUrl;
          }
        });
        markerArea.show();
      }
    } catch (e) {
      console.warn("Warning from markerjs2:", e);
    }
  };

  const showCropArea = () => {
    try {
      if (imgRef.current !== null) {
        const cropArea = new cropro.CropArea(imgRef.current);
        cropArea.addRenderEventListener((dataUrl) => {
          if (imgRef.current) {
            imgRef.current.src = dataUrl;
          }
        });
        cropArea.show();
      }
    } catch (e) {
      console.warn("Warning from cropro:", e);
    }
  };

  const handleDownload = () => {
    if (editedImageData) {
      const link = document.createElement("a");
      link.download = "editedImage.png";
      link.href = editedImageData;
      link.click();
    }
  };

  return (
    <div className="App px-6 justify-center items-center flex flex-col gap-5 w-screen h-screen">
      <h1 className="text-3xl font-bold ">
        Image Annotation and Cropping Demo
      </h1>
      <div>
        <div className="relative flex flex-col">
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
        <img
          ref={imgRef}
          src={editedImageData || imageUrl}
          alt="Editable"
          className="w-96 h-96 cursor-pointer"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
};

export default App;
