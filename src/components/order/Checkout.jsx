import React, { useState, useEffect } from "react";
import {
  applyCoupon,
  getCartItems,
  getProfile,
  offlinepayment,
  onlinepayment,
} from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import Layout from "../Layout";
import { ShowError, ShowSuccess } from "../../utils/messages";
const Checkout = () => {
  // zddlsj2wamv
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [coupon, setCoupon] = useState({
    code: "",
    discount: 0,
  });
  const [orderItems, setOrderItems] = useState([]);
  const [values, setValues] = useState({
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    state: "",
  });

  const { phone, address1, address2, city, postcode, state } = values;

  const loadCart = () => {
    getCartItems(userInfo().token)
      .then((response) => setOrderItems(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile(userInfo().token)
      .then((response) => setValues(response.data))
      .catch((err) => {});
    loadCart();
  }, []);

  const makePayment = (type) => {
    if (type === "online") {
      onlinepayment(userInfo().token, { coupon: coupon.code })
        .then((response) => {
          window.location.replace(`${response.data.url}`);
          // console.log(response.data)
        })
        .catch((err) => console.log(err.message));
    } else if (type === "offline") {
      offlinepayment(userInfo().token, { coupon: coupon.code })
        .then((response) => {
          window.location.replace(`${response.data.url}`);
        })
        .catch((err) => console.log(err.message));
    }
  };
  const handleCoupon = (e) => {
    e.preventDefault();
    const coupon = e.target.coupon.value;
    if (coupon !== "") {
      applyCoupon(userInfo().token, { coupon: coupon })
        .then((response) => {
          // console.log(response.data)
          setCoupon({
            code: response.data.code,
            discount: parseInt(response.data.discount),
          });
        })
        .catch((err) => setErr(err.message));
    }
  };
  const getOrderTotal = () => {
    const arr = orderItems.map((cartItem) => cartItem.price * cartItem.count);
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum;
  };
  const shippinDetails = () => (
    <>
      To,
      <br /> <b>{userInfo().name}</b>
      <br /> Phone: {phone}
      <br /> {address1}
      {address2 ? (
        <>
          <br />
          {address2}
        </>
      ) : (
        ""
      )}
      <br /> {city}-{postcode}, {state}
    </>
  );

  if (address1 && city && phone && postcode && state)
    return (
      <>
        <Layout
          title="Checkout"
          description="Complete your order!"
          className="p-2"
        >
          <ShowError error={err} />
          <ShowSuccess />

          <ol className="flex flex-wrap gap-4">
            <li className="">
              <a href="#">Order</a>
            </li>
            <li className="">
              <a href="#">{">"}Cart</a>
            </li>
            <li className="">
              <a href="#">{">"}Shipping Address</a>
            </li>
            <li className="" aria-current="page">
              {">"}Checkout
            </li>
          </ol>
          <div className="flex items-center justify-center">
            <div className="">
              <div className="">
                <div className="">
                  <div className="text-2xl font-semibold text-center my-5">
                    Shipping Details
                  </div>
                  <div className=""></div>
                </div>
              </div>
              <div className="bg-blue-100 p-2 rounded-md md:w-[700px] w-full">
                {shippinDetails()}
                <div className="mt-4" style={{ height: "auto" }}>
                  <div className="">
                    <ul className="">
                      {orderItems.map((item) => (
                        <li key={item._id} className="" align="right">
                          {item.product ? item.product.name : ""} x {item.count}{" "}
                          = ৳ {item.price * item.count}{" "}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-end justify-end">
                    <span className="">
                      <b>Order Total: </b>
                    </span>
                    <span className="">
                      <b>
                        {" "}
                        ৳{" "}
                        {parseFloat(
                          getOrderTotal() -
                            (coupon.discount !== 0
                              ? getOrderTotal() * (coupon.discount / 100)
                              : 0)
                        ).toFixed(2)}
                      </b>
                    </span>
                  </div>
                  <div className="mt-4">
                    <form
                      action=""
                      className="flex flex-wrap gap-2 justify-end"
                      onSubmit={handleCoupon}
                    >
                      <input
                        type="text"
                        className="border-2 border-black p-1 sm:w-[300px]"
                        name="coupon"
                        placeholder="Get Discount "
                      />
                      <button
                        type="submit"
                        className="bg-green-600 text-white p-1 active:scale-95"
                      >
                        Coupon
                      </button>
                    </form>
                  </div>
                </div>
                <br />
                <div className="flex justify-end gap-2 flex-wrap">
                  <button
                    className="bg-lime-500 p-2 rounded-md text-white active:scale-95"
                    onClick={() => makePayment("offline")}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    className="bg-orange-500 p-2 rounded-md text-white active:scale-95"
                    onClick={() => makePayment("online")}
                  >
                    Online Payment
                  </button>
                </div>
              </div>
              <p className="">
                *Delivery Charge will be added in Cash on Delivery
              </p>
            </div>
          </div>
        </Layout>
      </>
    );
  else return <></>;
};

export default Checkout;
