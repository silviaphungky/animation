/* eslint-disable max-len */

interface Props {
  size?: number
  color?: string
}

const IconLogout = ({ size = 24, color = '#B4BDC2' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 5.07659C3 3.92972 3.94479 3 5.11026 3H13.5513C14.7168 3 15.6615 3.92972 15.6615 5.07659V7.15318C15.6615 7.72662 15.1891 8.19148 14.6064 8.19148C14.0237 8.19148 13.5513 7.72662 13.5513 7.15318V5.07659H8.27563L10.3238 6.15154C11.0115 6.51244 11.441 7.21692 11.441 7.98383V16.4978H13.5513V14.4213C13.5513 13.8478 14.0237 13.383 14.6064 13.383C15.1891 13.383 15.6615 13.8478 15.6615 14.4213V16.4978C15.6615 17.6447 14.7168 18.5744 13.5513 18.5744H11.441V18.9205C11.441 20.4882 9.74337 21.4906 8.33771 20.7528L4.1172 18.5378C3.42954 18.1769 3 17.4724 3 16.7055V5.07659ZM9.33077 17.5361L9.33077 7.98383L5.11026 5.7688V16.7055L9.33077 18.9205V17.5361Z"
      fill={color}
    />
    <path
      d="M18.6586 7.83801C18.2466 7.43253 17.5785 7.43252 17.1664 7.83799C16.7544 8.24346 16.7544 8.90087 17.1664 9.30636L17.6161 9.74892L14.6064 9.74892C14.0237 9.74892 13.5513 10.2138 13.5513 10.7872C13.5513 11.3607 14.0237 11.8255 14.6064 11.8255H17.6161L17.1664 12.2681C16.7544 12.6736 16.7544 13.331 17.1664 13.7364C17.5785 14.1419 18.2466 14.1419 18.6586 13.7364L20.5365 11.8885C21.1545 11.2803 21.1545 10.2942 20.5365 9.68596L18.6586 7.83801Z"
      fill={color}
    />
  </svg>
)

export default IconLogout
