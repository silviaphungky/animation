import { useRef } from 'react'
import Button from '../Button'
import { IconUpload } from '../Icons'
import { LottieJSON } from '@/app/editor/[id]/types'

const UploadFileBtn = ({
  disabled,
  handleUpload,
}: {
  disabled?: boolean
  handleUpload: ({ json, name }: { json: LottieJSON; name: string }) => void
}) => {
  const ref = useRef<null | HTMLInputElement>(null)

  const readJsonFile = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        if (event.target) {
          resolve(JSON.parse(event.target.result as string))
        }
      }
      fileReader.onerror = (error) => reject(error)
      fileReader.readAsText(file)
    })
  }

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault()
      if (e.target.files) {
        const file = e.target.files[0]
        const data = (await readJsonFile(file)) as LottieJSON
        handleUpload({ json: data, name: file.name })
      }
    } catch (e) {
      console.log('Failed upload file', e)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    ref?.current?.click()
  }

  return (
    <>
      <input
        type="file"
        accept=".json,application/json"
        onChange={onUpload}
        className="hidden"
        ref={ref}
      />
      <Button
        variant="primary-outline"
        disabled={disabled}
        onClick={handleClick}
      >
        <div className="flex gap-2">
          <div>Upload animations</div>
          <IconUpload color={'#809264'} />
        </div>
      </Button>
    </>
  )
}

export default UploadFileBtn
