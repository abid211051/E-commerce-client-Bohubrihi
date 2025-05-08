import Layout from "../Layout";

import { GalleryVerticalEnd } from "lucide-react";

import LoginForm from "../login-form";

export default function Login() {
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

          <LoginForm />
        </div>
      </div>
    </Layout>
  );
}
