import React from 'react'
import Delete from '../../Svg/Delete'
import Ok from '../../Svg/Ok'
import AppLoader from '../../Loaders/AppLoader'

const VerifiedFile = ({ files, setFiles, name, className, index, ok, buttonClick }) => {
  function deleteFile () {
    setFiles([...files?.slice(0, index),
      ...files?.slice(index + 1)])
  }

  return (
    <div className={className}>
      <div>
        {name}
      </div>
      <div>
        {ok
          ? <Ok fill={'green'}/>
          : buttonClick
            ? <AppLoader height={'20'} width={'20'}/>
            : <div onClick={deleteFile}>
              <Delete/>
            </div>}
      </div>
    </div>
  )
}

export default VerifiedFile

// : <div onClick={() => setState(prev =>
//   ({...prev, validate: [...validatedFiles.validate.slice(0, index),
//       ...validatedFiles.validate.slice(index + 1)]}))}>
