import React,{useState,useEffect} from 'react';
import '../styles/BasePart.css'
import Header from './Header';
import MyButton from './MyButton';
import MyForm from '../MyForm';
import Body from './Body'
import Footer from './Footer';
import DeleteButton from './DeleteButton';


function BasePart({containertime= () => {}}) {
    const [showModal, setShowModal] = useState(false);
    const [containers, setContainers] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [timeData,settimeData ] = useState([]);
    const [cityName, setCityName] = useState(''); 




useEffect(() => {
    const storedContainers = JSON.parse(localStorage.getItem('containers')) || [];
    setContainers(storedContainers);
}, []);



  // When clicked, a form appears
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  // Receiving and sending data to a component for display
  function handleSave(formData){
          console.log(formData)
          setContainers((prevContainers) => [
              ...prevContainers,
              { selectedCapital: formData.selectedCapital, start_date: formData.start_date, end_date: formData.end_date}
            ]);
     }
    //  Receiving weather data
     function GetWeather(weather){
          console.log(weather)
          setWeatherData(weather);
     }
    // Transmission about the remaining time before the start of the trip
     function GetTime(time){
      
          containertime(time)
     }
     function GetcityName(Name){
        setCityName(Name)
        
     }

    

   // Удаление данных контейнера из localStorage
  /* const removeFromLocalStorage = (selectedContainer) => {
    const storedContainers = JSON.parse(localStorage.getItem('containers'));
    console.log(storedContainers);
    console.log(selectedContainer);
    const updatedStoredContainers = storedContainers.filter(container => container !== selectedContainer);
    console.log(updatedStoredContainers);
    localStorage.setItem('containers', JSON.stringify(updatedStoredContainers));
};*/




    return (
        <div class="basepart">
        <Header GetcityName={GetcityName}></Header>
        <div class="base">
          
        <Body containers={containers} GetWeather={GetWeather} GetTime={GetTime} cityname={cityName}></Body>
        <MyButton onClick={handleToggleModal}></MyButton>
        
        <MyForm showModal={showModal} handleClose={handleToggleModal} onSave={handleSave}/>
        </div>
        <Footer containers={weatherData}></Footer>
        </div>
    )
}

export default BasePart;