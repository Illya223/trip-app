import React, { useState, useEffect} from 'react';
import '../styles/Body.css'
import MyForm from '../MyForm';
import DeleteButton from './DeleteButton';

function Body({containers,GetWeather= () => {},GetTime= () => {}}){
 
  const [imageUrls, setImageUrls] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [timer, setTimer] = useState(null);
  const [localContainers, setLocalContainers] = useState([]);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  

  
  //console.log(JSON.parse(localStorage.getItem('containers')));

  useEffect(() => {
    console.log(currentIndex); // currentIndex уже будет обновленным
  }, [currentIndex]);


  useEffect(() => {
    const savedContainers = localStorage.getItem('containers');
    if (savedContainers) {
      const parsedContainers = JSON.parse(savedContainers);
      setLocalContainers(parsedContainers);
    }
  }, []); // Пустая зависимость, чтобы useEffect выполнился только при первом рендере

  // Обновление данных в localStorage при изменении containers
  useEffect(() => {
    setLocalContainers(prevContainers => {
      const updatedContainers = prevContainers.concat(containers);
      const uniqueContainers = removeDuplicates(updatedContainers);
      localStorage.setItem('containers', JSON.stringify(uniqueContainers));
      return uniqueContainers;
    });
  }, [containers]);

  //console.log(JSON.parse(localStorage.getItem('containers')));

  // Функция для удаления дубликатов
  const removeDuplicates = (arr) => {
    return arr.filter((value, index, self) => self.findIndex(item => item.selectedCapital === value.selectedCapital) === index);
  };

  // Generating an array of images for cities
  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        localContainers.map(async (container) => {
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
  }, [localContainers]);

 //console.log(JSON.parse(localStorage.getItem('containers')));

// Request for pictures for the city
const fetchCityImageUrl = async (cityName) => {
          try {
            
              const url = `https://api.unsplash.com/search/photos?query=${cityName}&client_id=dfYcAvBAyBxUN4ipm3jFctIvNjwS79PsPaAD5Ug_KEo`;

              
              const response = await fetch(url);
              const data = await response.json();

            
            if (data.results && data.results.length > 0) {
                
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





// Request for weather information while traveling
async function fetchDaysWeather(city,date1,date2){
      const apiKey = 'S8UPCXF2CS9X9KJCTA96EHGMJ';
      const Date1 = date1.toISOString();
      const Date2 = date2.toISOString();
      console.log(date1)
      
      const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${Date1}/${Date2}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          
          data.days.map((day,index) => {
            day.name = city;
          })
          GetWeather(data.days);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
}


// Request for weather data in the city today and
// start a timer keeping track of the time before the start of the trip
 async function fetchTime (city,date1,date2){

        const apiKey = 'S8UPCXF2CS9X9KJCTA96EHGMJ';
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
              
              console.log(data.days[0].temp);
              todaytemp = data.days[0].temp;
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
        
        const targetDate = new Date(date1).getTime();

        if (timer) {
          clearInterval(timer); 
        }

        const newTimer = setInterval(() => {
              const currentDate1 = new Date().getTime();
              const distance = targetDate - currentDate1;

              
              const days = Math.floor(distance / (1000 * 60 * 60 * 24));
              const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((distance % (1000 * 60)) / 1000);

              const time = {'days':days,
              'hours': hours,
                'minutes':minutes,
                'seconds':seconds,
                'img':"#241178",
                'temp': todaytemp,
                'city':city
              }
              if (distance <= 0) {
                clearInterval(timer); 
                
              }
              GetTime(time)

              console.log(city)
              setTimer(newTimer);
        
        }, 1000);

  
};


// Calling functions when you click on a block
const handleClick = (city, startDate, endDate,container,index) => {
      fetchTime(city, startDate, endDate)
      fetchDaysWeather(city, startDate, endDate)
      setSelectedContainer(container);
      
      setCurrentIndex(index);
      console.log(currentIndex)

};

// Converting date data
function ShowDate(currentDate){
      var date = new Date(currentDate);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;

}



// Функция для удаления выбранного контейнера
const handleDeleteClick = () => {
  console.log(selectedContainer);
  if (selectedContainer) {
      handleDelete(selectedContainer, localContainers);
      setSelectedContainer(null); // Сброс выбранного контейнера после удаления
  }
};


const handleDelete = (selectedContainer, localContainers) => {
  containers = containers.filter(container => container !== selectedContainer);
  
  const updatedContainers = localContainers.filter(container => container !== selectedContainer);
 
  localStorage.setItem('containers', JSON.stringify(updatedContainers));
  
  setLocalContainers(updatedContainers);
  window.location.reload();
  
 // removeFromLocalStorage(selectedContainer);
};

const handleNext = (ф) => {
  console.log(currentIndex);
 setCurrentIndex(); //% localContainers.length
  console.log(currentIndex);
  
  handleClick(localContainers[currentIndex].selectedCapital,new Date(localContainers[currentIndex].start_date.toString()),new Date(localContainers[currentIndex].end_date.toString()), localContainers[currentIndex],currentIndex)
};

const handlePrevious = () => {
  setCurrentIndex(prevIndex => (prevIndex - 1 + localContainers.length) % localContainers.length);
  console.log(localContainers[currentIndex]);
  handleClick(localContainers[currentIndex].selectedCapital,new Date(localContainers[currentIndex].start_date.toString()),new Date(localContainers[currentIndex].end_date.toString()), localContainers[currentIndex],currentIndex)
};



    return (
      <div>
        <div className="horizontal-scroll-container">
        <div className="content">
        
         <div class="container"  onClick={ () => handleClick('Kyiv',new Date('2024-03-07'), new Date('2024-03-09'))} onLoad={ () => handleClick('Kyiv',new Date('2024-03-07'), new Date('2024-03-09'))}>
          <img class="imgcity" src={'https://visitukraine.today/media/blog/previews/fAWjVMXYLXywGzneHknrh9tuBRtdH12vJjT5awRu.webp'} />
          <div class= "dates">
          <h3><b>City:  {'Kyiv'}</b></h3>
          <p>Start date:  {'3 марта 2024'}</p>
          <p>End date:  {'5 марта 2024'}</p>
          
          </div>
        </div>
      
      {localContainers.map((container, index) => (
        <div class="container" key={index} onClick={ () => handleClick(container.selectedCapital,new Date(container.start_date.toString()),new Date(container.end_date.toString()), container, index)} >
          <img class="imgcity" src={imageUrls[index]} alt={`City ${index + 1}`} />
          <div class= "dates">
          <h3><b>City:  {container.selectedCapital}</b></h3>
          <p> Start date:  {ShowDate(new Date(container.start_date.toString()))}</p>
          <p>End date:  {ShowDate(new Date(container.end_date.toString()))}</p>
          
          </div>
        </div>
      ))}
    
       
        </div>
<DeleteButton onClick={handleDeleteClick}></DeleteButton>
      </div>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
    )
}

export default Body;