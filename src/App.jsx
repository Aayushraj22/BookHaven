import React from 'react'
import HeroSection from './components/HeroSection'
import TrendingSection from './components/TrendingSection'

function App() {
  return (
    <div className='bg-white dark:bg-black min-h-dvh w-full dark:text-slate-100'>
      <HeroSection />
      <TrendingSection title='5 Most Rated Books' featuring='rated' />
      {/* <TrendingSection title='5 best selling Book' featuring='selled' /> */}
    </div>
  )
}

export default App