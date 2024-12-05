import React from 'react'

function Button({
    type,
    width, 
    height, 
    borderRadius, 
    border,
    margin,
    round,
    children,
    text,
    color,
    bg,
    clickMethod,
    hover,
}) {
  return (
    <button 
        type={type ?? 'submit'}
        className={`${width ?? 'w-28'} ${height ?? 'h-8'} ${border ?? ''} ${margin ?? ''} ${round ?? 'rounded'} ${borderRadius ?? ''} ${text ?? 'text-xs'} ${color ?? 'text-black'} ${bg ?? 'bg-slate-50'} ${hover ?? ''} capitalize`}
        onClick={clickMethod}
    >
        {children}
    </button>
  )
}

export default Button