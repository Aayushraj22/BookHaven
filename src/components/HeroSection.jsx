import React from 'react'

function HeroSection() {
  const hs = [
    {
      title: "Welcome to Your Digital Library Haven",
      content: "Dive into a world of endless knowledge and entertainment. Our online library offers a vast collection of books, journals, and multimedia resources at your fingertips. Whether you're a student, a researcher, or a casual reader, you'll find something to ignite your curiosity and expand your horizons."
    },
    {
      title: "Discover, Learn, and Grow",
      content: "Unlock the door to a treasure trove of information. Our digital library is designed to cater to your learning needs with a diverse range of genres and subjects. From classic literature to the latest scientific research, explore our extensive catalog and embark on your journey of discovery."
    },
    {
      title: "Your Gateway to Knowledge",
      content: "Experience the future of reading with our online library. Seamlessly browse, borrow, and read from our extensive collection of e-books and audiobooks. With personalized recommendations and easy access, your next great read is just a click away."
    },
    {
      title: "Empowering Minds, One Book at a Time",
      content: "Join our community of avid readers and lifelong learners. Our online library provides a platform for you to explore new ideas, gain insights, and connect with like-minded individuals. Start your adventure today and let the power of knowledge transform your life."
    }
  ];
  
  return (
    <section className="bg-gradient-to-r from-cyan-300 to-blue-500 dark:from-cyan-600 dark:to-blue-800 h-dvh flex flex-col justify-center gap-4 p-4 md:p-10 ">
       {hs?.map((item, index) =>
        <div key={index+1} className={`shadow-lg w-10/12 rounded-lg p-4 ${index%2===0 ? 'self-end border-r-4 border-r-cyan-500': 'border-l-4 border-l-blue-800'}`}>
          <p className='text-2xl text-sky-900 dark:text-sky-200 pb-3 capitalize font-semibold'>{item.title}</p>
          <p className='text-sm text-stone-800 dark:text-stone-300 italic'>{item.content}</p>
        </div>)}
    </section>
  )
}

export default HeroSection