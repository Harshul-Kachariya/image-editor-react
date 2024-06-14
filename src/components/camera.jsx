// CameraComponent.js
import React, { useState, useRef, useEffect } from "react";

const CameraComponent = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (!stream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [stream]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {stream && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full max-w-xl"
        />
      )}
      {!stream && <p className="text-red-500">Failed to access camera.</p>}
    </div>
  );
};

export default CameraComponent;
