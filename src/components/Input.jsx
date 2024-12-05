import React, { useEffect, useRef, useState } from 'react'

function Input({
    pValue= undefined,
    type,
    width,
    height,
    border,
    borderRadius,
    outline,
    name,
    color,
    background,
    text,
    placeholder,
    padding,
    required,
}) {

    const labelRef = useRef(null)
    const inputRef = useRef(null)
    const [value, setValue] = useState(pValue ?? '')

    const handleChangeInput = (e) => {
        const val = e.target.value;

        setValue(val);
    }

    const focusInputWithDefaultData = () => {
        const spanE = labelRef.current.classList

        if(pValue){
            spanE.toggle('-top-4')
            spanE.toggle(background ?? 'bg-white')
        } 


    }

    const toggleInputFocus = () => {
        const spanE = labelRef.current.classList

        if(!value){
            spanE.toggle('-top-4')
            spanE.toggle(background ?? 'bg-white')
        } 
    }


    useEffect(() => {
        if(pValue) {
            setValue(pValue)
            focusInputWithDefaultData()
        }

        return () => {
            console.log(('Input unmounting...'))
        }
    }, [pValue])
    

  return (
    <div className={`relative ${width ?? 'w-full'} transition-all`}>
        <input
            type={type ?? 'text'}
            name={name}
            value={value}
            placeholder={placeholder}
            required={required ?? false}
            onChange={handleChangeInput}
            onFocus={toggleInputFocus}
            onBlur={toggleInputFocus}
            className={`${height ?? 'h-12'} ${border ?? 'border'} ${borderRadius ?? 'rounded'} ${outline ?? 'outline-none'} ${color ?? 'text-gray-800'} ${background ?? 'bg-slate-50'} ${text ?? 'text-base'} ${padding ?? 'px-1'} ${required ? 'border-r-4 border-r-red-600' : ''} w-full`}
            ref={inputRef}
            disabled={pValue ? true : false}
        />
        <span 
            ref={labelRef}
            className={`absolute inset-y-2 left-2 text-lg font-serif h-7 w-fit p-1 text-gray-500 capitalize rounded ${background ?? 'bg-slate-50'}`}
            onClick={() => {
                inputRef.current.focus()
            }}
        >
            {name}
        </span>
    </div>
  )
}

export default Input