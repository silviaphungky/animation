/* eslint-disable max-len */

interface Props {
  size?: number
  color?: string
}

const IconTrash = ({ size, color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 20}
      height={size || 20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M3.33398 5.83333H16.6673M8.33398 9.16667V14.1667M11.6673 9.16667V14.1667M4.16732 5.83333L5.00065 15.8333C5.00065 16.2754 5.17625 16.6993 5.48881 17.0118C5.80137 17.3244 6.22529 17.5 6.66732 17.5H13.334C13.776 17.5 14.1999 17.3244 14.5125 17.0118C14.8251 16.6993 15.0007 16.2754 15.0007 15.8333L15.834 5.83333M7.50065 5.83333V3.33333C7.50065 3.11232 7.58845 2.90036 7.74473 2.74408C7.90101 2.5878 8.11297 2.5 8.33398 2.5H11.6673C11.8883 2.5 12.1003 2.5878 12.2566 2.74408C12.4129 2.90036 12.5007 3.11232 12.5007 3.33333V5.83333"
        stroke={color || '#C8D1D6'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconTrash
