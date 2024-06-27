import { create } from 'zustand'

import { Abbv, LottieJSON, LottieLayer } from '@/app/editor/[id]/types'

interface StoreType {
  animation: LottieJSON
  setAnimation: (updatedAnimation: LottieJSON) => void
  config: {
    width: number
    height: number
    frameRate: number
  }
  setConfig: (config: {
    width: number
    height: number
    frameRate: number
  }) => void
  onDeleteLayer: (layers: Array<LottieLayer>, layerIndex: number) => void
  onChangeVissibility: (layer: LottieLayer) => void
  selectedLayer?: {
    layerIndex: number
    assetIndex?: number
    childLayerIndex?: number
  }
  setSelectedLayer: ({
    assetIndex,
    layerIndex,
    childLayerIndex,
  }: {
    assetIndex?: number
    layerIndex: number
    childLayerIndex?: number
  }) => void
}

const editAnimationStore = (set: any) => ({
  animation: {} as LottieJSON,
  setAnimation: (updatedAnimation: LottieJSON) => {
    set({ animation: updatedAnimation })
    const width = updatedAnimation[Abbv.WIDTH]
    const height = updatedAnimation[Abbv.HEIGHT]
    const frameRate = updatedAnimation[Abbv.FRAME_RATE]
    set({
      config: {
        width,
        height,
        frameRate,
      },
    })
  },
  config: {
    width: 0,
    height: 0,
    frameRate: 0,
  },
  setConfig: (config: { width: number; height: number; frameRate: number }) =>
    set({ config }),
  onDeleteLayer: (layers: Array<LottieLayer>, layerIndex: number) => {
    layers.splice(layerIndex, 1)
  },
  onChangeVissibility: (layer: { [Abbv.HIDDEN]: boolean }) => {
    layer[Abbv.HIDDEN] = !layer[Abbv.HIDDEN]
  },
  selectedLayer: {
    layerIndex: 0,
  },
  setSelectedLayer: ({
    assetIndex,
    layerIndex,
    childLayerIndex,
  }: {
    assetIndex?: number
    layerIndex: number
    childLayerIndex?: number
  }) => {
    set({ selectedLayer: { assetIndex, layerIndex, childLayerIndex } })
  },
})

export const useEditAnimation = create<StoreType>()(editAnimationStore)
