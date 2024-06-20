import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import * as markerjs2 from "markerjs2";
import * as cropro from "cropro";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import { MdOutlineCropRotate } from "react-icons/md";

import { Button, Modal } from "antd";
import { Tooltip } from "antd";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imgRef = useRef(null);

  const imageUrl =
    "https://cdn.jewelpro.app/orders/9b3ce630-5ee1-4add-9bd6-37222629ce60/4452cf74-55c4-4223-be0a-8dd0058b2918.jpg";

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.src = imageUrl;
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showMarkerArea = () => {
    if (imgRef.current !== null) {
      const markerArea = new markerjs2.MarkerArea(imgRef.current);
      markerArea.settings.displayMode = "popup";
      markerArea.uiStyleSettings.toolbarStyleColorsClassName = "bg-gray-50";
      markerArea.uiStyleSettings.toolbarButtonStyleColorsClassName =
        "bg-gradient-to-t from-gray-50 to-gray-50 hover:from-gray-50 hover:to-pink-50 fill-current text-pink-500";
      markerArea.uiStyleSettings.toolbarActiveButtonStyleColorsClassName =
        "bg-gradient-to-t from-pink-100 via-gray-50 to-gray-50 fill-current text-pink-400";
      markerArea.uiStyleSettings.toolbarOverflowBlockStyleColorsClassName =
        "bg-gray-50";

      markerArea.uiStyleSettings.toolboxColor = "#F472B6";
      markerArea.uiStyleSettings.toolboxAccentColor = "#BE185D";
      markerArea.uiStyleSettings.toolboxStyleColorsClassName = "bg-gray-50";
      markerArea.uiStyleSettings.toolboxButtonRowStyleColorsClassName =
        "bg-gray-50";
      markerArea.uiStyleSettings.toolboxPanelRowStyleColorsClassName =
        "bg-pink-100 bg-opacity-90 fill-current text-pink-400";
      markerArea.uiStyleSettings.toolboxButtonStyleColorsClassName =
        "bg-gradient-to-t from-gray-50 to-gray-50 hover:from-gray-50 hover:to-pink-50 fill-current text-pink-300";
      markerArea.uiStyleSettings.toolboxActiveButtonStyleColorsClassName =
        "bg-gradient-to-b from-pink-100 to-gray-50 fill-current text-pink-400";
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
      cropArea.displayMode = "popup";
      cropArea.styles.settings.toolbarStyleColorsClassName = "bg-white";
      cropArea.styles.settings.toolbarButtonStyleColorsClassName =
        "bg-gradient-to-t from-white to-white hover:from-white hover:via-pink-100 hover:to-white fill-current text-pink-500";
      cropArea.styles.settings.toolbarActiveButtonStyleColorsClassName =
        "bg-gradient-to-t from-white to-pink-50 fill-current text-pink-400";
      cropArea.styles.settings.toolbarStraightenerColorsClassName =
        "text-pink-300 fill-current";
      cropArea.styles.settings.toolbarBackgroundColor = "white";
      cropArea.styles.settings.canvasBackgroundColor = "white";

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
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            type="seconry"
            className="hover:border-pink-300 border-pink-200 text-pink-500"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            key="ok"
            type="seconry"
            onClick={handleOk}
            className="bg-pink-400  text-white hover:bg-pink-300 "
          >
            Save
          </Button>,
        ]}
      >
        <div className="relative flex flex-col ">
          <div className="h-10 pl-5 w-96 text-2xl font-bold text-pink-500 space-x-6 bg-white flex">
            <button onClick={showMarkerArea}>
              <Tooltip title="Edit Image">
                <AiOutlineForm />
              </Tooltip>
            </button>
            <button onClick={showCropArea}>
              <Tooltip title="Crop Image">
                <MdOutlineCropRotate />
              </Tooltip>
            </button>
            <button onClick={handleDownload}>
              <Tooltip title="Download Image">
                <AiOutlineDownload />
              </Tooltip>
            </button>
          </div>
        </div>
        <div>
          <img
            ref={imgRef}
            src={imageUrl}
            alt="Editable"
            className="w-96 h-[500px] cursor-pointer"
            crossOrigin="anonymous"
          />
        </div>
      </Modal>
    </div>
  );
};

export default App;
