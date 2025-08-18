import App from '@/App';
import { NavBar } from '@/components/shared/Navbar';
import React from 'react'

export function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <App>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          {children}
        </main>
      </div>
    </App>
  )
}

export default AuthLayout;
