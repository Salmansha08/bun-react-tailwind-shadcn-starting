import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const DashboardPage = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.warning('You have been logged out');
    navigate({ to: '/login' });
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold">Dashboard Page</h1>
      <Button
        onClick={handleLogout}
        className="cursor-pointer mt-3"
      >
        Logout
      </Button>
    </div>
  )
}
