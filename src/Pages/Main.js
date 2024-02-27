import React, { useState } from 'react';
import BasePart from './Components/BasePart';
import RightPart from './Components/RightPart';
import './styles/Main.css'

function Main() {
  const [timeData,settimeData ] = useState([]);

  function get(time){
    
    settimeData(time)
  }

 
  return (
    <div className="app">
      <BasePart containertime={get}></BasePart>
        <RightPart time={timeData}></RightPart>


    </div>
  );
}

export default Main;
