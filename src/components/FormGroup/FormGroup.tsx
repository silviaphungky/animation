import { ReactNode } from 'react'

const FormGroup = ({
  children,
  label,
  error,
}: {
  children: ReactNode
  label?: string | ReactNode
  error?: string
}) => {
  return (
    <div className="mb-5">
      {label && <div className="text-sm mb-1 font-semibold">{label}</div>}
      {children}
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  )
}

export default FormGroup
