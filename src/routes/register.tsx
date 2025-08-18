import App from '@/App'
import { RegisterPage } from '@/pages/auth/register/RegisterPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: Register,
})

function Register() {
  return (
    <App>
      <RegisterPage />
    </App>
  )
}