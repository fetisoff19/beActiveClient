import React from 'react'

// eslint-disable-next-line react/prop-types
const Walking = ({ height, width, fill, className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={className}
         fill={fill || 'black'}
         width={width || '24px'}
         height={height || '24px'}
         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.1 3A2.2 2.2 0 1 1 12 4.9 1.899 1.899 0 0 1 10.1 3zm6.257 13.26l-2.425-3.377-.293-5.403c-.067-1.287-1.823-1.449-3.401-1.579-.945 1.6-2.48 4.575-3.125 5.838a.721.721 0 0 0 .265.942.74.74 0 0 0 1.033-.264l2.104-3.72.258 4.338 3.47 4.144 1.724 4.858a1.088 1.088 0 0 0 2.081-.496.953.953 0 0 0-.03-.202c-.03-.113-1.66-5.078-1.66-5.078zm-6.014-2.18l1.581 1.887-.335 1.588-3.227 4.285a1.087 1.087 0 1 1-1.808-1.2l3.065-4.285zM18 10.936a.881.881 0 0 1-.824 1.51c-.611-.37-2.35-1.536-2.35-1.536l-.104-1.926z"/>
      <path fill="none" d="M0 0h24v24H0z"/>
    </svg>
  )
}

export default Walking
