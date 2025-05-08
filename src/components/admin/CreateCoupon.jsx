import React, { useState } from "react";
import Layout from "../Layout";
import { ShowError, ShowLoading, ShowSuccess } from "../../utils/messages";
import { createCoupon } from "../../api/apiAdmin";
import { userInfo } from "../../utils/auth";
import { toast } from "sonner";

const CreateCoupon = () => {
  const [values, setValues] = useState({
    msg: null,
  });
  const [code, setCode] = useState(
    (
      Math.random().toString(36).substring(3, 6) +
      new Date().getTime().toString(36)
    )
      .split("sif")
      .join("")
  );
  const generatecode = () => {
    const cc = (
      Math.random().toString(36).substring(3, 6) +
      new Date().getTime().toString(36)
    )
      .split("sif")
      .join("");
    setCode(cc);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
    });
    const data = {
      events: e.target.event.value,
      discount: parseInt(e.target.discount.value),
      expirein: e.target.expirein.value,
      code,
    };
    const { token } = userInfo();
    createCoupon(token, data)
      .then((respose) => {
        toast.success("Coupon Created", {
          richColors: true,
          closeButton: true,
          position: "top-right",
        });
        setValues({
          msg: respose.data,
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          richColors: true,
          closeButton: true,
          position: "top-right",
        });
        setValues({
          ...values,

          error: "Something went wrong",
        });
      });
  };
  return (
    <Layout title="Add a new category">
      <div className="p-2">
        <div className="flex items-center justify-center">
          <div className="sm:w-[550px] w-full">
            <button
              onClick={generatecode}
              className="bg-amber-600 text-white p-2 rounded-md w-full mx-auto"
            >
              Regenerate Code
            </button>
            <form onSubmit={handleSubmit} className="w-full mx-auto">
              <div className="mb-3">
                <label className="font-semibold">Code:</label>
                <input
                  type="text"
                  className="border-2 p-1.5 rounded-md w-full"
                  required
                  value={code}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="font-semibold">Event:</label>
                <input
                  type="text"
                  name="event"
                  className="border-2 p-1.5 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="font-semibold">Discount:</label>
                <input
                  type="number"
                  name="discount"
                  className="border-2 p-1.5 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="font-semibold">Expiration Date:</label>
                <input
                  name="expirein"
                  className="border-2 p-1.5 rounded-md w-full"
                  type="date"
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-black text-white active:scale-95 w-full rounded-md"
              >
                Create Coupon
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCoupon;
