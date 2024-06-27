'use client'

import { useEffect, useState } from 'react'
import { Controls, Player } from '@lottiefiles/react-lottie-player'
import { useParams } from 'next/navigation'

import {
  LeftBar,
  RightBar,
  SettingMenu,
  ColorMenu,
  ChatMenu,
} from './components'
import { Spinner } from '@/components'

import useUpdateAnimation from '@/service/hooks/useUpdateAnimation'
import useGetAnimation from '@/service/hooks/useGetAnimation'

import { useEditAnimation } from '@/store/useEditAnimation'

import { getLayerColors } from '@/utils/getLayerColors'
import useDebounce from '@/hooks/useDebounce'
import { menu } from './components/RightBar'
import { Abbv, LottieAssets } from './types'

export interface Layer {
  id: string | number
  name: string
  children: Array<{
    id: string
    name: string
    colors: Array<string>
    shapeIndexes: Array<number>
    groupShapeIndexes: Array<number>
    gradientIndexes: Array<number | undefined>
    assetIndex: number
  }>
  colors: Array<string>
  shapeIndexes: Array<number>
  groupShapeIndexes: Array<number>
  gradientIndexes: Array<number | undefined>
}

export default function Editor() {
  const { id } = useParams()

  const {
    data = { animation: {} },
    isFetched,
    isLoading,
  } = useGetAnimation(id as string)

  const animation = useEditAnimation((state) => state.animation)
  const setAnimation = useEditAnimation((state) => state.setAnimation)

  const [layers, setLayers] = useState<Array<Layer>>([])

  const [changeCounter, setChangeCounter] = useState(0)
  const [selectedTab, setSelectedTab] = useState(
    menu[0] as 'Color' | 'Setting' | 'Chat'
  )

  const { mutateAsync, isSuccess } = useUpdateAnimation()

  useDebounce({
    func: async () => {
      if (changeCounter > 0) {
        const data = await mutateAsync({
          animation,
          id: id as string,
        })
        if (isSuccess) {
          setChangeCounter(0)
          const animationData = data.animation || {}
          const json = JSON.parse(animationData.json)
          setAnimation(json)
        }
      }
    },
    value: JSON.stringify(animation),
    reachLimit: changeCounter >= 3,
    delay: 2000,
  })

  useEffect(() => {
    if (isFetched) {
      const animationData = (data.animation || {}) as {
        name: string
        _id: string
        gifUrl?: string
        json: string
      }
      const json = animationData.json
      const parsedData = JSON.parse(json)
      setAnimation(parsedData)
    }
  }, [data, isFetched])

  useEffect(() => {
    const layersData = animation.layers || []
    const assetsData = animation.assets || ([] as Array<LottieAssets>)

    if (layersData.length) {
      const mapping = layersData.map((item) => {
        const child =
          assetsData.find((asset) => asset.id === item[Abbv.PRECOMP_ID]) ||
          ({} as LottieAssets)
        const childLayer = child.layers || []
        const assetIndex = assetsData.findIndex(
          (asset) => asset.id === item[Abbv.PRECOMP_ID]
        )

        return {
          id: item[Abbv.INDEX],
          name: item[Abbv.NAME],
          children: childLayer.map((assetLayer, index) => {
            const childColors = getLayerColors(assetLayer.shapes || []).colors
            const shapeIndexes = getLayerColors(
              assetLayer.shapes || []
            ).shapeIndexes
            const groupShapeIndexes = getLayerColors(
              assetLayer.shapes || []
            ).groupShapeIndexes
            const gradientIndexes = getLayerColors(
              assetLayer.shapes || []
            ).gradientIndexes
            return {
              id: `${assetIndex}-${shapeIndexes}-${groupShapeIndexes}-${index}`,
              name: assetLayer[Abbv.NAME],
              colors: childColors,
              shapeIndexes,
              groupShapeIndexes,
              gradientIndexes,
              assetIndex,
            }
          }),
          colors: [...getLayerColors(item.shapes || []).colors],
          shapeIndexes: getLayerColors(item.shapes || []).shapeIndexes,
          groupShapeIndexes: getLayerColors(item.shapes || [])
            .groupShapeIndexes,
          gradientIndexes: getLayerColors(item.shapes || []).gradientIndexes,
        }
      })

      setLayers(mapping)
    }
  }, [animation])

  const content = {
    Color: <ColorMenu layers={layers} setChangeCounter={setChangeCounter} />,
    Setting: <SettingMenu setChangeCounter={setChangeCounter} />,
    Chat: <ChatMenu />,
  }

  return (
    <div className="flex justify-between">
      <LeftBar layers={layers} setChangeCounter={setChangeCounter} />
      <Player
        loop
        autoplay
        src={Object.keys(animation).length ? animation : ''}
        style={{ height: '70vh', width: '100%' }}
      >
        <Controls
          visible={true}
          buttons={['play', 'repeat', 'frame', 'debug']}
        />
      </Player>
      <RightBar selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
        {isLoading || layers.length === 0 ? <Spinner /> : content[selectedTab]}
      </RightBar>
    </div>
  )
}
