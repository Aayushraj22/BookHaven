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
    padding,
    display,
}) {
  return (
    <button 
        type={type ?? 'submit'}
        className={`${width ?? 'w-24'} ${height ?? 'h-8'} ${border ?? ''} ${margin ?? ''} ${round ?? 'rounded'} ${borderRadius ?? ''} ${text ?? 'text-xs'} ${color ?? 'text-black'} ${bg ?? 'bg-slate-50'} ${hover ?? ''} ${padding ?? 'p-0'} ${display ?? 'inline-block'} capitalize transition-all select-none`}

        onMouseDown={clickMethod}
    >
        {children}
    </button>
  )
}

export default Button