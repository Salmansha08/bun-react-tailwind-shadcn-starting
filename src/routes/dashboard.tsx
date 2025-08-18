import App from '@/App'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { useAuthStore } from '@/stores'
import type { CookieType } from '@/types'
import { createFileRoute, redirect } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: authCheck,
  component: Dashboard,
})

function Dashboard() {
  return (
    <App>
      <DashboardPage />
    </App>
  )
}

async function authCheck({ location }) {
  const cookieName: CookieType = 'accessToken';
  const token = Cookies.get(cookieName);

  if (!token) {
    throw redirect({
      to: '/login',
      search: {
        redirect: location.pathname
      }
    })
  }

  const { isAuthenticated, checkAuth } = useAuthStore.getState();
  if (!isAuthenticated) {
    try {
      await checkAuth();
    } catch (error) {
      toast.error('checkAuth failed:', error);
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname
        }
      });
    }
  }
}