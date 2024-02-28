import React from 'react';
import '../styles/Footer.css'

function Footer({containers}) {

  console.log(containers)

  function fetchicon(city,daydate){
    const cityName = city; // Название города // Ваш API ключ от OpenWeatherMap // Название города
const date = daydate; // Дата, на которую вы хотите получить данные о погоде
const apiKey = "e2c730b2b5b2a1900fa6c13cb1cc163a"; // Ваш API ключ от OpenWeatherMap

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Находим данные о погоде на указанную дату
    const weatherData = data.list.find(item => item.dt_txt.includes(date));
    
      const iconCode = weatherData.weather[0].icon; // Код иконки погоды
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // URL иконки погоды
      console.log(iconUrl) ;
      return iconUrl;
    
  })
  .catch(error => {
    console.error('Ошибка при получении данных о погоде:', error);
  });
  
  }

    return (
        <footer>
          
            <h3>Week</h3>
            <div className="horizontal-scroll-container weather">
              <div class="week">
            {containers.map((container, index) => (
        <div key={index}  class="tripday">
          <img src={fetchicon(container.name,container.datetime)} class="weatherimg" />
          <p> {container.datetime}</p>
          <p> {container.temp}</p>
          
          {/* и т.д. */}
          
        </div>
      ))}
    </div>
            </div>
        </footer>
    )
}

export default Footer;