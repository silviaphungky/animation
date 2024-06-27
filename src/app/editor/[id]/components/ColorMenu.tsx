import { Dispatch, SetStateAction } from 'react'

import { ColorTicker } from '@/components'

import { useEditAnimation } from '@/store/useEditAnimation'
import { SocketMessage, useSocket } from '@/store/useSocket'

import { Abbv } from '../types'
import { Layer } from '../page'
import { useParams } from 'next/navigation'

const ColorMenu = ({
  layers,
  setChangeCounter,
}: {
  layers: Array<Layer>
  setChangeCounter: Dispatch<SetStateAction<number>>
}) => {
  const { id } = useParams()

  const ws = useSocket((state) => state.ws)
  const animation = useEditAnimation((state) => state.animation)
  const setAnimation = useEditAnimation((state) => state.setAnimation)
  const selectedLayer = useEditAnimation((state) => state.selectedLayer)

  const matchLayer = layers[selectedLayer?.layerIndex || 0]
  const parentColors = matchLayer.colors.map((color, index) => ({
    color,
    layerIndex: selectedLayer?.layerIndex || 0,
    shapeIndex: matchLayer.shapeIndexes[index],
    groupShapeIndex: matchLayer.groupShapeIndexes[index],
    gradientIndex: matchLayer.gradientIndexes[index],
    isAssets: false,
  }))

  let childrenColors: Array<{
    color: string
    assetIndex: number
    layerIndex: number
    shapeIndex: number
    groupShapeIndex: number
    gradientIndex?: number
    childLayerIndex?: number
    isAssets: boolean
  }> = []

  matchLayer.children.forEach((child, childLayerIndex) => {
    child.colors.forEach((color, index) => {
      childrenColors = [
        ...childrenColors,
        {
          color,
          assetIndex: child.assetIndex,
          layerIndex: selectedLayer?.layerIndex || 0,
          shapeIndex: child.shapeIndexes[index],
          groupShapeIndex: child.groupShapeIndexes[index],
          gradientIndex: child.gradientIndexes[index],
          childLayerIndex,
          isAssets: true,
        },
      ]
    })
  })

  const colors: Array<{
    color: string
    assetIndex?: number
    layerIndex: number
    childLayerIndex?: number
    shapeIndex: number
    groupShapeIndex: number
    gradientIndex?: number
    isAssets: boolean
  }> = [...parentColors, ...childrenColors]

  const selectedColors =
    selectedLayer?.assetIndex !== undefined
      ? colors.filter(
          (el) =>
            el.assetIndex === selectedLayer.assetIndex &&
            el.childLayerIndex === selectedLayer.childLayerIndex
        )
      : colors.filter((el) => el.layerIndex === selectedLayer?.layerIndex)

  const handleUpdateColor = ({
    color,
    layerIndex,
    assetIndex,
    shapeIndex,
    groupShapeIndex,
    gradientIndex,
    isAssets,
  }: {
    color: { r: number; g: number; b: number; a: number }
    layerIndex: number
    assetIndex?: number
    shapeIndex: number
    groupShapeIndex: number
    gradientIndex?: number
    isAssets: boolean
  }) => {
    let updatedAnimation = { ...animation }

    if (isAssets) {
      const assets = updatedAnimation.assets || []
      const asset = assets[assetIndex as number] || {}
      const assetLayers = asset.layers || []
      const assetLayer = assetLayers[layerIndex] || {}
      const assetShapes = assetLayer.shapes || []
      const assetShape = assetShapes[shapeIndex] || {}
      const shape = assetShape[Abbv.GROUP_SHAPES][groupShapeIndex]

      if (shape[Abbv.TYPE] === Abbv.STROKE || shape[Abbv.TYPE] === Abbv.FILL) {
        updatedAnimation!.assets![assetIndex as number]!.layers![
          layerIndex
        ]!.shapes![shapeIndex][Abbv.GROUP_SHAPES][groupShapeIndex] = {
          ...shape,
          [Abbv.COLOR]: {
            ...shape[Abbv.COLOR],
            [Abbv.KEYFRAMES]: [color.r / 255, color.g / 255, color.b / 255],
          },
        }
      } else if (shape[Abbv.TYPE] === Abbv.GRADIENT_FILL) {
        updatedAnimation!.assets![assetIndex as number]!.layers![
          layerIndex
        ]!.shapes![shapeIndex][Abbv.GROUP_SHAPES][groupShapeIndex] = {
          ...shape,
          [Abbv.GRADIENT_COLORS]: {
            ...shape[Abbv.GRADIENT_COLORS],
            [Abbv.KEYFRAMES]: {
              ...shape[Abbv.GRADIENT_COLORS][Abbv.KEYFRAMES],
              [Abbv.KEYFRAMES]: [color.r / 255, color.g / 255, color.b / 255],
            },
          },
        }
      }
    } else {
      const layers = updatedAnimation.layers || []
      const layer = layers[layerIndex] || {}
      const shapes = layer.shapes || []
      const shape = shapes[shapeIndex][Abbv.GROUP_SHAPES][groupShapeIndex]

      if (shape[Abbv.TYPE] === Abbv.STROKE || shape[Abbv.TYPE] === Abbv.FILL) {
        updatedAnimation!.layers![layerIndex]!.shapes![shapeIndex][
          Abbv.GROUP_SHAPES
        ][groupShapeIndex] = {
          ...shape,
          [Abbv.COLOR]: {
            ...shape[Abbv.COLOR],
            [Abbv.KEYFRAMES]: [color.r / 255, color.g / 255, color.b / 255],
          },
        }
      } else if (shape[Abbv.TYPE] === Abbv.GRADIENT_FILL) {
        const colorGradientList =
          shape[Abbv.GRADIENT_COLORS][Abbv.KEYFRAMES][Abbv.KEYFRAMES]

        if (gradientIndex === 0) {
          colorGradientList[1] = color.r / 255
          colorGradientList[2] = color.g / 255
          colorGradientList[3] = color.b / 255
          colorGradientList[0] = color.a
        } else if (gradientIndex === 1) {
          colorGradientList[5] = color.r / 255
          colorGradientList[6] = color.g / 255
          colorGradientList[7] = color.b / 255
          colorGradientList[4] = color.a
        } else {
          colorGradientList[9] = color.r / 255
          colorGradientList[10] = color.g / 255
          colorGradientList[11] = color.b / 255
          colorGradientList[8] = color.a
        }

        updatedAnimation!.layers![layerIndex]!.shapes![shapeIndex][
          Abbv.GROUP_SHAPES
        ][groupShapeIndex] = {
          ...shape,
          [Abbv.GRADIENT_COLORS]: {
            ...shape[Abbv.GRADIENT_COLORS],
            [Abbv.KEYFRAMES]: {
              ...shape[Abbv.GRADIENT_COLORS][Abbv.KEYFRAMES],
              [Abbv.KEYFRAMES]: colorGradientList,
            },
          },
        }
      }
    }

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
    <div>
      <div className="text-sm mb-2">All Colors</div>
      <div className="flex flex-wrap gap-2">
        {selectedColors.map((item, index) => (
          <div key={index}>
            <ColorTicker
              color={item.color}
              onChangeColor={(value) => {
                handleUpdateColor({
                  color: value,
                  layerIndex: item.layerIndex,
                  shapeIndex: item.shapeIndex,
                  groupShapeIndex: item.groupShapeIndex,
                  gradientIndex: item.gradientIndex,
                  assetIndex: item.assetIndex,
                  isAssets: item.isAssets,
                })
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColorMenu
