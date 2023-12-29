import React from 'react'

interface Props {
  legend?: string
  count?: number
  children?: React.ReactNode
  onClick: () => void
  classNames?: string
}

const CustomButton = ({
  legend,
  count,
  children,
  onClick,
  classNames,
}: Props) => {
  const onClickAction = (e) => {
    e.preventDefault()
    onClick()
  }
  return (
    <button className={`${classNames}`} onClick={onClickAction}>
      {children}
      <span>{legend}</span>
      <span>{count}</span>
    </button>
  )
}

export default CustomButton
