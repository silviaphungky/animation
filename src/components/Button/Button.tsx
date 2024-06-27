import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  forwardRef,
} from 'react'

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: string | ReactNode
  variant: 'primary' | 'text' | 'primary-outline'
  loading?: boolean
  full?: boolean
}

const TYPE_MAPPING: {
  [key in 'primary' | 'text' | 'primary-outline']: string
} = {
  primary: 'bg-primary text-white font-semibold text-sm px-4 py-2 rounded-md',
  text: 'text-gray-600 px-4 py-2 text-sm',
  'primary-outline':
    'bg-white px-4 py-2 text-primary text-sm font-semibold rounded-md border border-gray-300 disabled:border-0 disabled:bg-gray-100',
}
const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant, loading, full = false, ...props }, ref) => {
    return (
      <button
        className={
          TYPE_MAPPING[variant] +
          ` ${full ? 'w-full' : 'w-auto'}  ${
            loading ? 'flex justify-center' : ''
          } ${props.disabled ? 'opacity-70' : ''}`
        }
        {...props}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)

export default Button
