'use client'
import { IconBatik } from '@/components/Icons'
import { LoginForm } from './components'
import { Suspense } from 'react'

const Login = () => {
  return (
    <Suspense>
      <div className="relative h-screen bg-gray-50">
        <div className="absolute left-0 top-[3rem]">
          <IconBatik />
        </div>
        <div className="absolute right-0 top-[3rem]">
          <IconBatik />
        </div>
        <LoginForm />
      </div>
    </Suspense>
  )
}

export default Login
