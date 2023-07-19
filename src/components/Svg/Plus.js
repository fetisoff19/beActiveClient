import React from 'react'

const Plus = ({ height, width, fill, className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={className}
         fill="none"
         width={width || '20px'}
         height={height || '20px'}
         viewBox="0 0 20 20">
      <path fill={fill || 'black'} fillRule="evenodd"
            d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"/>
    </svg>
  )
}

export default Plus
