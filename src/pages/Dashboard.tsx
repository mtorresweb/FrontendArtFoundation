import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import { TypographyH2, TypographyH4 } from "@/components/Typography";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname == "/") navigate("/search");
  }, []);

  return (
    <div id="dashboard">
      <div
        id="dashboard__header"
        className="flex justify-between items-center p-10 h-20 sticky top-0 bg-background/[.8] backdrop-blur-sm border-b border-secondary"
      >
        <TypographyH2 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Art Foundation
        </TypographyH2>
        <div className="flex gap-5">
          <ThemeToggle />
          <Sidebar />
        </div>
      </div>
      <div id="dashboard__content" className="">
        <Outlet />
      </div>
      <footer
        id="dashboard__footer"
        className="flex justify-end items-center py-4 pr-10 border-t border-secondary"
      >
        <TypographyH4>Art Foundation &copy; 2023</TypographyH4>
      </footer>
    </div>
  );
};

export default Dashboard;
