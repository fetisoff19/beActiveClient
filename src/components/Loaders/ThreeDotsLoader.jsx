import React from 'react';
import {ThreeDots} from "react-loader-spinner";
import variables from '../DashboardContent/styles.module.scss'

const ThreeDotsLoader = ({className}) => {

  return (
    <div className={'appLoader ' + className}>
      <ThreeDots
        height="50"
        width="50"
        radius="9"
        color={variables.appColor}
        ariaLabel="three-dots-loading"
        wrapperClassName="ThreeDotsLoader"
        wrapperClass='ThreeDotsLoader'
        visible={true}
      />
    </div>
  );
};

export default ThreeDotsLoader;