import React from 'react';
import '../styles/DeleteButton.css'

const DeleteButton = ({ onClick }) => {
    return (
        <button class="deletebutton" onClick={onClick}>Delete</button>
    );
};

export default DeleteButton;
