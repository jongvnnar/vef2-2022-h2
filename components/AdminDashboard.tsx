import { useAuth } from "../context/Auth";
import Button from "./Button";
import CategoriesManager from "./CategoriesManager";

export default function AdminDashboard() {
  const { user, logoutUser } = useAuth();

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logoutUser();
  }

  return (
    <div>
      <h1>Administration Dashboard</h1>
      <CategoriesManager />
      <Button type="button" size="large" onClick={logout} primary={false} >
        Log out
      </Button>
    </div>
  );
}
