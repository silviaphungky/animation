import { Spinner } from '@/components'

const OverlaySpinner = () => {
  return (
    <>
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
      <div
        className="absolute w-full h-full rounded-lg top-0"
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      />
    </>
  )
}

export default OverlaySpinner
