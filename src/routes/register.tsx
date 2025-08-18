import App from '@/App'
import { RegistrationForm } from '@/components/shared'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: Register,
})

function Register() {
  return (
    <App>
      <RegistrationForm />
    </App>
  )
}