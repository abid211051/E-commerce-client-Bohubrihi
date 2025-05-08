import { useState, useEffect } from "react";
import Layout from "../Layout";
import {
  getCartItems,
  updateCartItems,
  deleteCartItem,
} from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    getCartItems(userInfo().token)
      .then((response) => setCartItems(response.data))
      .catch(() => {});
  };
  useEffect(() => {
    loadCart();
  }, []);

  const increaseItem = (item) => {
    if (item.count === 5) return;
    const cartItem = {
      ...item,
      count: item.count + 1,
    };
    updateCartItems(userInfo().token, cartItem)
      .then((response) => loadCart())
      .catch((err) => {});
  };

  // const getCartTotal = () => {
  //   const arr = cartItems.map((item) => item.price * item.count);
  //   const sum = arr.reduce((a, b) => a + b, 0);
  //   return sum;
  // };

  const decreaseItem = (item) => {
    if (item.count === 1) return;
    const cartItem = {
      ...item,
      count: item.count - 1,
    };
    updateCartItems(userInfo().token, cartItem)
      .then((response) => loadCart())
      .catch((err) => {});
  };

  const removeItem = (item) => {
    if (!window.confirm("Delete Item?")) return;
    deleteCartItem(userInfo().token, item)
      .then((response) => {
        loadCart();
      })
      .catch(() => {});
  };

  return (
    <Layout
      title="Your Cart"
      description="Hurry up! Place your order!"
      className="md:p-5 p-2"
    >
      <nav aria-label="breadcrumb">
        <ol className="flex gap-4">
          <li className="breadcrumb-item">
            <a href="#">Order</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {">"} Cart
          </li>
        </ol>
      </nav>

      <div className=" bg-blue-100 p-2 rounded-md">
        <div className="w-full md:grid grid-cols-6 hidden gap-4 p-1">
          <div className="p-1 font-semibold">#</div>
          <div className="p-1 font-semibold">Image</div>
          <div className="p-1 font-semibold">Product Name</div>
          <div className="p-1 font-semibold">Quantity</div>
          <div className="p-1 font-semibold">Price</div>
          <div className="p-1 font-semibold">Remove</div>
        </div>
        {cartItems.map((item, i) => (
          <div
            className="grid md:grid-cols-6 grid-cols-1 gap-4 mb-5 bg-amber-50 rounded-md md:px-2 px-2 py-2"
            key={i}
          >
            <div className="flex gap-2 items-center">
              <p className="md:hidden font-semibold">Serial: </p>
              <p>{i}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="md:hidden font-semibold">Image: </p>
              <img
                src={item.product.photo}
                alt={item.product.name}
                width={"40px"}
              />
            </div>
            <div className="flex gap-2 items-center">
              <p className="md:hidden font-semibold">Product Name: </p>
              <p>{item.product ? item.product.name : ""}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="md:hidden font-semibold">Inc/Dec: </p>
              <button
                className="px-2 bg-amber-200  cursor-pointer"
                onClick={() => decreaseItem(item)}
              >
                -
              </button>
              &nbsp;&nbsp;{item.count}&nbsp;&nbsp;
              <button
                className="px-2 bg-amber-200 cursor-pointer"
                onClick={() => increaseItem(item)}
              >
                +
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <p className="md:hidden font-semibold">Price: </p>
              <p>৳ {item.price * item.count}</p>
            </div>
            <div>
              <button
                className="bg-red-500 p-2 text-white rounded-md w-full cursor-pointer"
                onClick={() => removeItem(item)}
              >
                Remove From Cart
              </button>
            </div>
          </div>
        ))}
        <div>
          <div colSpan={5} className="flex justify-end gap-5 text-white">
            <a href="/allproduct">
              <button className="bg-green-600 p-2 rounded-md">
                Continue Shoping
              </button>
            </a>
            {cartItems?.length > 0 ? (
              <a href="/shipping" className="bg-amber-600 p-2 rounded-md">
                Checkout
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
