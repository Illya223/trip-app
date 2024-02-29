import React,{useState,useEffect} from 'react';
import '../styles/Footer.css'

function Footer({containers}) {

  const [icons, seticons] = useState([]);

  console.log(containers)
useEffect(() =>{
  const fetchIconData = async(city,daydate) => {
    const cityName = city; // Название города // Ваш API ключ от OpenWeatherMap // Название города
const date = daydate; // Дата, на которую вы хотите получить данные о погоде
const apiKey = "e2c730b2b5b2a1900fa6c13cb1cc163a"; // Ваш API ключ от OpenWeatherMap


//`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
try {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`);
  const data = await response.json();
  const weatherData = data.list.find(item => item.dt_txt.includes(date));
  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  return iconUrl;
} catch (error) {
  console.error('Ошибка при получении данных о погоде:', error);
  return null;
}
  
}
const iconsPromises = containers.map(container => {
  if (container.name && container.datetime) {
    return fetchIconData(container.name, container.datetime);
  } else {
    return null;
  }
}).filter(Boolean); 
  
console.log(iconsPromises);
Promise.all(iconsPromises)
  .then(iconUrls => {
    // Обработка полученных URL иконок
    console.log(iconUrls);
    seticons(iconUrls);
  });

  },[containers])
  
    return (
        <footer>
          
            <h3>Week</h3>
            <div className="horizontal-scroll-container weather">
              <div class="week">
            {containers.map((container, index) => (
        <div key={index}  class="tripday">
          <img src={icons[index]} class="weatherimg" />
          <p> {container.datetime}</p>
          <p class="degree_count foot" > {container.temp}<div class="degree1">&deg;C</div></p>
          
          {/* и т.д. */}
          
        </div>
      ))}
    </div>
            </div>
        </footer>
    )
}

export default Footer;