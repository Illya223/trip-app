import React,{useState} from 'react';
import '../styles/BasePart.css'
import Header from './Header';
import MyButton from './MyButton';
import MyForm from '../MyForm';
import Body from './Body'
import Footer from './Footer';


function BasePart({containertime= () => {}}) {
    const [showModal, setShowModal] = useState(false);
    const [containers, setContainers] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [timeData,settimeData ] = useState([]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  function handleSave(formData){
    console.log(formData)
     setContainers((prevContainers) => [
        ...prevContainers,
        { selectedCapital: formData.selectedCapital, start_date: formData.start_date, end_date: formData.end_date}
       ]);
     }
     function GetWeather(weather){
      console.log(weather)
      setWeatherData(weather);
     }
     function GetTime(time){
      
      containertime(time)
     }


    return (
        <div class="basepart">
        <Header></Header>
        <div class="base">
          
        <Body containers={containers} GetWeather={GetWeather} GetTime={GetTime}></Body>
        <MyButton onClick={handleToggleModal}></MyButton>
        <MyForm showModal={showModal} handleClose={handleToggleModal} onSave={handleSave}/>
        </div>
        <Footer containers={weatherData}></Footer>
        </div>
    )
}

export default BasePart;