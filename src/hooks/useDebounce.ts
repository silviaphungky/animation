import { useEffect, useState } from 'react'

function useDebounce({
  func,
  value,
  reachLimit,
  delay,
}: {
  func: () => void
  value: string
  reachLimit: boolean
  delay: number
}) {
  useEffect(() => {
    if (reachLimit) {
      func()
    } else {
      const handler = setTimeout(() => {
        func()
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }
  }, [delay, value, reachLimit])
}

export default useDebounce
