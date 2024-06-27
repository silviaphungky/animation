import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'

import { IconLogout, IconPerson } from '@/components/Icons'

import { PATHS } from '@/constants/paths'
import { usernameKey } from '@/constants/key'

export const menu = ['Color', 'Setting', 'Chat']

const RightBar = ({
  children,
  selectedTab,
  setSelectedTab,
}: {
  children: ReactElement
  selectedTab: 'Color' | 'Setting' | 'Chat'
  setSelectedTab: Dispatch<SetStateAction<'Color' | 'Setting' | 'Chat'>>
}) => {
  const router = useRouter()

  const [username, setUsername] = useState('')

  useEffect(() => {
    const name = localStorage.getItem(usernameKey)
    if (name) {
      setUsername(name)
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    router.push(PATHS.LOGIN)
  }

  return (
    <div className="h-[100vh] bg-white p-6 shadow-md  w-[18rem] relative">
      <div>
        <div className="flex justify-between mb-3">
          {menu.map((item) => (
            <div
              key={item}
              className={`cursor-pointer text-sm font-semibold border-b-2 border-primary border-t-none px-3 pb-2 ${
                selectedTab !== item ? 'opacity-50 font-normal border-none' : ''
              }`}
              onClick={() =>
                setSelectedTab(item as 'Color' | 'Setting' | 'Chat')
              }
            >
              {item}
            </div>
          ))}
        </div>
        {children}
      </div>

      <div className="w-full text-right absolute bottom-[1rem] right-0 border-t-[1px] border-slate-300 py-4">
        <div className="pl-4 flex justify-between">
          <div className="pl-4 flex gap-2">
            <IconPerson />
            <div>{username}</div>
          </div>
          <div className="pr-4 cursor-pointer" onClick={handleLogout}>
            <IconLogout />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightBar
