import React,{useState, useEffect, useRef} from 'react';
import './styles/MyForm.css' ;
import { MdLocationCity } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateInput from './Components/DateInput';



function MyForm({ showModal, handleClose,onSave = () => {}}) {
  const [formData, setFormData] = useState({ selectedCapital: '', start_date: '' ,end_date: ''});
  const [capitals, setCapitals] = useState([]);
  const [filteredCapitals, setFilteredCapitals] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [formError, setFormError] = useState(false);
  

  
  useEffect(() => {
    
      var username = 'illya';
      fetch(`http://api.geonames.org/searchJSON?q=capital&maxRows=1000&username=${username}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Обработка полученных данных
    const capitals = data.geonames.map(capital => capital.name);
    setCapitals(capitals);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

    
  }, []);

  const formRef = useRef(null);

  const handleChange = (event) => {
    const { name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

    

  const handleAdd = () => {
    //onSave(formData);
    // Очищаем форму после добавления данных
    if (formData.selectedCapital && formData.start_date && formData.end_date) {
    
    if (typeof onSave === 'function') {
      onSave(formData); // Вызов функции onSave из пропсов, если она является функцией
    }
    setFormData({
      selectedCapital: '',
      start_date: formData.start_date ,
       end_date: formData.end_date
        
    });
    setFormError(false);
  }else{
  setFormError(true)
  alert('Please fill in the fields');
}
  };

  const handleCancel = () => {
    // Закрываем форму без сохранения данных
    handleClose();

    clearFormInputs()
  };

  const clearFormInputs = () => {
    // Очищаем значения инпутов вручную
    setFormData({
      selectedCapital: '',
       start_date: formData.start_date ,
       end_date: formData.end_date
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Фильтрация и сортировка списка столиц по введенному тексту
    const filtered = capitals.filter(capital =>
      capital.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCapitals(filtered);
  };

  const handleSelect = (capital) => {
    setFormData({ ...formData, selectedCapital: capital });
    setShowDropdown(false);
  };

  const handleInputClick = () => {
    setShowDropdown(true);

  };
  const handleStartDateChange = (date) => {
    setFormData({ ...formData, start_date: date });
    // Если уже выбрана конечная дата и новая начальная дата позже, сбросим конечную дату
    if (formData.end_date && date > formData.end_date) {
      setFormData({ ...formData, end_date: null });
    }
  };

  const handleEndDateChange = (date) => {
    setFormData({ ...formData, end_date: date });
    // Если уже выбрана начальная дата и новая конечная дата раньше, сбросим начальную дату
    if (formData.start_date && date < formData.start_date) {
      setFormData({ ...formData, start_date: null });
    }
  };

  // Получаем текущую дату
  const currentDate = new Date();
  // Получаем следующий день после текущей даты
  const nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  // Добавляем 15 дней к текущей дате
  const maxDate = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000);

  
  
  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
      <div className="modal-header">
        <h2>Create trip</h2>
          <span className="close" onClick={handleClose}>&times;</span>
        </div>
        <div className="modal-body">

                  <form ref={formRef} >
                    <label >City</label>
                    <div className="dropdown-container">
                    <input 
                    type="text"
                    id="selectedCapital"
                    name="selectedCapital"
                    value={formData.selectedCapital}
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                    placeholder="Select city"
                    className="dropdown-select"/>

{showDropdown && (
          <div className="dropdown-list"> {/* Применяем класс стиля для списка */}
            {filteredCapitals.map((capital, index) => (
              <div
                key={index}
                className="dropdown-list-item" // Применяем класс стиля для элемента списка
                onClick={() => handleSelect(capital)}
              >
                <MdLocationCity className="icon" /> {/* Иконка */}
                {capital}
              </div>
            ))}
          </div>
        )}
      </div>

                    <label >Start date</label>
                    <DateInput selectedDate={formData.start_date} onChange={handleStartDateChange} minDate={nextDay} maxDate={maxDate} />
          
                    <label >End date</label>
                    <DateInput selectedDate={formData.end_date} onChange={handleEndDateChange} minDate={formData.start_date || nextDay} maxDate={maxDate}/>
                    
        </form>
        </div>
        <div className="modal-footer">
        <button type="submit" id="save" onClick={handleAdd}>Save</button>
          <button type="button" id="cancel" onClick={handleCancel}>Cancel</button>
        </div>
        
      </div>
      
    </div>
  );
}

export default MyForm;