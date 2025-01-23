import React from 'react'
import {ColorRing, MagnifyingGlass, Rings, Watch, ThreeDots, Comment, } from 'react-loader-spinner'

function Fallback({loader}) {
    switch (loader) {
        case 'watch':
            return (
                <div className='w-dvw h-dvh grid place-items-center dark:bg-black'>
                    <Watch
                        visible={true}
                        height="50"
                        width="50"
                        radius="48"
                        color="dodgerblue"
                        ariaLabel="watch-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>)
        case 'rings': 
            return (
                <div className='w-dvw h-dvh grid place-items-center dark:bg-black'>
                    <Rings
                        visible={true}
                        height="50"
                        width="50"
                        color="dodgerblue"
                        ariaLabel="rings-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        />
                </div>
            )
        case 'magnifyingGlass': 
            return (
                <div className='w-full h-full grid place-items-center dark:bg-black'>
                    <MagnifyingGlass
                        visible={true}
                        height="50"
                        width="50"
                        ariaLabel="magnifying-glass-loading"
                        wrapperStyle={{}}
                        wrapperClass="magnifying-glass-wrapper"
                        glassColor="white"
                        color="dodgerblue"
                    />
                </div>
            )
        case 'colorRing': 
            return (
                <div className='w-full h-full grid place-items-center dark:bg-black'>
                    <ColorRing
                        visible={true}
                        height="50"
                        width="50"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
            )
        case 'threeDots': 
            return (
                <div className='w-full h-full grid place-items-center bg-transparent'>
                    <ThreeDots
                        visible={true}
                        height="40"
                        width="40"
                        color="#00f"
                        radius="5"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )
        case 'comment': 
            return (
                <div className='w-full h-full grid place-items-center bg-transparent'>
                    <Comment
                        visible={true}
                        height="20"
                        width="20"
                        ariaLabel="comment-loading"
                        wrapperStyle={{}}
                        wrapperClass="comment-wrapper"
                        color="#fff"
                        backgroundColor="#F4442E"
                    />
                </div>
            )
        default:
            break;
    }
  return (
    <div >        
        <p>loader</p>
    </div>
  )
}

export default Fallback