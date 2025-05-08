import { Link, withRouter } from "react-router-dom";
import { singout, isAuthenticated, userInfo } from "../utils/auth";
import {
  CupSoda,
  LayoutDashboard,
  LogIn,
  LogOut,
  ShoppingCart,
  Warehouse,
} from "lucide-react";
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "white" };
  }
};

const Menu = ({ history }) => {
  return (
    <nav className="bg-gradient-to-r from-zinc-900 to-slate-700 w-full py-3 px-2">
      <ul className="flex gap-3 justify-between">
        <li className="">
          <a
            className="flex items-center gap-1 text-lg font-semibold"
            style={isActive(history, "/")}
            href={"/"}
          >
            <Warehouse size={18} />
            <span className="sm:block hidden">Dom Store</span>
          </a>
        </li>
        <li className="">
          <a
            className="flex gap-1 items-center"
            style={isActive(history, "/allproduct")}
            href={"/allproduct"}
          >
            <CupSoda size={18} />
            <span className="sm:block hidden">All Products</span>
          </a>
        </li>
        {!isAuthenticated() && (
          <div className="flex gap-3">
            <li className="">
              <a
                className="flex gap-1 items-center"
                style={isActive(history, "/login")}
                href={"/login"}
              >
                <LogIn size={18} />
                <span className="sm:block hidden">Login</span>
              </a>
            </li>
          </div>
        )}

        {isAuthenticated() && (
          <>
            <li className="">
              <a
                className="flex gap-1 items-center"
                style={isActive(history, `/${userInfo().role}/dashboard`)}
                href={`/${userInfo().role}/dashboard`}
              >
                <LayoutDashboard size={18} />
                <span className="sm:block hidden">Dashboard</span>
              </a>
            </li>
            <li className="">
              <a
                className="flex gap-1 items-center"
                style={isActive(history, `/cart`)}
                href={`/cart`}
              >
                <ShoppingCart size={18} />
                <span className="sm:block hidden">Cart</span>
              </a>
            </li>
            <li className="">
              <span
                className="flex gap-1 items-center"
                style={{ cursor: "pointer", color: "white" }}
                onClick={() => {
                  singout(() => {
                    window.location.replace("/login");
                  });
                }}
              >
                <LogOut size={18} />
                <span className="sm:block hidden">Log Out</span>
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default withRouter(Menu);
