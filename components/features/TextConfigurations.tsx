"use client";
import { Canvas } from "fabric/fabric-impl";
import { fabric } from "fabric";
import Select from "react-select";
import React, { useState } from "react";

interface Props {
  canvas?: Canvas;
}

const TextConfigurations = ({ canvas }: Props) => {
  const [activeObject, setActiveObject] = useState<
    fabric.Object | null | undefined
  >();

  const [selectedColor, setSelectedColor] = useState("#000");

  canvas?.on("selection:created", () => {
    var activeObject = canvas?.getActiveObject();
    setActiveObject(activeObject);
  });

  canvas?.on("selection:cleared", () => {
    setActiveObject(null);
  });

  var fonts = ["Times New Roman", "Arial", "Pacifico", "VT323", "Quicksand", "Inconsolata"];

  const fontOptions = fonts?.map((font: string) => {
    return {
      value: font,
      label: font,
    };
  });

  const handleBold = () => {
    var activeObject = canvas?.getActiveObject();
    console.log(activeObject);
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set(
        "fontWeight",
        activeObject.fontWeight == "bold" ? "" : "bold"
      );
      canvas?.renderAll();
    }
  };

  const handleItalic = () => {
    var activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set(
        "fontStyle",
        activeObject.fontStyle == "italic" ? "" : "italic"
      );
      canvas?.renderAll();
    }
  };

  const handleUnderline = () => {
    var activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("underline", !activeObject.underline);
      canvas?.renderAll();
    }
  };

  const handleStrike = () => {
    var activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("linethrough", !activeObject.linethrough);
      canvas?.renderAll();
    }
  };

  const handleColor = (color: string) => {
    var activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fill", color);
      canvas?.renderAll();
    }
  };

  const handleAlign = (align: string) => {
    var activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("textAlign", align);
      canvas?.renderAll();
    }
  };

  const handleFontFam = (font: string) => {
    var activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fontFamily", font);
      canvas?.renderAll();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span></span>
      <button
        className="flex bg-white py-1 px-2 border-blue-500 border rounded w-fit"
        onClick={(e: any) => {
          e.preventDefault();
          const text = new fabric.Textbox("Text", {
            width: 100,
            height: 200,
            borderColor: "green",
            hasBorders: true,
            borderDashArray: [5, 5],
            fontWeight: "bold",
            paintFirst: "stroke",
            hasControls: true,
            textAlign: "center",
            centeredRotation: true,
          });
          canvas?.add(text);
          canvas?.setActiveObject(text);
          canvas?.centerObject(text);
        }}
      >
        <i className="ri-text font-[800] text-blue-800"></i>
      </button>
      {activeObject && (
        <div className="flex gap-1 fixed top-[150px] left-[420px] z-50">
          <button className="flex bg-white py-1 px-2 rounded  border border-neutral-400">
            <i className="ri-palette-line font-[800] text-black"></i>
            <input
              className="w-6"
              type="color"
              id="favcolor"
              name="favcolor"
              value={selectedColor}
              onChange={(e) => {
                handleColor(e.target.value);
                setSelectedColor(e.target.value);
              }}
            ></input>
          </button>
          <button
            className="flex bg-white py-1 px-2 rounded  border border-neutral-400"
            onClick={handleBold}
          >
            <i className="ri-bold font-[800] text-black"></i>
          </button>
          <button
            className="flex bg-white py-1 px-2 rounded  border border-neutral-400"
            onClick={handleItalic}
          >
            <i className="ri-italic font-[800] text-black"></i>
          </button>
          <button
            className="flex bg-white py-1 px-2 rounded  border border-neutral-400"
            onClick={handleUnderline}
          >
            <i className="ri-underline font-[800] text-black"></i>
          </button>
          <button
            className="flex bg-white py-1 px-2 rounded  border border-neutral-400"
            onClick={handleStrike}
          >
            <i className="ri-strikethrough font-[800] text-black"></i>
          </button>
          <button
            className="flex bg-white py-1 px-2 rounded  border border-neutral-400"
            onClick={() => handleAlign("left")}
          >
            <i className="ri-align-left font-[800] text-black"></i>
          </button>
          <button
            className="flex bg-white py-1 px-2 rounded  border border-neutral-400"
            onClick={() => handleAlign("center")}
          >
            <i className="ri-align-center font-[800] text-black"></i>
          </button>
          <button
            className="flex bg-white py-1 px-2 rounded  border border-neutral-400"
            onClick={() => handleAlign("right")}
          >
            <i className="ri-align-right font-[800] text-black"></i>
          </button>
          <button
            className="flex bg-white py-1 px-2 rounded  border border-neutral-400"
            onClick={() => handleAlign("justify")}
          >
            <i className="ri-align-justify font-[800] text-black"></i>
          </button>
          <Select
            className="w-[250px]"
            options={fontOptions}
            defaultValue={fontOptions[0]}
            onChange={(value) => {
              handleFontFam(value?.value || "");
            }}
            isClearable
            isSearchable
            classNamePrefix="select"
          />
        </div>
      )}
    </div>
  );
};

export default TextConfigurations;
