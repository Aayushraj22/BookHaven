import React from 'react'

function Pagination({total, clickMethod, curPage}) {

  const generateArray = () => {
    let arr =  [...Array(total >= 5 ? 5 : total)]

    if(curPage <= 5) {
      arr = arr.map((_,i) => i+1)
    } else {

      // fill data in array
      arr[0] = 1;   // this index is fixed
      const availablePosition = 4;
      const requiredPosition = total - curPage + 1;
      
      if(requiredPosition <= availablePosition) {
        for(let i=0; i<availablePosition; i++) {
          arr[availablePosition - i] = total - i;
        }
      } else {
        for(let i=0; i<availablePosition; i++) {
          arr[i+1] = curPage - 1 + i;
        }
      }
    }

    return arr;
  }

  return (
    <div className='w-fit h-20 flex items-center justify-center mx-auto'>
        {total > 5 && curPage > 1 ? 
          <button 
            className='w-8 h-7 border grid place-items-center rounded cursor-pointer dark:border-gray-800 ' 
            onClick={clickMethod}
          >
            &lt;
          </button> : ''
        }

        {total ? generateArray().map((val) => <button
            key={val} 
            className={` border grid place-items-center rounded cursor-pointer dark:border-gray-800 transition-all  ${Number(curPage) === val ? 'bg-orange-600 text-white w-10 h-10': 'w-9 h-8'}`}
            onClick={clickMethod} 
            >{val}</button>): ''}

        {total > 5 && curPage < total ? 
          <button 
            className='w-8 h-7 border grid place-items-center rounded cursor-pointer dark:border-gray-800 '
            onClick={clickMethod} 
          >
            &gt;
          </button> : ''
        }
        
    </div>
  )
}

export default Pagination