import React from 'react'

function TextKV({
    name, 
    value,
}) {
  return (
    <p className='capitalize text-xs md:text-sm'>
        {name} : <span className='text-xs  '>{value}</span>
    </p>
  )
}

export default TextKV