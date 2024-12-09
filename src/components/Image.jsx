import React from 'react'

function Image({
    src,
    alt, 
    width, 
    height, 
    borderRadius, 
    border,
    margin,
    round,
    shadow,
    cursor,
    clickMethod,
}) {
  return (
    <>
        <img 
            src={src} 
            alt={alt ?? 'Image'} 
            onClick={clickMethod}
            className={`object-contain ${width ?? 'w-60'} ${height ?? 'h-60'} ${border ?? ''} ${margin ?? ''} ${round ?? ''} ${borderRadius ?? ''} ${shadow ?? ''} ${cursor ?? 'cursor-default'}`}
        />
    </>
  )
}

export default Image