import React from 'react';
import '../styles/RightPart.css'

function RightPart(time) {


    function today(){
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const today = new Date();
        const dayOfWeek = daysOfWeek[today.getDay()];

        return dayOfWeek;
    }
    

    return (
        <div class="rightpart" style={{ backgroundImage: `url(${time.time.img})` }}>
           <div id="today">
            <div id="weather_today">
                <p>{today()}</p>
                <p>{time.time.temp}</p>
                <p>{time.time.city}</p>
            </div>
            <div id="timeleft">
                <p>{time.time.days}</p>
                <p>{time.time.hours}</p>
                <p>{time.time.minutes}</p>
                <p>{time.time.seconds}</p>
            </div>
        </div>
    </div> 
    )

}
export default RightPart;