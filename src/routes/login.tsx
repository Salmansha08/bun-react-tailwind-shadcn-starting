import App from '@/App'
import { LoginPage } from '@/pages/auth/login/LoginPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <App>
      <LoginPage />
    </App>
  )
}