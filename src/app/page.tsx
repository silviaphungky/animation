'use client'

import { useRouter } from 'next/navigation'

import { Shimmer, Spinner, UploadFileBtn } from '@/components'
import OverlaySpinner from './components/OverlaySpinner'

import useCreateAnimation from '@/service/hooks/useCreateAnimation'
import useGetFeaturedPublicAnimations from '@/service/hooks/useGetFeaturedPublicAnimations'
import useGetRecentEdit from '@/service/hooks/useGetRecentEdit'

import { PATHS } from '@/constants/paths'
import { useEditAnimation } from '@/store/useEditAnimation'
import { useEffect } from 'react'
import { LottieJSON } from './editor/[id]/types'

export default function Home() {
  const router = useRouter()

  const setAnimation = useEditAnimation((state) => state.setAnimation)
  const setSelectedLayer = useEditAnimation((state) => state.setSelectedLayer)

  const { data = { featuredPublicAnimations: { edges: [] } }, isLoading } =
    useGetFeaturedPublicAnimations()
  const featuredPublicAnimations = data.featuredPublicAnimations || {}
  const animations = featuredPublicAnimations.edges || []

  const {
    data: recentEdit = { animations: [] },
    isLoading: isLoadingRecentEdit,
  } = useGetRecentEdit()

  const { mutateAsync, isPending } = useCreateAnimation()

  const save = async ({
    json,
    name,
    gifUrl,
  }: {
    json: Record<any, any>
    name: string
    gifUrl?: string
  }) => {
    try {
      const { data } = await mutateAsync({
        json,
        name,
        gifUrl,
      })
      const id = data._id
      router.push(`${PATHS.EDITOR}/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async ({
    jsonUrl,
    name,
    gifUrl,
  }: {
    jsonUrl: string
    name: string
    gifUrl: string
  }) => {
    const response = await fetch(jsonUrl)
    const data = await response.json()
    save({ json: data, name, gifUrl })
  }

  useEffect(() => {
    setAnimation({} as LottieJSON)
    setSelectedLayer({
      layerIndex: 0,
    })
  }, [])

  return (
    <div>
      <div className="flex justify-between mt-4 mb-4">
        <h2 className="text-2xl font-semibold">Recently Workspaces</h2>
        <div>
          <UploadFileBtn
            disabled={isPending}
            handleUpload={({ json, name }) => {
              save({ json, name })
            }}
          />
        </div>
      </div>
      {isLoadingRecentEdit ? (
        <div className="flex flex-col items-center justify-center mb-6">
          <Spinner />
          <div className="text-sm mt-2 text-slate-400">Fetching data...</div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-7 ">
          {recentEdit.animations.map((item) => (
            <div
              key={item._id}
              className="relative cursor-pointer border-[1px] border-slate-300 rounded-lg"
              onClick={() => router.push(`${PATHS.EDITOR}/${item._id}`)}
            >
              <div className="h-full p-4 flex justify-between flex-col">
                <img
                  className="block mx-auto"
                  alt={item.name}
                  src={item.gifUrl}
                  height={'auto'}
                  width={100}
                />
                <div className="font-semibold text-xs mt-1 text-slate-400">
                  {item.name}
                </div>
              </div>
              {isPending && <OverlaySpinner />}
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-2 mt-6">Templates</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
        {isLoading ? (
          <>
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
          </>
        ) : (
          animations.map((item) => {
            const itemData = item.node
            return (
              <div
                key={itemData.id}
                className="cursor-pointer border-[1px] border-slate-300 rounded-lg relative"
                onClick={() => {
                  if (!isPending) {
                    handleClick({
                      jsonUrl: itemData.jsonUrl,
                      name: itemData.name,
                      gifUrl: itemData.gifUrl,
                    })
                  }
                }}
              >
                <div className="h-full p-4 flex justify-between flex-col">
                  <img alt={itemData.name} src={itemData.gifUrl} />
                  <div className="font-semibold">{itemData.name}</div>
                </div>
                {isPending && <OverlaySpinner />}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
