import React from 'react'

function Pagination({total, clickMethod, curPage}) {

  return (
    <div className='w-fit h-20 flex items-center justify-center mx-auto'>
        {total > 5 ? <p 
            className='w-10 h-8 border grid place-items-center rounded cursor-pointer dark:border-gray-800 ' 
            onClick={clickMethod}
            >&lt;</p> : ''}

        {total ? [...Array(total >= 5 ? 5 : total )].map(( _,ind) => <p
            key={ind} 
            className={`w-10 h-8 border grid place-items-center rounded cursor-pointer dark:border-gray-800  ${Number(curPage) === ind+1 ? 'bg-orange-600 text-white': ''}`}
            onClick={clickMethod} 
            >{ind + 1}</p>): ''}

        {total > 5 ? <p 
            className='w-10 h-8 border grid place-items-center rounded cursor-pointer dark:border-gray-800 '
            onClick={clickMethod} 
            >&gt;</p> : ''}
        
    </div>
  )
}

export default Pagination