import { Suspense } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { Button, FormGroup, Input } from '@/components'

import { usernameKey } from '@/constants/key'
import { PATHS } from '@/constants/paths'
import { useSearchParams } from 'next/navigation'

const LoginForm = () => {
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
  )
}

export default LoginForm
