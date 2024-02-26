import React, { useState, useEffect} from 'react';
import '../styles/Body.css'
import MyForm from '../MyForm';

function Body({containers}){
    
  const [imageUrls, setImageUrls] = useState([]);

  
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
     

    return (
        <div className="horizontal-scroll-container">
        <div className="content">
        <div>
        
      
      {containers.map((container, index) => (
        <div key={index}>
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