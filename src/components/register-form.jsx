import { cn } from "@/lib/utils";
import { Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "sonner";
import { ShowError, ShowLoading } from "../utils/messages";
import { register } from "../api/apiAuth";
import { isAuthenticated } from "../utils/auth";
// import { authenticate, isAuthenticated, userInfo } from "../utils/auth";
export default function RegisterForm({ className, ...props }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    loading: false,
    disabled: false,
    success: false,
  });

  const { name, email, password, success, error, loading, disabled } = values;

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

    register({ name, email, password })
      .then((response) => {
        toast.success("New Account Created. Please Login", {
          closeButton: true,
          richColors: true,
          position: "top-right",
        });
        setValues({
          name: "",
          email: "",
          password: "",
          disabled: false,
          loading: false,
        });
      })
      .catch((err) => {
        let errMsg = "Something went wrong!";
        if (err.response) {
          errMsg = err.response.data;
        } else {
          errMsg = "Something went wrong!";
        }
        toast.error(errMsg, {
          closeButton: true,
          richColors: true,
          position: "top-right",
        });
        setValues({
          ...values,
          disabled: false,
          loading: false,
        });
      });
  };

  const ShowSuccess = () => {
    if (success)
      return (
        <div className="alert alert-primary mx-auto text-center">
          New Account Created. Please <a href="/login">Login</a>.
        </div>
      );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {isAuthenticated() ? <Redirect to="/" /> : ""}
      {ShowSuccess()}
      <ShowLoading loading={loading} />
      <Card className={""}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Hi!</CardTitle>
          <CardDescription>
            Please register before going further
          </CardDescription>
        </CardHeader>
        <CardContent className={"sm:px-6 py-3 p-3"}>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-3">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    required
                    onChange={handleChange}
                    id="name"
                    placeholder="Full Name"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    required
                    onChange={handleChange}
                    id="email"
                    placeholder="m@example.com"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    required
                    onChange={handleChange}
                    id="password"
                  />
                </div>
                <Button type="submit" disabled={disabled} className="w-full">
                  Register
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Log In
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
