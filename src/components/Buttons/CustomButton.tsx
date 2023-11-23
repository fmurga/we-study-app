import React from 'react'

interface Props {
  legend?: string
  count?: number
  children?: React.ReactNode
}

const CustomButton = ({ legend, count, children }: Props) => {
  return (
    <button className="flex">
      {children}
      <span>{legend}</span>
      <span>{count}</span>
    </button>
  )
}

export default CustomButton
