import { useParams, useNavigate } from "react-router-dom";
import DashboardAdmin from "./DashboardAdmin";
import DashboardEmployee from "./DashboardEmployee";
import DashboardClient from "./DashboardClient";
import DashboardGuest from "./DashboardGuest";

export default function Dashboard({ setIsLoggedIn }) {
  const { role } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  switch (role) {
    case "admin":    return <DashboardAdmin onLogout={handleLogout} />;
    case "employee": return <DashboardEmployee onLogout={handleLogout} />;
    case "client":   return <DashboardClient onLogout={handleLogout} />;
    case "guest":    return <DashboardGuest onLogout={handleLogout} />;
    default:         return <DashboardGuest onLogout={handleLogout} />;
  }
}