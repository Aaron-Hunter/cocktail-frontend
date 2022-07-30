import { useState } from 'react';
import axios from "axios";
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App() {
  //Declare state variable for name of cocktail
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailData, setCocktailData] = useState<null | undefined | any>(undefined);

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
      
      {/**output display for cocktail data */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} aria-label="cocktail-recipes">
          <TableHead>
              {cocktailData === undefined ? (
                <TableRow><TableCell></TableCell></TableRow>
              ) : (
                <TableRow>{cocktailData === null ? (
                  <TableCell>Cocktail not found</TableCell>
                ) : (
                  <TableCell align="center" colSpan={2}>{cocktailData.drinks[0].strDrink} Recipes</TableCell>
                )}</TableRow>
              )}
          </TableHead>
          <TableBody>
            {cocktailData.drinks.map((drink: any) => (
              <TableRow key={drink.strDrink}>
                <TableCell>{drink.strDrink}</TableCell>
                <TableCell>Type: {drink.strAlcoholic}</TableCell>
                <TableCell>Preferred glass: {drink.strGlass}</TableCell>
                <TableCell><img src={drink.strDrinkThumb}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
    </div>
  );

  function search() {
    axios.get(COCKTAIL_BASE_URL + process.env.REACT_APP_COCKTAIL_API_KEY + "/search.php?s=" + cocktailName).then((res) => {
      setCocktailData(res.data);
    });
    
  }

  function random() {
    axios.get(COCKTAIL_BASE_URL + process.env.REACT_APP_COCKTAIL_API_KEY + "/random.php").then((res) => {
      setCocktailData(res.data);
      
    });
    
  }
}

export default App;
