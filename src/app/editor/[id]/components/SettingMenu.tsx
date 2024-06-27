import { Dispatch, SetStateAction } from 'react'

import { Input } from '@/components'

import { useEditAnimation } from '@/store/useEditAnimation'
import { useSocket } from '@/store/useSocket'

import { Abbv } from '../types'

const SettingMenu = ({
  setChangeCounter,
}: {
  setChangeCounter: Dispatch<SetStateAction<number>>
}) => {
  const ws = useSocket((state) => state.ws)

  const animation = useEditAnimation((state) => state.animation)
  const setAnimation = useEditAnimation((state) => state.setAnimation)

  const config = useEditAnimation((state) => state.config)
  const setConfig = useEditAnimation((state) => state.setConfig)

  const handleChangeConfig = ({
    value,
    type,
  }: {
    value: number
    type: Abbv.WIDTH | Abbv.HEIGHT | Abbv.FRAME_RATE
  }) => {
    let updatedAnimation = { ...animation }
    updatedAnimation[type] = value

    const message = {
      type: 'updated_animation',
      animation: updatedAnimation,
    }

    ws.send(JSON.stringify(message))
    setAnimation(updatedAnimation)
    setChangeCounter((prev) => prev + 1)
  }

  return (
    <>
      <div className="pb-3">
        <div className="text-xs">Width</div>
        <Input
          value={config.width || 0}
          placeholder="input width"
          onChange={(e) => {
            const value = e.target.value
            handleChangeConfig({ value: Number(value), type: Abbv.WIDTH })
            let updatedConfig = { ...config }
            updatedConfig = {
              ...updatedConfig,
              width: Number(value),
            }
            setConfig(updatedConfig)
          }}
        />
      </div>
      <div className="pb-3">
        <div className="text-xs">Height</div>
        <Input
          value={config.height || 0}
          placeholder="input height"
          onChange={(e) => {
            const value = e.target.value
            handleChangeConfig({ value: Number(value), type: Abbv.HEIGHT })
            let updatedConfig = { ...config }
            updatedConfig = {
              ...updatedConfig,
              height: Number(value),
            }
            setConfig(updatedConfig)
          }}
        />
      </div>
      <div className="pb-3">
        <div className="text-xs">Frame Rate</div>
        <Input
          value={config.frameRate || 0}
          placeholder="input frame rate"
          onChange={(e) => {
            const value = e.target.value
            handleChangeConfig({
              value: Number(value),
              type: Abbv.FRAME_RATE,
            })
            let updatedConfig = { ...config }
            updatedConfig = {
              ...updatedConfig,
              frameRate: Number(value),
            }
            setConfig(updatedConfig)
          }}
        />
      </div>
    </>
  )
}

export default SettingMenu
