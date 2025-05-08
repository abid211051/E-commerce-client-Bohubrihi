import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../Layout";
import { ShowError, ShowLoading } from "../../utils/messages";
import { register } from "../../api/apiAuth";
import { isAuthenticated } from "../../utils/auth";
import RegisterForm from "../register-form";
import { GalleryVerticalEnd } from "lucide-react";

const Register = () => {
  //   const [values, setValues] = useState({
  //     name: "",
  //     email: "",
  //     password: "",
  //     error: false,
  //     loading: false,
  //     disabled: false,
  //     success: false,
  //   });

  //   const { name, email, password, success, error, loading, disabled } = values;

  //   const handleChange = (e) => {
  //     setValues({
  //       ...values,
  //       error: false,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setValues({ ...values, error: false, loading: true, disabled: true });

  //     register({ name, email, password })
  //       .then((response) => {
  //         setValues({
  //           name: "",
  //           email: "",
  //           password: "",
  //           success: true,
  //           disabled: false,
  //           loading: false,
  //         });
  //       })
  //       .catch((err) => {
  //         let errMsg = "Something went wrong!";
  //         if (err.response) {
  //           errMsg = err.response.data;
  //         } else {
  //           errMsg = "Something went wrong!";
  //         }
  //         setValues({
  //           ...values,
  //           error: errMsg,
  //           disabled: false,
  //           loading: false,
  //         });
  //       });
  //   };

  //   const signUpForm = () => (
  //     <form onSubmit={handleSubmit}>
  //       <div className="form-group">
  //         <label className="text-muted">Name:</label>
  //         <input
  //           type="text"
  //           name="name"
  //           className="form-control"
  //           value={name}
  //           required
  //           onChange={handleChange}
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label className="text-muted">Email:</label>
  //         <input
  //           type="email"
  //           name="email"
  //           className="form-control"
  //           value={email}
  //           required
  //           onChange={handleChange}
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label className="text-muted">Password:</label>
  //         <input
  //           type="password"
  //           name="password"
  //           className="form-control"
  //           value={password}
  //           required
  //           onChange={handleChange}
  //         />
  //       </div>
  //       <button type="submit" className="btn btn-primary" disabled={disabled}>
  //         Create Account
  //       </button>
  //     </form>
  //   );

  //   const ShowSuccess = () => {
  //     if (success)
  //       return (
  //         <div className="alert alert-primary">
  //           New Account Created. Please <a href="/login">Login</a>.
  //         </div>
  //       );
  //   };

  return (
    <Layout>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-r from-zinc-900 to-slate-700 p-2 md:p-10 text-white">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Dom Store
          </a>
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
