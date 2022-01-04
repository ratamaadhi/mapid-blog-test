import React from 'react'

function MainContainer({children, ...props}) {
  return (
    <div className='relative w-[720px] max-w-[80vw] mx-auto mb-[200px]'>
      {children}
    </div>
  )
}

export default MainContainer
