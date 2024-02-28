import React, { useState, useEffect} from 'react';
import '../styles/Body.css'
import MyForm from '../MyForm';

function Body({containers,GetWeather= () => {},GetTime= () => {}}){
 
  const [imageUrls, setImageUrls] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [timer, setTimer] = useState(null);



  
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







 async function fetchTime (city,date1,date2){

  const apiKey = 'S8UPCXF2CS9X9KJCTA96EHGMJ';
  const Date1 = date1.toISOString();
  const Date2 = date2.toISOString();
  // Замените на ваш API ключ
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${Date1}/${Date2}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Обработка полученных данных о погоде
      data.days.map((day,index) => {
        day.name = city;
      })
       GetWeather(data.days);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });


  
  var todaytemp;

  const Url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

  fetch(Url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Обработка полученных данных о погоде
      console.log(data.days[0].temp);
      todaytemp = data.days[0].temp;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  
  const targetDate = new Date(date1).getTime();

  if (timer) {
    clearInterval(timer); // Останавливаем предыдущий таймер с этим именем
  }

  const newTimer = setInterval(() => {
    const currentDate1 = new Date().getTime();
    const distance = targetDate - currentDate1;

    // Вычисляем дни, часы, минуты и секунды
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const time = {'days':days,
     'hours': hours,
      'minutes':minutes,
      'seconds':seconds,
      'img':"https://i.pinimg.com/736x/bf/d7/73/bfd773ea1e375a92cabb75263028d9c3.jpg ",
      'temp': todaytemp,
      'city':city
    }
    if (distance <= 0) {
      clearInterval(timer); // Останавливаем таймер при завершении
      
    }
    GetTime(time)

    console.log(city)
     setTimer(newTimer);
  
  }, 1000);
/*
  const dateArray = [];
  const currentDate = new Date(date1);

  while (currentDate <= date2) {
    var date = new Date(currentDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    dateArray.push({ date: `${day} ${month} ${year}`,
      temp: 10,
      imgurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Wikinews_weather.png/280px-Wikinews_weather.png"
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log(dateArray);
   */
  
};



const handleClick = (city, startDate, endDate) => {
  fetchTime(city, startDate, endDate)
};

function ShowDate(currentDate){
  var date = new Date(currentDate);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();


  return `${day} ${month} ${year}`;

}


    return (
        <div className="horizontal-scroll-container">
        <div className="content">
        
         <div class="container"  onClick={ () => handleClick('Kyiv',new Date('2024-03-3'), new Date('2024-03-5'))}>
          <img class="imgcity" src={'https://visitukraine.today/media/blog/previews/fAWjVMXYLXywGzneHknrh9tuBRtdH12vJjT5awRu.webp'} />
          <div class= "dates">
          <h3><b>City:  {'Kyiv'}</b></h3>
          <p>Start date:  {'3 марта 2024'}</p>
          <p>End date:  {'5 марта 2024'}</p>
          {/* и т.д. */}
          </div>
        </div>
      
      {containers.map((container, index) => (
        <div class="container" key={index} onClick={ () => handleClick(container.selectedCapital,container.start_date,container.end_date)}>
          <img class="imgcity" src={imageUrls[index]} alt={`City ${index + 1}`} />
          <div class= "dates">
          <h3><b>City:  {container.selectedCapital}</b></h3>
          <p> Start date:  {ShowDate(container.start_date.toString())}</p>
          <p>End date:  {ShowDate(container.end_date.toString())}</p>
          {/* и т.д. */}
          </div>
        </div>
      ))}
    
       
        </div>
      </div>
    )
}

export default Body;