import App from '@/App'
import { LoginForm } from '@/components/shared'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <App>
      <LoginForm />
    </App>
  )
}