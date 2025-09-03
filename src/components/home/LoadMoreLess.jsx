import { ChevronLeft, ChevronRight } from "lucide-react";

const LoadMoreLess = ({ handlemoreAndLess }) => {
  const handlechange = (value) => {
    handlemoreAndLess(value);
  };
  return (
    <div className="flex gap-8 text-white mt-8 justify-end">
      <button
        type="button"
        className="flex items-center justify-center gap-1 p-2 bg-blue-700 active:scale-95 rounded-lg"
        onClick={() => handlechange("prev")}
      >
        <ChevronLeft className="size-5" />
        <span>Prev</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-1 p-2 bg-blue-700 active:scale-95 rounded-lg"
        onClick={() => handlechange("next")}
      >
        <span>Next</span>
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
};

export default LoadMoreLess;
