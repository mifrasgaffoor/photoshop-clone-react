import React, { useState } from "react";
import SidebarItem from "./components/SidebarItem";
import "./App.css";
import Slider from "./components/Slider";
import * as htmltoImage from "html-to-image";
import * as download from "downloadjs";

const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
];

const App = () => {
  const [image, setImage] = useState(null);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [selectedindex, setselectedIndex] = useState(0);

  const selectedOption = options[selectedindex];

  const handleChange = (event) => {
    console.log(event.target.files[0]);
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setImage(objectUrl);
  };

  const applyFilters = () => {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return {
      filter: filters.join(" "),
      backgroundImage: `url(${image})`,
    };
  };

  const sliderChnage = (target) => {
    setOptions((prevesOptions) => {
      return prevesOptions.map((option, index) => {
        if (index !== selectedindex) return option;
        return { ...option, value: target.value };
      });
    });
  };

  const downloadImage = () => {
    htmltoImage.toPng(document.getElementById("image")).then((dataUrl) => {
      download(dataUrl, `${Date.now()}.png`);
    });
  };

  return (
    <div className="container">
      {image ? (
        <div className="main-image" id="image" style={applyFilters()} />
      ) : (
        <div className="upload-image">
          <h1>Photoshop Clone</h1>
          <input type="file" accept="image/" onChange={handleChange} />
        </div>
      )}

      <div className="sidebar">
        {options.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              name={option.name}
              active={index === selectedindex}
              handleClick={() => setselectedIndex(index)}
            />
          );
        })}
        <button className="download" onClick={downloadImage}>
          Download
        </button>
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={sliderChnage}
      />
    </div>
  );
};
export default App;
