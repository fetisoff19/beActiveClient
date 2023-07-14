import React from 'react';
import { Cycling, Fitness, Hiking, Other, Running, Training, Walking} from '@components/UI/svgComponents/Sports'

const SportsIcon = ({sport, fill, height, width, className}) => {
  const sportIcon =
   sport === 'cycling'
      ? <Cycling fill={fill} height={height} width={width}/>
      : sport === 'running'
        ?  <Running fill={fill} height={height} width={width}/>
        : sport === 'walking' ? <Walking fill={fill} height={height} width={width}/>
          : sport === 'hiking' ? <Hiking fill={fill} height={height} width={width}/>
            : sport === 'fitness' ? <Fitness fill={fill} height={height} width={width}/>
              :sport === 'training' ? <Training fill={fill} height={height} width={width}/>
              : <Other fill={fill} height={height} width={width}/>

  return (
    <div className={className}>
      {sportIcon}
    </div>
  );
};

export default SportsIcon;