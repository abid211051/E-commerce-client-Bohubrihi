import Layout from "../Layout";
import { userInfo } from "../../utils/auth";
import PurchaseHistory from "./PurchaseHistory";
import { ChartBarStacked, CircleUser, Upload } from "lucide-react";

const Dashboard = () => {
  const { name, email, role, token } = userInfo();
  const UserLinks = () => {
    return (
      <div className="grid lg:grid-cols-5 lg:px-2 py-5 px-2 gap-4 bg-gradient-to-r from-zinc-900 to-slate-700 min-h-screen">
        <div className="flex lg:flex-col flex-col-reverse justify-between bg-[#7258db] lg:col-start-1 lg:col-span-1 rounded-md p-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">User Tools</h4>
            <ul className="flex lg:flex-col gap-4 flex-wrap ">
              <li className="">
                <a
                  className="flex gap-1 items-center text-white"
                  href="/create/category"
                >
                  <Upload size={20} />
                  <span>Update Profile</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
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
          <h1 className="text-xl mb-5 font-semibold text-white">Orders List</h1>
          <div className="">
            <PurchaseHistory token={token} />
          </div>
        </div>
      </div>
    );
  };

  const UserInfo = () => (
    <div className="">
      <h3 className="">User Information</h3>
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
    </Layout>
  );
};

export default Dashboard;
