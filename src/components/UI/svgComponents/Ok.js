import React from 'react';

const Ok = ({height, width, fill, className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={className}
         fill={fill || 'black'}
         width={width || '20px'}
         height={height || '20px'}
         viewBox="0 0 32 32">
      <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 22.28125 11.28125 L 15 18.5625 L 10.71875 14.28125 L 9.28125 15.71875 L 14.28125 20.71875 L 15 21.40625 L 15.71875 20.71875 L 23.71875 12.71875 Z"/>
    </svg>
  )
};

export default Ok;