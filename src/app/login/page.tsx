'use client'
import { Button, FormGroup, Input } from '@/components'
import { IconBatik } from '@/components/Icons'
import { usernameKey } from '@/constants/key'
import { PATHS } from '@/constants/paths'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

const Login = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
    },
  })
  const params = useSearchParams()
  const callback = params.get('callback')

  const handleLogin = (value: { username: string }) => {
    router.push(callback ? callback : PATHS.HOME)
    localStorage.setItem(usernameKey, value.username)
  }

  return (
    <div className="relative h-screen bg-gray-50">
      <div className="absolute left-0 top-[3rem]">
        <IconBatik />
      </div>
      <div className="absolute right-0 top-[3rem]">
        <IconBatik />
      </div>

      <form
        className="absolute left-0 right-0 m-auto h-screen w-[450px] p-4 flex items-center justify-center z-10"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div>
          <div className="text-3xl font-bold text-center mb-8">
            Sign in to your account
          </div>
          <div className="mb-2 z-20">
            <Controller
              name={'username'}
              control={control}
              rules={{ required: 'Required' }}
              render={({ field, fieldState: { error } }) => {
                const errorMsg = error?.message
                return (
                  <FormGroup label="Username" error={errorMsg || ''}>
                    <Input placeholder="Username" type="text" {...field} />
                  </FormGroup>
                )
              }}
            />
          </div>
          <div className="w-full mt-4">
            <Button type="submit" full variant="primary">
              Sign in
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
