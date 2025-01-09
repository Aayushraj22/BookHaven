import React, { useEffect, useRef } from 'react'
import Image from './Image';

function HeroSection() {
  const horizontalScrollRef = useRef(null)

  const hs = [
    {
      title: "Books",
      content: "Books are the windows to diverse worlds, offering endless adventures and knowledge. They nurture imagination, empathy, and critical thinking. Whether fiction or non-fiction, books enrich our minds, reduce stress, and enhance our understanding of the world. They are timeless treasures that inspire and educate, making them indispensable companions.",
      imgurl: 'https://booksure.netlify.app/assets/svg/home-1.svg'
    },
    {
      title: "Discover, Learn, and Grow",
      content: "Our digital library is designed to cater to your learning needs with a diverse range of genres and subjects. From classic literature to the latest scientific research, explore our extensive catalog and embark on your journey of discovery.",
      imgurl: 'https://booksure.netlify.app/assets/svg/home-2.svg'
    },
    {
      title: "Your Gateway to Knowledge",
      content: "Experience the future of reading with our library. Seamlessly browse, borrow, and read from our extensive collection of e-books. With personalized recommendations and easy access, your next great read is just a click away.",
      imgurl: 'https://booksure.netlify.app/assets/svg/home-3.svg'
    },
  ];

  useEffect(() => {
    function carousel() {
      const parent = horizontalScrollRef.current
      // const parentWidth = parent.offsetWidth  // container content width (excludes border, padding)
      // const scrollWidth = parent.scrollWidth
      // const scrollLeft = parent.scrollLeft

      let direction = 0    // 1 -> ltr, 0 -> rtl

        // set a timer of 1s
      setInterval(() => {
          if(direction) {  // ltr
              parent.scrollLeft -= parent.offsetWidth
              
              if(parent.scrollLeft === 0)
                  direction =  0
          } else {   // rtl
              parent.scrollLeft += parent.offsetWidth

              if(parent.scrollLeft + parent.offsetWidth === parent.scrollWidth)
                  direction = 1
          }

      }, 2000);
    }

    carousel()
  
    return () => {
      
    }
  }, [])
  
  

  const aims = [
    {
      "title": "Promote Accessibility",
      "description": "Ensure everyone has access to a wide range of books and resources, no matter where they are."
    },
    {
      "title": "Encourage Lifelong Learning",
      "description": "Inspire users to keep learning and growing by reading and exploring new ideas."
    },
    {
      "title": "Cultivate a Love for Reading",
      "description": "Create an easy-to-use platform that makes reading fun and convenient for all ages."
    },
    {
      "title": "Support Community and Collaboration",
      "description": "Build a community of readers where users can share recommendations, reviews, and discuss books."
    },
    {
      "title": "Preserve Knowledge",
      "description": "Digitally save and protect books, ensuring they are available for future generations."
    },
    {
      "title": "Enhance Educational Resources",
      "description": "Provide valuable materials and tools to support students, educators, and lifelong learners in their studies."
    }
  ]
  
  
  return (
    <section className=" h-fit flex flex-col justify-center gap-6 p-4 md:p-10 lg:px-20 lg:py-10">
       {hs?.map((item, index) =>
       <div key={index + 1} className='flex items-center gap-4 '>
        <div key={index+1} className={`${index % 2 === 0 ? ' ': 'order-last'} shadow-lg dark:shadow-stone-900 flex-1 rounded-lg p-6 ${index%2===0 ? 'border-r-4 border-r-cyan-500': 'border-l-4 border-l-blue-800'} hover:scale-105 transition-all`}>
          <p className='text-xl sm:text-3xl text-sky-900 dark:text-sky-200 pb-3 capitalize font-semibold font-serif'>{item.title}</p>
          <p className='text-sm sm:text-base text-slate-600 dark:text-slate-300'>{item.content}</p>
        </div>
        <div className='max-sm:hidden'>
          <Image src={item.imgurl} height={'200px'}  />
        </div>
      </div>)}

      <div className='w-full'>
        <p className='text-center text-xl sm:text-3xl capitalize  font-semibold font-serif text-slate-700 dark:text-slate-300'>we aims to</p> 
        <div ref={horizontalScrollRef} className='no-scrollbar flex w-full sm:w-4/5 flex-nowrap overflow-x-scroll snap-both scroll-smooth mx-auto h-[250px] sm:h-[350px] select-none'>
          {aims.map((item, ind) => <div key={ind + 1} className={`w-full h-full flex-none snap-center grid place-items-center `}>
            <div className={`flex flex-col gap-2 justify-center  h-[220px] sm:h-[300px] w-[250px] md:w-[320px] flex-shrink-0 rounded-lg p-2 sm:p-4 ${ind % 2 === 0 ? 'dark:bg-slate-900 bg-slate-50' : 'bg-slate-100 dark:bg-slate-950'}`}>
              <p className='text-xl sm:text-2xl capitalize'>{item.title}</p>
              <p className='text-xs sm:text-sm'>{item.description}</p>
            </div>
          </div>)}
        </div>
      </div>
    </section>
  )
}

export default HeroSection