import { useQuery } from '@tanstack/react-query'

const baseUrl = process.env.NEXT_PUBLIC_REST_URL

const useGetRecentEdit = () => {
  return useQuery<{
    animations: Array<{
      name: string
      _id: string
      gifUrl?: string
      json: string
    }>
  }>({
    queryKey: ['recent-edit'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/animations`)
      const data = await response.json()
      return data
    },
  })
}

export default useGetRecentEdit
