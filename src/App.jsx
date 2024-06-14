import React, { useRef, useState } from "react";
import "./App.css";
import * as markerjs2 from "markerjs2";
import * as cropro from "cropro";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineRadiusBottomleft } from "react-icons/ai";
import { MdOutlineCropRotate } from "react-icons/md";

const App = () => {
  const imgRef = useRef(null);

  const [editImage, setEditImage] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (imgRef.current) {
          imgRef.current.src = e.target.result;
        }
      };
      setEditImage(file);
      reader.readAsDataURL(file);
    }
    setIsOpen(true);
  };

  const showMarkerArea = () => {
    if (imgRef.current !== null) {
      const markerArea = new markerjs2.MarkerArea(imgRef.current);
      markerArea.addEventListener("render", (event) => {
        if (imgRef.current) {
          imgRef.current.src = event.dataUrl;
          setIsOpen(true);
        }
      });
      markerArea.show();
    }
    setIsOpen(false);
  };

  const showCropArea = () => {
    if (imgRef.current !== null) {
      const cropArea = new cropro.CropArea(imgRef.current);
      cropArea.addRenderEventListener((dataUrl) => {
        if (imgRef.current) {
          imgRef.current.src = dataUrl;
          setIsOpen(true);
        }
      });
      cropArea.show();
    }
    setIsOpen(false);
  };

  return (
    <div className="App px-6 justify-center items-center flex flex-col gap-5 w-screen h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Image Annotation and Cropping Demo
      </h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      <div>
        <div className="relative flex flex-col ">
          <div
            className={`h-10 pl-5 w-96 text-2xl font-bold  text-white space-x-6 bg-zinc-900 flex  ${
              editImage ? "block" : "hidden"
            } ${isOpen ? "block" : "hidden"} `}
          >
            <button onClick={showMarkerArea}>
              <AiOutlineForm />
            </button>
            <button onClick={showCropArea}>
              <MdOutlineCropRotate />
            </button>
          </div>
        </div>
        <div>
          <img
            ref={imgRef}
            src={editImage}
            alt="sample"
            className="w-96 h-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default App;

/* import React, { useRef, useState } from "react";
import "./App.css";
import * as markerjs2 from "markerjs2";
import * as cropro from "cropro";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineRadiusBottomleft } from "react-icons/ai";

const App = () => {
  const imgRef = useRef(null);

  const [editImage, setEditImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (imgRef.current) {
          imgRef.current.src = e.target.result;
        }
      };
      setEditImage(file);
      reader.readAsDataURL(file);
    }
  };

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

  return (
    <div className="App px-6 justify-center items-center flex flex-col gap-5 w-screen h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Image Annotation and Cropping Demo
      </h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      <div className="relative flex gap-1">
        <div
          className={`mb-4 flex gap-2 absolute top-5 right-0 ${
            editImage ? "block" : "hidden"
          }`}
        >
          <button
            onClick={showMarkerArea}
            className="mix-blend-multiply text-2xl font-bold "
          >
            <AiOutlineForm />
          </button>
          <button
            onClick={showCropArea}
            className="mix-blend-multiply text-2xl font-bold "
          >
            <AiOutlineRadiusBottomleft />
          </button>
        </div>
      </div>
      <div>
        <img
          ref={imgRef}
          src={editImage}
          alt="sample"
          className="w-96 h-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default App;

 */
