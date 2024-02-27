import React, { useState, useEffect} from 'react';
import '../styles/Body.css'
import MyForm from '../MyForm';

function Body({containers,GetWeather= () => {},GetTime= () => {}}){
 
  const [imageUrls, setImageUrls] = useState([]);
  const [weatherData, setWeatherData] = useState({});



  
  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        containers.map(async (container) => {
          try {
            const imageUrl = await fetchCityImageUrl(container.selectedCapital);
            return imageUrl;
          } catch (error) {
            console.error(`Error fetching image for ${container.selectedCapital}:`, error);
            return null;
          }
        })
      );
      setImageUrls(urls.filter(url => url !== null));
    };

    fetchImageUrls();
  }, [containers]);


const fetchCityImageUrl = async (cityName) => {
  try {
    // Замените 'YOUR_ACCESS_KEY' на ваш ключ доступа к API Unsplash
    

    // Формируем URL запроса к Unsplash API
    const url = `https://api.unsplash.com/search/photos?query=${cityName}&client_id=dfYcAvBAyBxUN4ipm3jFctIvNjwS79PsPaAD5Ug_KEo`;

    // Отправляем GET-запрос к Unsplash API
    const response = await fetch(url);
    const data = await response.json();

    // Проверяем, есть ли результаты по запросу
    if (data.results && data.results.length > 0) {
        // Возвращаем URL первой картинки из результатов поиска
        var res = data.results[1].urls.regular.toString();
        return res;

    } else {
        throw new Error('Картинка не найдена');
    }
} catch (error) {
    console.error('Ошибка получения картинки:', error);
    return null;
}
};
var timer ;
function timer(city){

  if (timer) {
    clearInterval(timer); // Останавливаем предыдущий таймер с этим именем
  }


  timer = setInterval(() => {
    console.log(city)
  },1000)
  
}


function fetchWeather  (city,date1,date2, timerName){
  /*const apiKey = 'MKQMY8TS86VELA2ADT7G3MJF7'; // Замените на ваш API ключ
  const Date1 = date1.toISOString().slice(0, 10);
  const Date2 = date2.toISOString().slice(0, 10);
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${Date1}/${Date2}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setWeatherData(prevState => ({
      ...prevState,
      [city]: data
    }));
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }*/

  
  
  const targetDate = new Date(date1).getTime();

  if (timer) {
    clearInterval(timer); // Останавливаем предыдущий таймер с этим именем
  }

  timer = setInterval(() => {
   /* const currentDate1 = new Date().getTime();
    const distance = targetDate - currentDate1;

    // Вычисляем дни, часы, минуты и секунды
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const time = {'days':days,
     'hours': hours,
      'minutes':minutes,
      'seconds':seconds
    }
    if (distance <= 0) {
      clearInterval(timer); // Останавливаем таймер при завершении
      
    }
    GetTime(time)*/

    console.log(city)
     
  
  }, 1000);

  const dateArray = [];
  const currentDate = new Date(date1);

  while (currentDate <= date2) {
    dateArray.push({ date: new Date(currentDate),
      temp: 10,
      imgurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Wikinews_weather.png/280px-Wikinews_weather.png"
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log(dateArray);



    GetWeather(dateArray);
};

const handleClick = (city, startDate, endDate) => {
  fetchWeather(city, startDate, endDate);
};

    return (
        <div className="horizontal-scroll-container">
        <div className="content">
        <div>
        
      
      {containers.map((container, index) => (
        <div key={index} onClick={ () => timer(container.selectedCapital)}>
          <img src={imageUrls[index]} alt={`City ${index + 1}`} />
          <p> {container.selectedCapital}</p>
          <p> {container.start_date.toString()}</p>
          <p> {container.end_date.toString()}</p>
          {/* и т.д. */}
          
        </div>
      ))}
    </div>
       
        </div>
      </div>
    )
}

export default Body;