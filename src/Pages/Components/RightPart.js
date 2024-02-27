import React from 'react';
import '../styles/RightPart.css'

function RightPart(time) {


    
       
       
    
    return (
        <div>
            <p>{time.time.days}</p>
            <p>{time.time.hours}</p>
            <p>{time.time.minutes}</p>
            <p>{time.time.seconds}</p>
        </div>
    )

}
export default RightPart;