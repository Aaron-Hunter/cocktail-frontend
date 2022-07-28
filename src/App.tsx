import { useState } from 'react';
import axios from "axios";
import './App.css';

console.log(process.env.REACT_APP_COCKTAIL_API_KEY);

function App() {
  //Declare state variable for name of cocktail
  const [cocktailName, setCocktailName] = useState("");

  const COCKTAIL_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/";

  return (
    <div>
      <h1>Cocktail Recipe Search</h1>

      {/*user input for cocktail search*/}
      <div>
        <label>Cocktail Search</label><br/>
        <input type="text" name="cocktail-name" onChange={e => setCocktailName(e.target.value)}/>
        <button onClick={search}>Search</button>
        <button onClick={random}>Random Cocktail</button>
      </div>
    </div>
  );

  function search() {
    axios.get(COCKTAIL_BASE_URL + process.env.REACT_APP_COCKTAIL_API_KEY + "/search.php?s=" + cocktailName).then((res) => {
      console.log(res.data);
    })
  }

  function random() {
    axios.get(COCKTAIL_BASE_URL + process.env.REACT_APP_COCKTAIL_API_KEY + "/random.php").then((res) => {
      console.log(res.data);
    })
  }
}

export default App;
