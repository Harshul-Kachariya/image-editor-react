import React from "react";
import "./App.css";
import EditImage from "./components/EditImage";

const App = () => {
  return (
    <div>
      <EditImage
        imageUrls={
          "https://images.pexels.com/photos/17354530/pexels-photo-17354530/free-photo-of-grass-growing-on-sandy-beach.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
      />
    </div>
  );
};

export default App;
