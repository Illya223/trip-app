import React,{useState} from 'react';
import '../styles/Header.css'


function Header({GetcityName= () => {}}) {
    const [searchName, setsearchName] = useState('');

    const handleInputChange = (event) => {
        setsearchName(event.target.value);
      }
      const handleClick = () => {
        GetcityName(searchName);
        
      }


    return (
        <header>
            <h2>Weather Forecast</h2>
            <input type="search" onChange={handleInputChange}  placeholder="Search your trip"/>
            <button onClick={handleClick}>search</button>
        </header>
    )
}

export default Header;