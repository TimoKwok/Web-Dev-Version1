import { React, useEffect, useState } from "react";
import axios from 'axios';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';

function Searched() {

  const [searchedRecipe, setSearchedRecipe] = useState([]);
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => //everytime the search screen is rendered, perform the following code, OR if the parameter in the search bar changes (getSearch)
  {
    const getSearch = (e) => 
    {
      //
      axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + params.term)//saying take the parameter from the url and append it to the http string
      //use what the api gives to us 
      .then(function (response) {
        console.log(response.data.meals)
        setSearchedRecipe(response.data.meals)
        if(response.data.meals == null)
        {
          setSearchedRecipe([]);
          const nullDisplay = document.getElementById('request-null');
          nullDisplay.classList.remove("hidden");
        }
        else
        {
          const showDisplay = document.getElementById("request-exists");
          showDisplay.classList.remove("hidden");
        }
      })
      .catch(function (error){
        console.log(error)
      })
    }
    getSearch() 

    //if the term changes in the url bar
  }, [params.term]) 



  return (
    <div>

      <div id='request-null' class='hidden centered landing-title'>
        <h1>Hmm...No Recipe Found</h1>
        <p1 class='simple-p1'>Try Searching For Chicken, Fish, Beef, Or Another Ingredient</p1>
      </div>
    
    <div id='request-exists' class='hidden'>

      <header class='search-header'>{params.term}
        <button onClick={() => navigate(-1)} class='return-button'>Return</button>
      </header>
      
      <div class='searched-body'> 
      
        <div class='searched-container'>
          {searchedRecipe.map((item) => { //since its given as an array, we want to iterate through the recipies and grab correct item(s)
            return(
              <div class='card' key={item.idMeal}>

              <div class = 'card-header'>
                <img src={item.strMealThumb} alt=""></img>
              </div>

            <div class='card-body'>
             <h1>{item.strMeal}</h1>
              <p>Meal Category: {item.strCategory}</p>
              <p>Meal Region: {item.strArea}</p>
              <p>Additional Information: {item.strTags}</p>


              <div class='tag-container'>
                <a class='tag' target='_blank' rel='noreferrer' href={item.strSource}>Recipe</a>
                <a class='tag' target='_blank' rel='noreferrer' href={item.strYoutube}>Video</a>
              </div>

            </div>
            


            </div>
          )

        })}
      </div>

      </div> 

    </div>
    </div>
  )
}

export default Searched