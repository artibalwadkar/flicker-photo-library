import React from "react";
import "./App.css";
import PhotoLibrary from "./component/photo-library";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/js/dist/carousel.js";

import "font-awesome/css/font-awesome.css";

function App() {
  return (
    <div className="container">
      <PhotoLibrary />
    </div>
  );
}

export default App;
