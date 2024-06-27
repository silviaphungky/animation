import { lottieColorToRgba } from './lottieColorToRgba'
import { Abbv, LottieShape } from '@/app/editor/[id]/types'

const GRADIENT_COLOR_WO_TRANSPARENCY = 12

export const getLayerColors = (shapes: Array<LottieShape>) => {
  let colors: Array<string> = []
  let shapeIndexes: Array<number> = []
  let groupShapeIndexes: Array<number> = []
  let gradientIndexes: Array<number | undefined> = []

  const mapColorPerTypeShape = (
    shape: LottieShape,
    shapeIndex: number,
    groupShapeIndex?: number
  ) => {
    if (shape[Abbv.TYPE] === Abbv.STROKE || shape[Abbv.TYPE] === Abbv.FILL) {
      const rgb = `rgb(${shape[Abbv.COLOR][Abbv.KEYFRAMES]
        .map((item: number) => lottieColorToRgba(item))
        .join(', ')})`
      colors = [...colors, rgb]
      shapeIndexes =
        shapeIndex !== undefined ? [...shapeIndexes, shapeIndex] : shapeIndexes
      groupShapeIndexes =
        groupShapeIndex !== undefined
          ? [...groupShapeIndexes, groupShapeIndex]
          : groupShapeIndexes
      gradientIndexes = [...gradientIndexes, undefined]
    } else if (shape[Abbv.TYPE] === Abbv.GRADIENT_STROKE) {
      const keyframes = (shape[Abbv.GRADIENT_COLORS][Abbv.KEYFRAMES][
        Abbv.KEYFRAMES
      ] || []) as Array<{ s: Array<number> }>

      keyframes.forEach((keyframe) => {
        const keyframeColors = keyframe.s

        if (keyframeColors.length === GRADIENT_COLOR_WO_TRANSPARENCY) {
          const convertedColor = keyframeColors.map((el, index) =>
            lottieColorToRgba(el, index === 0 || index === 4 || index === 8)
          )
          colors = [
            ...colors,
            `rgb(${convertedColor[1]}, ${convertedColor[2]}, ${convertedColor[3]})`,
            `rgb(${convertedColor[5]}, ${convertedColor[6]}, ${convertedColor[7]})`,
            `rgb(${convertedColor[9]}, ${convertedColor[10]}, ${convertedColor[11]})`,
          ]
        } else {
          const convertedColor = keyframeColors.map((el, index) => {
            const isAlpha = index > 11
            return lottieColorToRgba(el, isAlpha)
          })
          colors = [
            ...colors,
            `rgba(${convertedColor[1]}, ${convertedColor[2]}, ${convertedColor[3]}, ${convertedColor[13]})`,
            `rgba(${convertedColor[5]}, ${convertedColor[6]}, ${convertedColor[7]}, ${convertedColor[15]})`,
            `rgba(${convertedColor[9]}, ${convertedColor[10]}, ${convertedColor[11]}, ${convertedColor[17]})`,
          ]
        }
      })
      shapeIndexes =
        shapeIndex !== undefined
          ? [...shapeIndexes, shapeIndex, shapeIndex, shapeIndex]
          : shapeIndexes
      groupShapeIndexes =
        groupShapeIndex !== undefined
          ? [
              ...groupShapeIndexes,
              groupShapeIndex,
              groupShapeIndex,
              groupShapeIndex,
            ]
          : groupShapeIndexes
      gradientIndexes = [...gradientIndexes, 0, 1, 2]
    } else if (shape[Abbv.TYPE] === Abbv.GRADIENT_FILL) {
      const keyframeColors = shape[Abbv.GRADIENT_COLORS][Abbv.KEYFRAMES][
        Abbv.KEYFRAMES
      ] as Array<number>

      shapeIndexes =
        shapeIndex !== undefined
          ? [...shapeIndexes, shapeIndex, shapeIndex, shapeIndex]
          : shapeIndexes
      groupShapeIndexes =
        groupShapeIndex !== undefined
          ? [
              ...groupShapeIndexes,
              groupShapeIndex,
              groupShapeIndex,
              groupShapeIndex,
            ]
          : groupShapeIndexes
      gradientIndexes = [...gradientIndexes, 0, 1, 2]

      if (keyframeColors.length === GRADIENT_COLOR_WO_TRANSPARENCY) {
        const convertedColor = keyframeColors.map((el, index) =>
          lottieColorToRgba(el, index === 0 || index === 4 || index === 8)
        )
        colors = [
          ...colors,
          `rgb(${convertedColor[1]}, ${convertedColor[2]}, ${convertedColor[3]})`,
          `rgb(${convertedColor[5]}, ${convertedColor[6]}, ${convertedColor[7]})`,
          `rgb(${convertedColor[9]}, ${convertedColor[10]}, ${convertedColor[11]})`,
        ]
      } else {
        const convertedColor = keyframeColors.map((el, index) => {
          const isAlpha = index > 11
          return lottieColorToRgba(el, isAlpha)
        })
        colors = [
          ...colors,
          `rgba(${convertedColor[1]}, ${convertedColor[2]}, ${convertedColor[3]}, ${convertedColor[13]})`,
          `rgba(${convertedColor[5]}, ${convertedColor[6]}, ${convertedColor[7]}, ${convertedColor[15]})`,
          `rgba(${convertedColor[9]}, ${convertedColor[10]}, ${convertedColor[11]}, ${convertedColor[17]})`,
        ]
      }
    }
  }

  shapes.forEach((shape, shapeIndex) => {
    const groupShapes = shape[Abbv.GROUP_SHAPES] || []
    if (groupShapes.length) {
      groupShapes.forEach((groupShape: LottieShape, groupShapeIndex: number) =>
        mapColorPerTypeShape(groupShape, shapeIndex, groupShapeIndex)
      )
    } else mapColorPerTypeShape(shape, shapeIndex)
  })

  return { colors, shapeIndexes, groupShapeIndexes, gradientIndexes }
}
