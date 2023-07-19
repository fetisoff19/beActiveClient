import React from 'react'

const Fitness = ({ height, width, fill, className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={className}
         fill={fill || 'black'}
         width={width || '24px'}
         height={height || '24px'}
         viewBox="0 0 15 15">
      <path id="daec40ff-71f5-4432-9d75-dcba7b9c1b89"
            d="M14.5,7V8h-1v2h-1v1H11V8H4v3H2.5V10h-1V8H.5V7h1V5h1V4H4V7h7V4h1.5V5h1V7Z"/>
    </svg>
  )
}

export default Fitness
