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
  

  //We make an API request to get the names of the capitals 
  //of all countries of the world for a drop-down list
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
  

    
// We receive and send data from the form for adding a trip
  const handleAdd = () => {
    
        if (formData.selectedCapital && formData.start_date && formData.end_date) {
        
        if (typeof onSave === 'function') {
          onSave(formData); 
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

// Close form
  const handleCancel = () => {
    
    handleClose();

    clearFormInputs()
  };

  // Clear inputs 
  const clearFormInputs = () => {
    setFormData({
      selectedCapital: '',
       start_date: formData.start_date ,
       end_date: formData.end_date
    });
  };

  // Filtering and sorting the list of capitals by entered text
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    
    const filtered = capitals.filter(capital =>
      capital.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCapitals(filtered);
  };

  //Add name of city
  const handleSelect = (capital) => {
        setFormData({ ...formData, selectedCapital: capital });
        setShowDropdown(false);
  };

  // Show dropdown list
  const handleInputClick = () => {
        setShowDropdown(true);

  };

  // Add start dates
  const handleStartDateChange = (date) => {
          setFormData({ ...formData, start_date: date.toString() });
          // Если уже выбрана конечная дата и новая начальная дата позже, сбросим конечную дату
          if (formData.end_date && date > formData.end_date) {
            setFormData({ ...formData, end_date: null });
          }
        };

        // Add end dates 
        const handleEndDateChange = (date) => {
          setFormData({ ...formData, end_date: date.toString() });
          // Если уже выбрана начальная дата и новая конечная дата раньше, сбросим начальную дату
          if (formData.start_date && date < formData.start_date) {
            setFormData({ ...formData, start_date: null });
          }
  };

  // Get the current date
  const currentDate = new Date();
  // Get the next day after the current date
  const nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  // Add 15 days to the current date
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
          <div className="dropdown-list"> {}
            {filteredCapitals.map((capital, index) => (
              <div
                key={index}
                className="dropdown-list-item" 
                onClick={() => handleSelect(capital)}
              >
                <MdLocationCity className="icon" /> {}
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