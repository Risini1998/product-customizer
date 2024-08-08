import CanvasSection from "@/components/CanvasSection";
import React from "react";

const App = async () => {
  const headers = new Headers();
  headers.append(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0"
  );
  const response = await fetch("http://localhost:3000/api/baseproducts", {
    method: "GET",
    cache: "no-cache",
  });

  const resp = await response.json();

  return (
    <div className="w-full h-full">
      <CanvasSection data={resp} />
    </div>
  );
};

export default App;
