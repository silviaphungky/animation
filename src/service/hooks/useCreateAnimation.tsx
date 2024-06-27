import { useMutation } from '@tanstack/react-query'

const baseUrl = process.env.NEXT_PUBLIC_REST_URL

const useCreateAnimation = () => {
  return useMutation({
    mutationFn: async ({
      json,
      name,
      gifUrl,
    }: {
      json: Record<any, any>
      name: string
      gifUrl?: string
    }) => {
      const response = await fetch(`${baseUrl}/api/animation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          json: JSON.stringify(json),
          name,
          gifUrl,
        }),
      })
      const data = await response.json()
      return data
    },
  })
}

export default useCreateAnimation
