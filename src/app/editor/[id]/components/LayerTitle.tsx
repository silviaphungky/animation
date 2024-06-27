import {
  IconTrash,
  IconVisibilityOff,
  IconVisibilityOn,
} from '@/components/Icons'

interface LayerTitleProps {
  isHidden: boolean
  name: string
  handleVisibility: () => void
  handleDelete: () => void
}

const LayerTitle = ({
  isHidden,
  name,
  handleVisibility,
  handleDelete,
}: LayerTitleProps) => {
  return (
    <div className="flex justify-between gap-6 w-full items-center">
      <div className="text-xs">{name}</div>
      <div className="flex gap-3">
        <div className="cursor-pointer" onClick={handleVisibility}>
          {isHidden ? <IconVisibilityOff /> : <IconVisibilityOn />}
        </div>
        <div className="cursor-pointer" onClick={handleDelete}>
          <IconTrash />
        </div>
      </div>
    </div>
  )
}

export default LayerTitle
