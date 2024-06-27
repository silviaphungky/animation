import QUERY from '@/services/graphql/query/featuredPublicAnimations.gql'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'

interface Response {
  featuredPublicAnimations: {
    edges: Array<{
      node: {
        gifUrl: string
        id: number
        jsonUrl: string
        name: string
      }
    }>
  }
}

const useGetFeaturedPublicAnimations = () => {
  return useQuery<Response>({
    queryKey: ['lottie-animations'],
    queryFn: async () =>
      await request('https://graphql.lottiefiles.com/2022-08', QUERY, {
        first: 10,
      }),
    staleTime: 86400,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}

export default useGetFeaturedPublicAnimations
