import { Gender, LearningPath } from '@/enums'
import type { RegisterFormValues } from '@/interfaces'
import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Birthdate } from './BirthDate'
import { Textarea } from '@/components/ui/textarea'

export const RegistrationForm: React.FC = () => {
  const [haveNotes, setHaveNotes] = useState<boolean>(false);

  const handleHaveNotes = () => {
    setHaveNotes(!haveNotes);
  }

  const handleFocus = (label: string) => {
    toast(`Input focused: ${label}`);
  }

  const defaultValues: RegisterFormValues = {
    fullName: '',
    email: '',
    password: '',
    age: 17,
    birthDate: new Date(),
    gender: Gender.Male,
    learningPath: LearningPath.FE
  }

  const { Field, handleSubmit } = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      toast(JSON.stringify(value));
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
          <CardTitle>Register Form</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Full Name */}
          <Field name="fullName">
            {({ state, handleChange, name }) => (
              <div className="grid gap-2">
                <Label htmlFor={name} className="text-left">Full Name</Label>
                <Input
                  type="text"
                  id={name}
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onFocus={() => handleFocus('Full Name')}
                  placeholder="Enter your full name"
                />
              </div>
            )}
          </Field>

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
                  onFocus={() => handleFocus('Email')}
                  placeholder="Enter your email"
                />
              </div>
            )}
          </Field>

          {/* Age */}
          <Field name="age">
            {({ state, handleChange, name }) => (
              <div className="grid gap-2">
                <Label htmlFor={name} className="text-left">Age</Label>
                <Input
                  type="number"
                  id={name}
                  value={state.value}
                  onChange={(e) => handleChange(Number(e.target.value))}
                  onFocus={() => handleFocus('Age')}
                  placeholder="Enter your age"
                />
              </div>
            )}
          </Field>

          {/* Birthdate */}
          <Field name="birthDate">
            {({ state, handleChange, name }) => (
              <div className="grid gap-2">
                <Birthdate {...{ state, handleChange, name }} />
              </div>
            )}
          </Field>

          {/* Gender */}
          <Field name="gender">
            {({ state, handleChange, name }) => (
              <div className="grid gap-2">
                <Label htmlFor={name} className="text-left">Gender</Label>
                <Select
                  defaultValue={state.value}
                  onValueChange={(value: Gender) => handleChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue id={name} placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Gender).map((gender: Gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </Field>

          {/* Learning Path */}
          <Field name="learningPath">
            {({ state, handleChange, name }) => (
              <div className="grid gap-2">
                <Label htmlFor={name} className="text-left">Learning Path</Label>
                <div className="flex items-center gap-2">
                  {
                    Object.values(LearningPath).map((path) => (
                      <div key={path} className="flex items-center">
                        <Checkbox id={name} defaultChecked={state.value.includes(path)} />
                        <Label htmlFor={name} className="ml-2">{path}</Label>
                      </div>
                    ))
                  }
                </div>
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
                  onFocus={() => handleFocus('Password')}
                />
              </div>
            )}
          </Field>

          {/* Have Notes? */}
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Checkbox id='haveNotes' onCheckedChange={() => handleHaveNotes()} />
                <Label htmlFor='haveNotes' className="ml-2">Have Notes?</Label>
              </div>
            </div>
          </div>

          {/* Notes (optional) */}
          {
            haveNotes && (
              <Field name="notes">
                {({ state, handleChange, name }) => (
                  <div className="grid gap-2">
                    <Label htmlFor={name} className="text-left">Notes (optional)</Label>
                    <Textarea
                      id={name}
                      placeholder="Type your notes here."
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onFocus={() => handleFocus('Notes')}
                    />
                  </div>
                )}
              </Field>
            )
          }
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
