'use client'

import { ReactNode, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

interface ProvidersProps {
  children: ReactNode
}

export function Provider({ children }: ProvidersProps) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: { queries: { retry: 1 } },
    })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
