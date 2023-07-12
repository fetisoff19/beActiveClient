import React, {useRef} from 'react';

const ModalTransparent = ({content, className, setState}) => {
  const ref = useRef()

  function handleClick(e){
    e.stopPropagation();
    e.target === ref.current && setState && setState(prev => !prev)
  }

  return (
    <div
      onClick={handleClick}
      ref={ref}
      className={'modalBackground ' + className}>
      {content}
    </div>
  );
};

export default ModalTransparent;