import Layout from "../Layout";
import { Link } from "react-router-dom";
import { userInfo } from "../../utils/auth";
import SeeCoupon from "./SeeCoupon";
import {
  StretchHorizontal,
  Dock,
  ShoppingBag,
  ShoppingCart,
  RefreshCw,
  Truck,
  Check,
  ChartBarStacked,
  ShoppingBasket,
  Puzzle,
  CircleUser,
} from "lucide-react";

const AdminDashboard = () => {
  const { name, email, role } = userInfo();
  const UserLinks = () => {
    return (
      <div className="grid lg:grid-cols-5 lg:px-2 py-5 px-2 gap-4 bg-gradient-to-r from-zinc-900 to-slate-700 min-h-screen">
        <div className="flex lg:flex-col flex-col-reverse justify-between bg-[#7258db] lg:col-start-1 lg:col-span-1 rounded-md p-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Admin Tools</h4>
            <ul className="flex lg:flex-col gap-4 flex-wrap ">
              <li className="">
                <a
                  className="flex gap-1 items-center text-white"
                  href="/create/category"
                >
                  <ChartBarStacked />
                  <span>Create Category</span>
                </a>
              </li>
              <li className="">
                <a
                  className="flex gap-1 items-center text-white"
                  href="/create/product"
                >
                  <ShoppingBasket />
                  <span>Create Product</span>
                </a>
              </li>
              <li className="">
                <a
                  className="flex gap-1 items-center text-white"
                  href="/create/coupon"
                >
                  <Puzzle />
                  <span>Create Coupon</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Admin Info.</h3>
            <ul className="flex items-center gap-2 text-white">
              <CircleUser size={30} className="" />
              <div>
                <li className="text-sm">{name}</li>
                <li className="text-sm">{email}</li>
              </div>
            </ul>
          </div>
        </div>
        <div className="lg:col-start-2 lg:col-span-4">
          <h1 className="text-xl mb-5 font-semibold text-white">Overview</h1>
          <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
            <div className="bg-[#3b82f6] flex flex-col items-center gap-1.5  rounded-md sm:p-8 p-3 text-white">
              <StretchHorizontal size={30} />
              <p>Today Orders</p>
              <p className="text-2xl font-semibold">2600.0$</p>
              <div className="flex gap-2 text-xs">
                <p>Cash: {1000}$</p>
                <p>Online: {1600}$</p>
              </div>
            </div>
            <div className="bg-[#0d9488] flex flex-col items-center gap-1.5  rounded-md sm:p-8 p-3 text-white">
              <StretchHorizontal size={30} />
              <p>YesterDay Orders</p>
              <p className="text-2xl font-semibold">2600.0$</p>
              <div className="flex gap-2 text-xs">
                <p>Cash: {1000}$</p>
                <p>Online: {1600}$</p>
              </div>
            </div>
            <div className="bg-[#fb923c] flex flex-col items-center gap-1.5  rounded-md sm:p-8 p-3 text-white">
              <ShoppingBag size={30} />
              <p>This Month</p>
              <p className="text-2xl font-semibold">2600.0$</p>
            </div>
            <div className="bg-[#0891b2] flex flex-col items-center gap-1.5  rounded-md sm:p-8 p-3 text-white">
              <Dock />
              <p>Last Month</p>
              <p className="text-2xl font-semibold">2600.0$</p>
            </div>
            <div className="bg-[#059669] flex flex-col items-center gap-1.5  rounded-md sm:p-8 p-3 text-white">
              <Dock />
              <p>All Time Sale</p>
              <p className="text-2xl font-semibold">2600.0$</p>
            </div>
          </div>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-10">
            <div className="flex bg-[#fffbeb] p-2 gap-4 border-2 rounded-md items-center text-gray-700">
              <ShoppingCart
                className="bg-[#ffedd5] text-[#975600] rounded-full p-2"
                size={40}
              />
              <div>
                <p className="font-semibold">Total Order</p>
                <p className="text-2xl font-bold">9008</p>
              </div>
            </div>
            <div className="flex bg-[#eef5fe] p-2 gap-4 border-2 rounded-md items-center text-gray-700">
              <RefreshCw
                className="bg-[#dbeafe] text-[#318aff] rounded-full p-2"
                size={40}
              />
              <div>
                <p className="font-semibold">Orders Pending</p>
                <p className="text-2xl font-bold">233</p>
              </div>
            </div>
            <div className="flex bg-[#f9f9df] p-2 gap-4 border-2 rounded-md items-center text-gray-700">
              <Truck
                className="bg-[#fbfbb9] text-[#949400] rounded-full p-2"
                size={40}
              />
              <div>
                <p className="font-semibold">Orders Processing</p>
                <p className="text-2xl font-bold">131</p>
              </div>
            </div>
            <div className="flex bg-[#e7fcf1] p-2 gap-4 border-2 rounded-md items-center text-gray-700">
              <Check
                className="bg-[#c8fee1] text-[#01bb5b] rounded-full p-2"
                size={40}
              />
              <div>
                <p className="font-semibold">Orders Delivered</p>
                <p className="text-2xl font-bold">3000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const UserInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="">
        <li className="">{name}</li>
        <li className="">{email}</li>
        <li className="">{role}</li>
      </ul>
    </div>
  );

  return (
    <Layout title="Dashboard" className="container-fluid">
      <UserLinks />
      {/* <div className="row">
        <div className="col-sm-3">
        </div>
        <div className="col-sm-9">
          <UserInfo />
        </div>
      </div>
      <div>
        <SeeCoupon />
      </div> */}
    </Layout>
  );
};

export default AdminDashboard;
