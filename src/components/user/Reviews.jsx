import React from "react";

const Reviews = ({ data }) => {
  let star = [];
  for (let i = 0, j = 0; i < 5; i++, j++) {
    if (j < parseInt(data.ratings)) {
      star.push(
        <span className="text-warning text-xl" key={i}>
          &#9733;
        </span>
      );
    } else {
      star.push(
        <span className="text-xl" key={i}>
          &#9734;
        </span>
      );
    }
  }
  return (
    <>
      <div className="p-2" role="alert">
        <h5 className="font-medium">Name: {data.name}</h5>
        <p className="text-gray-700">{data.feedback}</p>
        <p className="text-yellow-500">{star}</p>
        <hr className="" />
      </div>
    </>
  );
};

export default Reviews;
