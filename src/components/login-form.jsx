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
import { toast } from "sonner";
import { API } from "../utils/config";
import { ShowError, ShowLoading } from "../utils/messages";
import { login } from "../api/apiAuth";
import { authenticate, isAuthenticated, userInfo } from "../utils/auth";
export default function LoginForm({ className, ...props }) {
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
  const redirectUser = () => {
    if (redirect)
      return window.location.replace(`${userInfo().role}/dashboard`);
    if (isAuthenticated()) return window.location.replace("/");
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {redirectUser()}
      <ShowLoading loading={loading} />
      <Card className={""}>
        <CardHeader className="text-center">
          <p className="text-sm">Admin: abid@gmail.com</p>
          <p className="text-sm">Admin: 12345</p>
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Facebook or Google account
          </CardDescription>
        </CardHeader>
        <CardContent className={"sm:px-6 py-3 p-3"}>
          <div className="flex flex-col gap-4">
            <Button variant="outline" className="w-full p-0 m-0">
              <a
                href={`${API}/auth/facebook`}
                className="w-full flex items-center justify-center gap-1.5"
              >
                <Facebook />
                <span>Login with Facebook</span>
              </a>
            </Button>
            <Button variant="outline" className="w-full">
              <a
                href={`${API}/auth/google`}
                className="w-full flex items-center justify-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                <span>Login with Google</span>
              </a>
            </Button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid mt-3 gap-3">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    value={email}
                    onChange={handleChange}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center flex-wrap">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    name="password"
                    onChange={handleChange}
                    value={password}
                  />
                </div>
                <Button type="submit" disabled={disabled} className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Wanna Credintial SignUp? Go to{" "}
                <a href="/register" className="underline underline-offset-4">
                  Register
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
