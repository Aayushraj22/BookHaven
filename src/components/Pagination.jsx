import React from 'react'

function Pagination({total, clickMethod, curPage, totalItems}) {

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
    <section className=' h-24 w-full flex flex-col items-center justify-center'>
      <div className='w-fit h-14 flex items-center justify-center mx-auto'>
          {total > 5 && curPage > 1 ? 
            <button 
              className='w-10 h-10 border grid place-items-center rounded cursor-pointer dark:border-gray-800 ' 
              onClick={clickMethod}
            >
              &lt;
            </button> : ''
          }

          {total ? generateArray().map((val) => <button
              key={val} 
              className={`text-xs text-semibold border grid place-items-center rounded cursor-pointer dark:border-gray-800 w-10 h-10 transition-all  ${Number(curPage) === val ? 'bg-orange-600 text-white ': ''}`}
              onClick={clickMethod} 
              >{val}</button>): ''}

          {total > 5 && curPage < total ? 
            <button 
              className='w-10 h-10 border grid place-items-center rounded cursor-pointer dark:border-gray-800 '
              onClick={clickMethod} 
            >
              &gt;
            </button> : ''
          } 
      </div>
      <p className='text-xs'>showing {(curPage-1)*10 + 1} to {totalItems - (curPage-1)*10 < 10 ? totalItems - (curPage-1)*10 + (curPage-1)*10  : (curPage-1)*10 + 10} of {totalItems} results</p>
    </section>
  )
}

export default Pagination