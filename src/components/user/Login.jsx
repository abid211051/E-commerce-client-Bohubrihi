import { useState } from "react";
import { Redirect } from "react-router-dom";
import { API } from "../../utils/config";
import Layout from "../Layout";
import { ShowError, ShowLoading } from "../../utils/messages";
import { login } from "../../api/apiAuth";
import { authenticate, isAuthenticated, userInfo } from "../../utils/auth";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    disabled: false,
    redirect: false,
  });

  const { email, password, loading, error, redirect, disabled } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true, disabled: true });

    login({ email, password })
      .then((response) => {
        authenticate(response.data.token, () => {
          setValues({
            email: "",
            password: "",
            success: true,
            disabled: false,
            loading: false,
            redirect: true,
          });
        });
      })
      .catch((err) => {
        let errMsg = "Something went wrong!";
        if (err.response) {
          errMsg = err.response.data;
        } else {
          errMsg = "Something went wrong!";
        }
        setValues({
          ...values,
          error: errMsg,
          disabled: false,
          loading: false,
        });
      });
  };

  const signInForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Email:</label>
        <input
          name="email"
          type="email"
          className="form-control"
          value={email}
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password:</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          className="form-control"
          value={password}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-outline-primary"
        disabled={disabled}
      >
        Login
      </button>
    </form>
  );

  const redirectUser = () => {
    if (redirect)
      return window.location.replace(`${userInfo().role}/dashboard`);
    if (isAuthenticated()) return window.location.replace("/");
  };
  return (
    <Layout title="Login" className="container col-md-8 offset-md-2">
      {redirectUser()}
      <ShowLoading loading={loading} />
      <ShowError error={error} />
      <h3>Login Here,</h3>
      <hr />
      {signInForm()}
      <hr />
      <p>Or,</p>
      <a href={`${API}/auth/google`} className="socialbtn">
        <img src="assets/icons8-google-480.png" alt="" className="h-100" />
        <p>Sign In With Google</p>
      </a>
      <a href={`${API}/auth/facebook`} className="socialbtn">
        <img src="assets/icons8-facebook-240.png" alt="" className="h-100" />
        <p>Sign In With FaceBook</p>
      </a>
    </Layout>
  );
};

export default Login;
