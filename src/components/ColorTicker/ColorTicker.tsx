import useClickOutside from '@/hooks/useClickOutside'
import { useRef, useState } from 'react'
import { RgbaColorPicker } from 'react-colorful'

interface ColorTickerProps {
  color: string
  onChangeColor: (value: { r: number; g: number; b: number; a: number }) => void
}

const ColorTicker = ({ color, onChangeColor }: ColorTickerProps) => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useClickOutside(ref, () => {
    setIsOpen(false)
  })

  return (
    <div className="relative" ref={ref}>
      <div
        className="w-[1rem] h-[1rem] rounded-[50%] border-[1px] border-slate-300 cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        style={{
          background: color,
        }}
      />
      {isOpen && (
        <div className="absolute z-10 p-2 bg-white shadow-lg">
          <RgbaColorPicker onChange={onChangeColor} />
        </div>
      )}
    </div>
  )
}

export default ColorTicker
