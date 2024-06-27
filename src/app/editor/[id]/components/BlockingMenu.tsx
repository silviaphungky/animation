import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components'
import { PATHS } from '@/constants/paths'

const BlockingMenu = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div>
      <div className="mb-2 text-sm">Please sign in to edit or send chat</div>
      <Button
        onClick={() => router.push(`${PATHS.LOGIN}?callback=${pathname}`)}
        full
        variant="primary"
      >
        Sign in
      </Button>
    </div>
  )
}

export default BlockingMenu
