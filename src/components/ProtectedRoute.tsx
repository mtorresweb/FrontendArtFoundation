import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AppContext } from "../context/appContext";

type Props = {
  children?: React.ReactNode;
};

function ProtectedRoute(props: Props) {
  const navigate = useNavigate();
  const { user, setUserState } = useContext(AppContext);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userData.token) {
      navigate("/auth");
    }

    if (userData.token && !user.token) {
      setUserState(userData);
    }
  }, []);

  // eslint-disable-next-line no-prototype-builtins
  if (!user.token) return <></>;

  return <>{props.children ? props.children : <Outlet />}</>;
}

export default ProtectedRoute;
