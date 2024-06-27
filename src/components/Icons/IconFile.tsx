/* eslint-disable max-len */
interface Props {
  width?: number
  height?: number
  color?: string
}

const IconFile = ({
  width = 14,
  height = 18,
  color = '#DCE1E7',
  ...props
}: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 14 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 13C10 13.5523 9.55228 14 9 14H5C4.44772 14 4 13.5523 4 13C4 12.4477 4.44772 12 5 12H9C9.55228 12 10 12.4477 10 13Z"
      fill={color}
    />
    <path
      d="M9 11C9.55228 11 10 10.5523 10 10C10 9.44772 9.55228 9 9 9H5C4.44772 9 4 9.44772 4 10C4 10.5523 4.44772 11 5 11L9 11Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.82843 0C5.298 -4.63719e-08 4.78929 0.210712 4.41422 0.585785L0.585788 4.41421C0.210714 4.78929 9.35599e-07 5.29799 8.89227e-07 5.82843L0 16C-9.65645e-08 17.1046 0.89543 18 2 18H12C13.1046 18 14 17.1046 14 16L14 2C14 0.89543 13.1046 6.36101e-07 12 5.39536e-07L5.82843 0ZM2 16H12L12 2L7 2L7 6C7 6.55229 6.55229 7 6 7L2 7L2 16ZM5 5V2.82843L2.82843 5L5 5Z"
      fill={color}
    />
  </svg>
)

export default IconFile
