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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

type Cocktail = {
  [key: string]: string;
  idDrink: string;
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
  //Declare state variables for name and data of cocktail
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailData, setCocktailData] = useState<null | undefined | any>(undefined);

  const COCKTAIL_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/";

  //Declare arrays of each measure and ingredient variable name so we can loop through them when generating the UI
  const measures = ["strMeasure1", "strMeasure2", "strMeasure3", "strMeasure4", "strMeasure5", "strMeasure6", "strMeasure7", "strMeasure8", "strMeasure9", "strMeasure10", "strMeasure11", "strMeasure12", "strMeasure13", "strMeasure14", "strMeasure15"];
  const ingredients = ["strIngredient1", "strIngredient2", "strIngredient3", "strIngredient4", "strIngredient5", "strIngredient6", "strIngredient7", "strIngredient8", "strIngredient9", "strIngredient10", "strIngredient11", "strIngredient12", "strIngredient13", "strIngredient14", "strIngredient15"]
  
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Cocktail Recipe Search</h1>

      {/**user input for cocktail search*/}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField id="search-bar" value={cocktailName} onChange={(e: any) => {setCocktailName(e.target.value);}} label="Enter a cocktail name..." variant="outlined" size="small"/>
        <Button onClick={() => {search();}}>
          <SearchIcon style={{ fill: "blue" }} />
          Search
        </Button>
        <Button onClick={() => {random();}}>
          Random Cocktail
        </Button>
      </div><br />
      
      {/**output display for cocktail data*/}
      <Box>
        {cocktailData === undefined ? (
          <TableContainer component={Paper} sx={{backgroundColor: "#D4AE87"}}>
            <Table sx={{ minWidth: 650, maxWidth: "90%", marginLeft: "auto", marginRight: "auto" }} aria-label="cocktail-recipes">
              <TableHead>
                <TableRow sx={{backgroundColor: "#FAEDCD"}}>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer component={Paper} sx={{backgroundColor: "#D4AE87"}}>
            {cocktailData === null || cocktailData.drinks === null ? (
              <Table sx={{ minWidth: 650, maxWidth: "90%", marginLeft: "auto", marginRight: "auto" }} aria-label="cocktail-recipes">
                <TableHead>
                  <TableRow sx={{backgroundColor: "#FAEDCD"}}>
                    <TableCell align="center" sx={{fontWeight: "bold"}}>Cocktail not found</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            ) : (
              <Table sx={{ minWidth: 650, maxWidth: "90%", marginLeft: "auto", marginRight: "auto" }}>
                {cocktailData.drinks.map((drink: Cocktail) => (
                  <TableBody key={drink.idDrink}>
                    <TableRow sx={{backgroundColor: "#FAEDCD"}}>
                      <TableCell colSpan={3} align="center" sx={{fontWeight: "bold"}}>{drink.strDrink}</TableCell>
                    </TableRow>
                    <TableRow sx={{backgroundColor: "#FEFAE0"}}>
                      <TableCell rowSpan={19} sx={{width: 400}}><img src={drink.strDrinkThumb} style={{maxWidth: "100%", height: "auto"}}/></TableCell>
                      <TableCell></TableCell>
                      <TableCell><strong>Type: </strong>{drink.strAlcoholic}</TableCell>
                    </TableRow>
                    <TableRow sx={{backgroundColor: "#FEFAE0"}}>
                      <TableCell></TableCell>
                      <TableCell><strong>Preferred glass: </strong>{drink.strGlass}</TableCell>
                    </TableRow>
                    <TableRow sx={{backgroundColor: "#FEFAE0"}}>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow sx={{backgroundColor: "#FEFAE0"}}>
                      <TableCell></TableCell>
                      <TableCell sx={{fontWeight: "bold"}}>Ingredients</TableCell>
                    </TableRow>
                    {measures.map((measure: string, index) => (
                      drink[measure] === null ? (
                        <TableRow key={measure} sx={{backgroundColor: "#FEFAE0"}}></TableRow>
                      ): (
                        <TableRow key={measure} sx={{backgroundColor: "#FEFAE0"}}>
                          <TableCell></TableCell>
                          <TableCell>{drink[measure]} {drink[ingredients[index]]}</TableCell>
                        </TableRow>
                      )
                    ))}
                    <TableRow sx={{backgroundColor: "#FEFAE0"}}>
                      <TableCell colSpan={3}>{drink.strInstructions}</TableCell>
                    </TableRow>
                  </TableBody>
                  ))}
              </Table>
            )}
          </TableContainer>
        )}
      </Box>
      
    </div>
  );

  function search() {
    if(cocktailName === "") {
      setCocktailData(null);
    } else {
      axios.get(COCKTAIL_BASE_URL + process.env.REACT_APP_COCKTAIL_API_KEY + "/search.php?s=" + cocktailName).then((res) => {
        setCocktailData(res.data);
      });
    }
  }

  function random() {
    axios.get(COCKTAIL_BASE_URL + process.env.REACT_APP_COCKTAIL_API_KEY + "/random.php").then((res) => {
      setCocktailData(res.data);
      
    });
    
  }
}

export default App;
