import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link, withRouter } from "react-router-dom";
import { getProfile, updateProfile } from "../../api/apiOrder";
import {} from "../../utils/messages";
import { userInfo } from "../../utils/auth";

const ShippingAddress = ({ history }) => {
  const [values, setValues] = useState({
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    state: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { phone, address1, address2, city, postcode, state } = values;

  useEffect(() => {
    getProfile(userInfo().token)
      .then((response) => setValues(response.data))
      .catch((err) => {
        // console.log(err)
      });
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    updateProfile(userInfo().token, values)
      .then((response) => {
        if (response.status === 200) {
          setRedirect(true);
        }
      })
      .catch((err) => setDisabled(false));
  };

  return (
    <>
      <Layout
        title="Checkout"
        description="Complete your order!"
        className="p-2"
      >
        {redirect ? window.location.replace("/checkout") : ""}

        <ol className="flex gap-5 flex-wrap">
          <li className="">
            <a href="#">Order</a>
          </li>
          <li className="">
            <a href="#">{">"}Cart</a>
          </li>
          <li className="" aria-current="page">
            {">"}Shipping Address
          </li>
        </ol>

        <div className="">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-5" style={{ height: "auto" }}>
                <div className="text-2xl font-semibold my-4 text-center">
                  Shipping Address
                </div>
                <div className="sm:w-[600px] mx-auto">
                  <form onSubmit={handleSubmit} className="flex flex-col">
                    <label className="block font-bold">Phone:</label>
                    <input
                      name="phone"
                      value={phone}
                      required
                      className="mb-4 p-2 border-2 rounded-md-2 rounded-md"
                      onChange={handleChange}
                    />
                    <label className="block font-bold">Address 1:</label>
                    <input
                      name="address1"
                      value={address1}
                      required
                      className="mb-4 p-2 border-2 rounded-md"
                      onChange={handleChange}
                    />
                    <label className="block font-bold">Address 2:</label>
                    <input
                      name="address2"
                      value={address2}
                      className="mb-4 p-2 border-2 rounded-md"
                      onChange={handleChange}
                    />

                    <label className="block font-bold">City:</label>
                    <input
                      name="city"
                      value={city}
                      required
                      className="mb-4 p-2 border-2 rounded-md"
                      onChange={handleChange}
                    />

                    <label className="block font-bold">Post Code: </label>
                    <input
                      name="postcode"
                      value={postcode}
                      type="number"
                      required
                      className="mb-4 p-2 border-2 rounded-md"
                      onChange={handleChange}
                    />

                    <label className="block font-bold">state:</label>
                    <input
                      name="state"
                      value={state}
                      required
                      className="p-2 border-2 rounded-md"
                      onChange={handleChange}
                    />
                    <br />
                    <button
                      type="submit"
                      className="p-2 text-white bg-black rounded-md"
                      disabled={disabled}
                    >
                      Save and Checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default withRouter(ShippingAddress);
