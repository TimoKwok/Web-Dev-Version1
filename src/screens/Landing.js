import React, { useState } from 'react';
import '../App.css';
import {useNavigate } from 'react-router-dom';

function Landing() {

  const [recipe,setRecipe] = useState("");
  const navigate = useNavigate();

  const submitForm = (event) =>
  {
    event.preventDefault();
    navigate('/recipe/' + recipe);
  }



  return (
    <div class='landing-body'>
      <div class='centered'>      
      <h1>Food Finder</h1>
      <p1>Type An Ingredient To Find Recipes!</p1>
      <form>
        <input onChange={(event) => {setRecipe(event.target.value);console.log(recipe) } }class='search-input' type='search' placeholder='Find a Recipe'></input>
          <button onClick={submitForm} class='submit-btn' type='submit'>Search</button>
      </form>

      </div>

    </div>
  )
}

export default Landing
