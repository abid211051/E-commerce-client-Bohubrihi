import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import PrivateRoute from "./protecteRoutes/PrivateRoute";
import AdminRoute from "./protecteRoutes/AdminRoute";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import AllProduct from "./home/product";
import ProductDetails from "./home/ProductDetails";
import Dashboard from "./user/Dashboard";
import AdminDashboard from "./admin/AdminDashboard";
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import Cart from "./order/Cart";
import ShippingAddress from "./order/ShippingAddress";
import Checkout from "./order/Checkout";
import CreateCoupon from "./admin/CreateCoupon";

const Main = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register" exact component={Register} />
        <Route path="/product/:id" exact component={ProductDetails} />
        <Route path="/allproduct" exact component={AllProduct} />
        <PrivateRoute exact path="/user/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/cart">
          <Cart />
        </PrivateRoute>
        <PrivateRoute exact path="/shipping">
          <ShippingAddress />
        </PrivateRoute>
        <PrivateRoute exact path="/checkout">
          <Checkout />
        </PrivateRoute>
        <AdminRoute exact path="/admin/dashboard">
          <AdminDashboard />
        </AdminRoute>
        <AdminRoute exact path="/create/category">
          <CreateCategory />
        </AdminRoute>
        <AdminRoute exact path="/create/product">
          <CreateProduct />
        </AdminRoute>
        <AdminRoute exact path="/create/coupon">
          <CreateCoupon />
        </AdminRoute>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default withRouter(Main);
