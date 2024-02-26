import React from 'react';
import '../styles/MyButton.css'



function MyButton({ onClick }) {
    return <div className="my-button" onClick={onClick}>
        <div id="plus">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 24 24">
<path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
</svg></div>
        <p>Add trip</p>
        </div>
}

export default MyButton;