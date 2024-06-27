import { useQuery } from '@tanstack/react-query'

const baseUrl = process.env.NEXT_PUBLIC_REST_URL

console.log(baseUrl, 'ads')

const useGetAnimation = (id: string) => {
  return useQuery<{
    animation: {
      name: string
      _id: string
      gifUrl?: string
      json: string
    }
  }>({
    queryKey: ['animation', id],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/animation/${id}`)
      const data = await response.json()
      return data
    },
    enabled: !!id,
  })
}

export default useGetAnimation
