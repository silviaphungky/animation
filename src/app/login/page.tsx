'use client'
import { IconBatik } from '@/components/Icons'
import { LoginForm } from './components'

const Login = () => {
  return (
    <div className="relative h-screen bg-gray-50">
      <div className="absolute left-0 top-[3rem]">
        <IconBatik />
      </div>
      <div className="absolute right-0 top-[3rem]">
        <IconBatik />
      </div>
      <LoginForm />
    </div>
  )
}

export default Login
