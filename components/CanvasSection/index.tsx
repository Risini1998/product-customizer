"use client";

import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import Select from "react-select";
import SelectMenuItem from "../SelectBaseItem";
import SelectAssetItem from "../SelectAssetItem";
import TextConfigurations from "../features/TextConfigurations";

export interface Asset {
  id: number;
  assetUrl: string;
  name: string;
}
export interface Product {
  _id: string;
  productImage: string;
  productType: string;
  size: string;
  assets: Array<Asset>;
}

export interface ICanvasSection {
  data: Array<Product>;
  [x: string]: any;
}

const CanvasSection = ({ data, ...restProps }: ICanvasSection) => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [baseProduct, setBaseProduct] = useState<Product>();
  const [center, setCenter] = useState<any>();
  const [zoom, setZoom] = useState<any>();

  // const center: any = canvas?.getCenter()

  useEffect(() => {
    const c = new fabric.Canvas("canvas", { width: 700, height: 500 });

    // settings for all canvas in the app
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#2BEBC8";
    fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
    fabric.Object.prototype.cornerSize = 6;
    setCanvas(c);
    setCenter(c.getCenter());
    setZoom(c.getZoom());

    return () => {
      c.dispose();
    };
  }, []);

  const addBaseProduct = (imageUrl: string) => {
    canvas?.clear();
    fabric.Image.fromURL(imageUrl, function (oImg: any) {
      // scale image down, and flip it, before adding it onto canvas
      oImg
        .set("flipX", true)
        .set({
          scaleX: 1.3,
          scaleY: 1.3,
        })
        .set("selectable", false);
      canvas?.add(oImg);
      canvas?.centerObject(oImg);
      canvas?.requestRenderAll();
    });
  };

  const addAsset = (imageUrl: string) => {
    fabric.Image.fromURL(imageUrl, function (oImg: any) {
      // scale image down, and flip it, before adding it onto canvas
      oImg
        .set("flipX", true)
        .set({
          scaleX: 0.15,
          scaleY: 0.15,
          centeredRotation: true,
        })
        .set("selectable", true);
      canvas?.add(oImg);
      canvas?.centerObject(oImg);
      canvas?.requestRenderAll();
    });
  };

  const options = (data || [])?.map((baseProduct: Product) => {
    return {
      value: baseProduct,
      label: baseProduct?.productType,
    };
  });

  return (
    <div className="flex flex-col gap-8 w-full h-[100vh] px-[100px] py-[50px]">
      <div className="text-blue-400 text-[30px] font-medium font-sans bg-gradient-to-r from-sky-600/10 from-10% to-white to-60% leading-[60px]">
        Customer Signage
      </div>
      <div className="grid grid-cols-[300px_700px_300px] gap-3 w-full h-full">
        <div className="flex flex-col gap-8 bg-slate-200 bg-opacity-90 px-4 py-4 rounded-md">
          <div className="text-[14px] font-medium font-sans flex gap-1 flex-col text-gray-700">
            <span>Select Base Product</span>
            <Select
              options={options}
              onChange={(value) => {
                addBaseProduct(value?.value?.productImage || "");
                setBaseProduct(value?.value || undefined);
              }}
              isClearable
              isSearchable
              classNamePrefix="select"
              components={{
                Option: SelectMenuItem,
              }}
              {...restProps}
            />
          </div>

          <div className="text-[14px] font-medium font-sans flex gap-1 flex-col text-gray-700">
            <span>Select assets</span>
            <Select
              isDisabled={baseProduct === undefined}
              options={baseProduct?.assets?.map((asset: Asset) => {
                return {
                  value: asset,
                  label: asset?.name,
                };
              })}
              onChange={(value) => {
                addAsset(value?.value?.assetUrl || "");
              }}
              isClearable
              isSearchable
              classNamePrefix="select"
              components={{
                Option: SelectAssetItem,
              }}
              {...restProps}
            />
          </div>
          <TextConfigurations canvas={canvas} />
        </div>
        <canvas id="canvas" className="h-full w-full shadow-lg" />
        <div className="bg-slate-300 bg-opacity-90 px-1 py-4 rounded-md"></div>
      </div>
    </div>
  );
};

export default CanvasSection;
