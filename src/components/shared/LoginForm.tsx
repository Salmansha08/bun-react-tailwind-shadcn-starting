import type { LoginFormValues } from '@/interfaces'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react"
import { ButtonTheme } from './ButtonTheme'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores'

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const defaultValues: LoginFormValues = {
    email: '',
    password: '',
    rememberMe: false
  }

  const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters long')
      .max(24, 'Password must be at most 24 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    rememberMe: z.boolean()
  })

  const onSubmit = async ({ value }: { value: LoginFormValues }) => {
    const parsed = loginSchema.safeParse(value);
    if (!parsed.success) {
      const errors = parsed.error;
      const errorMessages = Object.values(errors).flat().join(', ');
      toast.error(errorMessages || 'Validation failed');
      return;
    }

    try {
      const res = await login({ value });

      toast.success(res.message);
      navigate({ to: '/dashboard' });
    } catch (error) {
      toast.error(error || 'Login failed. Please try again.');
      console.error(error);
      return;
    }
  }

  const { Field, handleSubmit } = useForm({
    defaultValues,
    validators: {
      onSubmit: loginSchema
    },
    onSubmit,
  })

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <Card className="flex flex-col w-sm px-4 justify-center">
          <CardHeader >
            <CardTitle className='text-xl font-semibold'>Login Form</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Email */}
            <Field name="email">
              {({ state, handleChange, name }) => (
                <div className="grid gap-2">
                  <Label htmlFor={name} className="text-left">Email</Label>
                  <Input
                    className='text-sm'
                    type="email"
                    id={name}
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Enter your email"
                  />
                  {state.meta.errors && (
                    <p className="text-red-500 text-xs">
                      {Array.isArray(state.meta.errors)
                        ? state.meta.errors
                          .map((err) =>
                            typeof err === 'string' ? err : err?.message || 'Unknown error'
                          )
                          .join(', ')
                        : String(state.meta.errors)}
                    </p>
                  )}
                </div>
              )}
            </Field>

            {/* Password */}
            <Field name="password">
              {({ state, handleChange, name }) => (
                <div className="grid gap-2">
                  <Label htmlFor={name} className="text-left">Password</Label>
                  <div className='relative'>
                    <Input
                      className='text-sm'
                      type={showPassword ? "text" : "password"}
                      id={name}
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <Button
                      type="button"
                      variant='link'
                      onClick={handleShowPassword}
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:text-slate-500"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </Button>
                  </div>
                  {state.meta.errors && (
                    <p className="text-red-500 text-xs">
                      {Array.isArray(state.meta.errors)
                        ? state.meta.errors
                          .map((err) =>
                            typeof err === 'string' ? err : err?.message || 'Unknown error'
                          )
                          .join(', ')
                        : String(state.meta.errors)}
                    </p>
                  )}
                </div>
              )}
            </Field>

            {/* Remember Me */}
            <Field name="rememberMe">
              {({ state, handleChange, name }) => (
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Checkbox
                        id={name}
                        checked={Boolean(state.value)}
                        onCheckedChange={(checked) => handleChange(Boolean(checked))}
                        className='cursor-pointer'
                      />
                      <Label htmlFor={name} className="ml-2">Remember Me</Label>
                    </div>
                  </div>
                </div>
              )}
            </Field>

          </CardContent >
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full cursor-pointer">
              Submit
            </Button>
          </CardFooter>
        </Card >
      </form >
      <ButtonTheme />
    </>
  )
}
