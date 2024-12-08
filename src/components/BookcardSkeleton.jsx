import React from 'react'

function BookcardSkeleton() {
  return (
    <div className='border border-gray-300 dark:border-gray-800 rounded p-2 bg-slate-100 dark:bg-slate-950'>
        <div className='h-60 w-60 mx-auto bg-slate-300 dark:bg-slate-900 rounded-md animate-pulse'
        />
        <div className='px-2 mt-2'>
            <p className='h-4 mb-1 bg-slate-300 dark:bg-slate-900 w-3/5 rounded-md animate-pulse'></p>
            <p className='h-4 mb-1 bg-slate-300 dark:bg-slate-900 w-3/5 rounded-md animate-pulse'></p>
            <span className='inline-block h-8 mb-1 bg-slate-300 dark:bg-slate-900 w-2/5 rounded-md animate-pulse me-2'></span>
            
            <span className='inline-block h-8 mb-1 bg-slate-300 dark:bg-slate-900 w-20 rounded-md animate-pulse'></span>
        </div>
    </div>
  )
}

export default BookcardSkeleton