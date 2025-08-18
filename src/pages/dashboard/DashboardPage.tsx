import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores";

export const DashboardPage = () => {
  const { logout } = useAuthStore();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold">Dashboard Page</h1>
      <Button
        onClick={logout}
      >
        Logout
      </Button>

    </div>
  )
}
