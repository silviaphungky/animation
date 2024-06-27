/* eslint-disable max-len */

interface Props {
  size?: number
  color?: string
}

const IconChevron = ({ size, color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 10}
      height={size || 10}
      viewBox="0 0 8 14"
      fill="none"
    >
      <path
        d="M1 13L7 7L0.999999 1"
        stroke={color || '#B7B7B7'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconChevron
