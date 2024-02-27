import React from 'react';
import '../styles/Footer.css'

function Footer({containers}) {
    return (
        <footer>
            <h3>Week</h3>
            <div class="week">
            {containers.map((container, index) => (
        <div key={index} >
          <img src={container.imgurl}  />
          <p> {container.date.toString()}</p>
          <p> {container.temp.toString()}</p>
          
          {/* и т.д. */}
          
        </div>
      ))}
    </div>
            
        </footer>
    )
}

export default Footer;