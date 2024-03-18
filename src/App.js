import './App.css';
import Main from './Pages/Main';
import { useEffect } from 'react';


function App() {

  const google = window.google;

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential)

  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "1007978692269-ibkqmt2j6u7qkucitno2gr9n31fpljnk.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("sign-in-div"),
      { theme: "outline", size: "large"}
    )
  }, [])

  return (
    <div class="app">

      <Main></Main>
      <div id="sign-in-div"></div>
    </div>
  );
}

export default App;
