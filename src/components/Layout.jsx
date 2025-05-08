import { useEffect } from "react";
import Menu from "./Menu";
import { Toaster } from "sonner";

const Layout = ({ title = "Title", className, children }) => {
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <div>
      <div className="">
        <Menu />
      </div>
      <div className={className}>
        {children}
        <Toaster />
      </div>
    </div>
  );
};

export default Layout;
