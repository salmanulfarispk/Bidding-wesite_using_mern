
import React from "react";

export const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-950/80 flex items-center justify-center z-50">
      <div className="custom-loader"></div>
    </div>
  );
};
