import App from '@/App'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <App>
      <DashboardPage />
    </App>
  )
}