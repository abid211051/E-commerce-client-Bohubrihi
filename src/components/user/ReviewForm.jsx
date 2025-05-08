import React, { useEffect, useState } from "react";
import { getReview, postReview } from "../../api/apiReview";
import { userInfo } from "../../utils/auth";
import Reviews from "./Reviews";
import { toast } from "sonner";

const ReviewForm = ({ id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReview(id)
      .then((response) => setReviews(response.data))
      .catch((err) =>
        toast.error(err.message, {
          closeButton: true,
          richColors: true,
          position: "top-right",
        })
      );
  }, []);
  const handleReview = (e) => {
    e.preventDefault();
    try {
      const review = {
        prodid: id,
        name: e.target.fname.value,
        ratings: e.target.rating.value,
        feedback: e.target.feed.value,
      };
      postReview(userInfo().token, review)
        .then((respose) => {
          toast.success("Review Delivered", {
            closeButton: true,
            richColors: true,
            position: "top-right",
          });
          setReviews([...reviews, respose.data]);
        })
        .catch((err) =>
          toast.error(err.message, {
            closeButton: true,
            richColors: true,
            position: "top-right",
          })
        );
    } catch (error) {
      toast.error(error.message, {
        closeButton: true,
        richColors: true,
        position: "top-right",
      });
    }
  };
  return (
    <div className="">
      <h5 className="text-xl font-medium mb-5">Send FeedBack:</h5>
      <form
        className="flex flex-col gap-3 sm:w-[600px]"
        onSubmit={handleReview}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-lg font-medium">Name:</label>
          <input
            type="text"
            required
            className="w-full rounded-md border-2 p-2"
            name="fname"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-lg font-medium">Ratings:</label>
          <div>
            <input type="radio" name="rating" value={1} defaultChecked />
            <label className="">1</label>
          </div>
          <div>
            <input type="radio" name="rating" value={2} />
            <label className="">2</label>
          </div>
          <div>
            <input type="radio" name="rating" value={3} />
            <label className="">3</label>
          </div>
          <div>
            <input type="radio" name="rating" value={4} />
            <label className="">4</label>
          </div>
          <div>
            <input type="radio" className="" name="rating" value={5} />
            <label className="">5</label>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-lg font-medium">FeedBack:</label>
          <textarea
            rows={5}
            className="w-full p-2 border-2 rounded-md"
            name="feed"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2 text-white bg-amber-600 rounded-md active:scale-95"
        >
          Post Your
        </button>
      </form>
      <div className="mt-3 row container">
        <h5 className="text-xl font-medium mt-5">All Reviews:</h5>
        <hr />
        {reviews &&
          reviews?.map((data) => <Reviews key={data._id} data={data} />)}
      </div>
    </div>
  );
};

export default ReviewForm;
