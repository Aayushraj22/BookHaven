import React from 'react'
import HeroSection from './components/HeroSection'
import TrendingSection from './components/TrendingSection'

function App() {
  return (
    <div className='bg-slate-100 dark:bg-black min-h-dvh w-full dark:text-slate-100 rounded-md'>
      <HeroSection />
      <TrendingSection title='top-rated books' featuring='rated' />
      <TrendingSection title='Top-selling books' featuring='selled' />
    </div>
  )
}

export default App