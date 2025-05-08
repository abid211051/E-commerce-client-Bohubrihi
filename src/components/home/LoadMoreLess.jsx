import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
const LoadMoreLess = ({ handlemoreAndLess }) => {
  const handlechange = (value) => {
    handlemoreAndLess(value);
  };
  return (
    <div className="flex gap-8 text-white mt-8 justify-end">
      <button
        type="button"
        className="flex items-center gap-1.5 p-2 bg-blue-700 active:scale-95"
        onClick={() => handlechange("prev")}
      >
        <ArrowLeft />
        <span className="fs-5">Prev</span>
      </button>
      <button
        type="button"
        className="flex items-center gap-1.5 p-2 bg-blue-700 active:scale-95"
        onClick={() => handlechange("next")}
      >
        <span className="fs-5">Next</span>
        <ArrowRight />
      </button>
    </div>
  );
};

export default LoadMoreLess;
