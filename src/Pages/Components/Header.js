import React from 'react';
import '../styles/Header.css'

function Header() {
    return (
        <header>
            <h2>Weather Forecast</h2>
            <input type="search"  placeholder="Search your trip"/>
        </header>
    )
}

export default Header;