import type { LoginFormValues } from '@/interfaces'
import React from 'react'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import * as z from "zod";
import { api2 } from '@/lib/api';
import Cookies from "js-cookie";

export const LoginForm: React.FC = () => {

  const userSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters long')
      .max(24, 'Password must be at most 24 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    rememberMe: z.boolean().default(false)
  })

  const defaultValues: LoginFormValues = {
    email: '',
    password: '',
    rememberMe: false
  }

  const { Field, handleSubmit } = useForm({
    defaultValues,
    validators: {
      onChange: ({ value }) => {
        const parsed = userSchema.safeParse(value);
        if (!parsed.success) {
          return parsed.error.message;
        }
        return {};
      }
    },
    onSubmit: async ({ value }) => {
      const parsed = userSchema.safeParse(value);
      if (!parsed.success) {
        toast.error('Please fix validation errors');
        return;
      }
      api2.post('/auth/login', value)
        .then((response) => {
          const token: string = response.data.data.accessToken;
          const expires = response.data.data.expiresIn;
          Cookies.set('accessToken', token, { expires });
          toast.success('Login successful');
        })
        .catch((error) => {
          toast.error(`Login failed: ${error.message}`);
        });
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Card className="w-full max-w-md px-4">
        <CardHeader >
          <CardTitle>Login Form</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Email */}
          <Field name="email">
            {({ state, handleChange, name }) => (
              <div className="grid gap-2">
                <Label htmlFor={name} className="text-left">Email</Label>
                <Input
                  type="email"
                  id={name}
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            )}
          </Field>

          {/* Password */}
          <Field name="password">
            {({ state, handleChange, name }) => (
              <div className="grid gap-2">
                <Label htmlFor={name} className="text-left">Password</Label>
                <Input
                  type="password"
                  id={name}
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
            )}
          </Field>

          {/* Remember Me */}
          <Field name="rememberMe">
            {({ state, handleChange, name }) => (
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Checkbox id={name} defaultChecked={false} />
                    <Label htmlFor={name} className="ml-2">Remember Me</Label>
                  </div>

                </div>
              </div>
            )}
          </Field>

        </CardContent >
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card >
    </form >
  )
}
