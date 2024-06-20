import React from "react";
import "./App.css";
import EditImage from "./components/EditImage";

const App = () => {
  return (
    <div>
      <EditImage
        imageUrls={
          "https://cdn.jewelpro.app/orders/9b3ce630-5ee1-4add-9bd6-37222629ce60/4452cf74-55c4-4223-be0a-8dd0058b2918.jpg"
        }
      />
    </div>
  );
};

export default App;
