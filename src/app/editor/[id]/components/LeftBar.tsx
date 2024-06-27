import { Dispatch, SetStateAction } from 'react'

import { IconChevron } from '@/components/Icons'
import LayerTitle from './LayerTitle'

import { useEditAnimation } from '@/store/useEditAnimation'
import { SocketMessage, useSocket } from '@/store/useSocket'

import { Abbv, LottieLayer } from '../types'
import { Layer } from '../page'
import { useParams } from 'next/navigation'

const LeftBar = ({
  layers,
  setChangeCounter,
}: {
  layers: Array<Layer>
  setChangeCounter: Dispatch<SetStateAction<number>>
}) => {
  const { id } = useParams()

  const animation = useEditAnimation((state) => state.animation)
  const setAnimation = useEditAnimation((state) => state.setAnimation)
  const onDeleteLayer = useEditAnimation((state) => state.onDeleteLayer)
  const onChangeVissibility = useEditAnimation(
    (state) => state.onChangeVissibility
  )
  const setSelectedLayer = useEditAnimation((state) => state.setSelectedLayer)
  const selectedLayer = useEditAnimation((state) => state.selectedLayer)
  const ws = useSocket((state) => state.ws)

  const handleDelete = ({
    assetIndex,
    layerIndex,
  }: {
    assetIndex?: number
    layerIndex: number
  }) => {
    const isChild = assetIndex !== undefined
    let updatedAnimation = { ...animation }

    const layers = isChild
      ? updatedAnimation?.assets?.[assetIndex]?.layers
      : updatedAnimation.layers
    onDeleteLayer(layers as Array<LottieLayer>, layerIndex)

    const message = {
      type: SocketMessage.UPDATE_ANIMATION,
      animation: updatedAnimation,
      id,
    }

    ws.send(JSON.stringify(message))
    setAnimation(updatedAnimation)
    setChangeCounter((prev) => prev + 1)
  }

  const handleVisibility = ({
    assetIndex,
    layerIndex,
  }: {
    assetIndex?: number
    layerIndex: number
  }) => {
    const isChild = assetIndex !== undefined
    let updatedAnimation = { ...animation }

    const layer = isChild
      ? updatedAnimation.assets?.[assetIndex]?.layers?.[layerIndex]
      : updatedAnimation.layers[layerIndex]

    onChangeVissibility(layer as LottieLayer)

    const message = {
      type: SocketMessage.UPDATE_ANIMATION,
      animation: updatedAnimation,
      id,
    }

    ws.send(JSON.stringify(message))
    setAnimation(updatedAnimation)
    setChangeCounter((prev) => prev + 1)
  }

  return (
    <div className="h-[100vh] bg-white p-6 px-3 shadow-md w-[15rem] overflow-auto">
      <div className="relative">
        {layers.map((layer, layerIndex) => {
          let children: Array<{
            id: string
            name: string
            colors: Array<string>
            shapeIndexes: Array<number>
            groupShapeIndexes: Array<number>
            assetIndex: number
            gradientIndexes: Array<number | undefined>
          }> = []

          layer.children?.forEach((child) => {
            children = [...children, child]
          })

          const isParentSelected =
            selectedLayer?.layerIndex === layerIndex &&
            selectedLayer?.assetIndex === undefined
          return (
            <div key={layer.id}>
              <div
                onClick={() =>
                  setSelectedLayer({
                    layerIndex,
                  })
                }
                className={`cursor-pointer flex gap-3 items-center w-full font-semibold p-2 rounded-md mb-1 ${
                  isParentSelected ? 'bg-slate-200' : ''
                } ${children.length > 0 ? 'mb-0' : 'mb-2'}`}
              >
                {children.length > 0 ? (
                  <IconChevron />
                ) : (
                  <div className="ml-2" />
                )}
                <LayerTitle
                  isHidden={animation.layers?.[layerIndex]?.[Abbv.HIDDEN]}
                  name={layer.name}
                  handleDelete={() => handleDelete({ layerIndex })}
                  handleVisibility={() => handleVisibility({ layerIndex })}
                />
              </div>

              {layer.children.length > 0 ? (
                <div>
                  {layer.children.map((childLayer, childLayerIndex) => (
                    <div
                      className={`cursor-pointer pl-8 p-2 rounded-md ${
                        selectedLayer?.childLayerIndex === childLayerIndex &&
                        selectedLayer?.assetIndex === childLayer.assetIndex &&
                        selectedLayer?.layerIndex === layerIndex
                          ? 'bg-slate-200'
                          : ''
                      }`}
                      key={childLayer.id}
                      onClick={() =>
                        setSelectedLayer({
                          assetIndex: childLayer.assetIndex,
                          layerIndex,
                          childLayerIndex,
                        })
                      }
                    >
                      <LayerTitle
                        isHidden={
                          !!animation.assets?.[childLayer.assetIndex]?.layers[
                            childLayerIndex
                          ]?.[Abbv.HIDDEN]
                        }
                        name={childLayer.name}
                        handleDelete={() =>
                          handleDelete({
                            assetIndex: childLayer.assetIndex,
                            layerIndex: childLayerIndex,
                          })
                        }
                        handleVisibility={() =>
                          handleVisibility({
                            assetIndex: childLayer.assetIndex,
                            layerIndex: childLayerIndex,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LeftBar
