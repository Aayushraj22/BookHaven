import React from 'react'

function HeroSection() {
  const hs = [
    {
      title: "BookHaven",
      content: "Dive into a world of endless knowledge and entertainment. Our library offers a vast collection of books, journals, and multimedia resources at your fingertips. Whether you're a student, a researcher, or a casual reader, you'll find something to ignite your curiosity and expand your horizons."
    },
    {
      title: "Discover, Learn, and Grow",
      content: "Our digital library is designed to cater to your learning needs with a diverse range of genres and subjects. From classic literature to the latest scientific research, explore our extensive catalog and embark on your journey of discovery."
    },
    {
      title: "Your Gateway to Knowledge",
      content: "Experience the future of reading with our library. Seamlessly browse, borrow, and read from our extensive collection of e-books. With personalized recommendations and easy access, your next great read is just a click away."
    },
  ];
  
  return (
    <section className=" h-fit flex flex-col justify-center gap-6 p-4 md:p-10 lg:px-20 lg:py-10">
       {hs?.map((item, index) =>
        <div key={index+1} className={`shadow-lg dark:shadow-stone-900 w-10/12 rounded-lg p-6 ${index%2===0 ? 'self-end border-r-4 border-r-cyan-500': 'border-l-4 border-l-blue-800'} hover:scale-110 transition-all`}>
          <p className='text-xl text-sky-900 dark:text-sky-200 pb-3 capitalize font-semibold'>{item.title}</p>
          <p className='text-sm text-stone-800 dark:text-stone-300 italic'>{item.content}</p>
        </div>)}
    </section>
  )
}

export default HeroSection