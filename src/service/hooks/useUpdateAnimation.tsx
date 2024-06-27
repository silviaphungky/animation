import { useMutation } from '@tanstack/react-query'

const baseUrl = process.env.NEXT_PUBLIC_REST_URL

const useUpdateAnimation = () => {
  return useMutation({
    mutationFn: async ({
      animation,
      id,
    }: {
      animation: Record<any, any>
      id: string
    }) => {
      const response = await fetch(`${baseUrl}/api/animation/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ json: JSON.stringify(animation) }),
      })
      const data = await response.json()
      return data
    },
  })
}

export default useUpdateAnimation
