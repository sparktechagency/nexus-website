import React from 'react'

const commonStyle = () => {
  return (
    <div>
      <h1 className='md:text-2xl'>Title</h1>

      <p>paragraph</p>






      <button className='w-[170px] md:w-[200px] mt-4 md:mt-0 md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200'>click</button>



      {/* max-w-[40vh] */}
      <p>  md:!max-w-[60vw] xl:!max-w-[40vw]   </p>
    </div>
  )
}

export default commonStyle
