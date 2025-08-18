import App from '@/App'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <App>
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </App>
  )
}