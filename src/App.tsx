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
import Box from '@mui/material/Box';

type Cocktail = {
  [key: string]: string;
  strDrink: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strCreativeCommonsConfirmed: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
}

function App() {
  //Declare state variable for name of cocktail
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailData, setCocktailData] = useState<null | undefined | any>(undefined);

  const COCKTAIL_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/";
  const measures = ["strMeasure1", "strMeasure2", "strMeasure3", "strMeasure4", "strMeasure5", "strMeasure6", "strMeasure7", "strMeasure8", "strMeasure9", "strMeasure10", "strMeasure11", "strMeasure12", "strMeasure13", "strMeasure14", "strMeasure15"];
  const ingredients = ["strIngredient1", "strIngredient2", "strIngredient3", "strIngredient4", "strIngredient5", "strIngredient6", "strIngredient7", "strIngredient8", "strIngredient9", "strIngredient10", "strIngredient11", "strIngredient12", "strIngredient13", "strIngredient14", "strIngredient15"]
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
        <Table sx={{ minWidth: 650 }} aria-label="cocktail-recipes">
          <TableHead>
              {cocktailData === undefined ? (
                <TableRow><TableCell></TableCell></TableRow>
              ) : (
                <TableRow>{cocktailData === null ? (
                  <TableCell>Cocktail not found</TableCell>
                ) : (
                  <TableCell align="center" colSpan={2}>{cocktailData.drinks[0].strDrink} Recipe(s)</TableCell>
                )}</TableRow>
              )}
          </TableHead>
          {cocktailData === undefined || cocktailData === null ? (
            <TableBody></TableBody>
          ) : (
            <TableBody>
              {cocktailData.drinks.map((drink: Cocktail) => (
                <Box key={drink.strDrink}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{fontWeight: "bold"}}>{drink.strDrink}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell rowSpan={19} sx={{width: 400}}><img src={drink.strDrinkThumb} style={{maxWidth: "100%", height: "auto"}}/></TableCell>
                        <TableCell></TableCell>
                        <TableCell>Type: {drink.strAlcoholic}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Preferred glass: {drink.strGlass}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell sx={{fontWeight: "bold"}}>Ingredients</TableCell>
                      </TableRow>
                      {measures.map((measure: string, index) => (
                        drink[measure] === null ? (
                          <TableRow key={measure}></TableRow>
                        ): (
                          <TableRow key={measure}>
                            <TableCell></TableCell>
                            <TableCell>{drink[measure]} {drink[ingredients[index]]}</TableCell>
                          </TableRow>
                        )
                      ))}
                      <TableRow>
                        <TableCell colSpan={3}>{drink.strInstructions}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table> 
                </Box>
              ))}
            </TableBody>
          )}
          
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
