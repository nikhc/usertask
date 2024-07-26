
// const a={
//     b:"kjndsnjc",
//     c:"kjnkjn",
//     d:()=>{
//         return function(){
//             console.log(this)
//         }
//     }
// }
// console.log(a.d()())

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const A = () => {
  const bats = useSelector(state);
  const dispatch = useDispatch();

  const buyBat = () => {
    dispatch({ type: 'BUY_BAT' });
  };

  return (
    <div>
      {bats.bats}
      <button onClick={buyBat}>Buy Bat</button>
    </div>
  );
};

export default A;
