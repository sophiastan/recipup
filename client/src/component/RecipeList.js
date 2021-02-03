import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import GenerateAnother from '../images/generate-another-button.png';

class RecipeList extends Component {
  constructor(props) {
    super();

    // const ingredients = props.location.recipeProps.ingredients.slice(1).split(',');
    // const recipe = props.location.recipeProps.recipe;
    // for (let ing of ingredients) {
    //   console.log(ing);
    // }
    
    console.log("recipe: ", props.location.recipeProps.recipe);
    console.log("ingredients: ", props.location.recipeProps.ingredients)

    this.state = {
      recipeService: new RecipeService(),
      ingredients: props.location.recipeProps.ingredients,
      recipe: props.location.recipeProps.recipe
    }
  }

  async componentDidMount() {
    console.log("recipeList componentDidMount");
    if (this.state.ingredients && !this.state.recipe) {
      let list = await this.state.recipeService.getIngredients(this.state.ingredients);
      
      this.setState({
        list: list.results
      });

      console.log("list from RecipeList: ", this.state.list);
    }
    if (this.state.ingredients && this.state.recipe) {
      let listRecipe = await this.state.recipeService.getIngredientsRecipe(this.state.ingredients, this.state.recipe);
      this.setState({
        list: listRecipe.results
      });

      console.log("list: ", this.state.list);
    }
  }

//   async componentDidUpdate(prevProps, prevState) {
//     console.log("component Updated! ingredients = " + this.state.ingredients);
//     if ((prevProps.ingredients !== this.state.ingredients) || (prevProps.recipe !== this.state.recipe)) {
//       if (this.state.ingredients) {
//         let list = await this.state.recipeService.getIngredients(this.state.ingredients);
//         this.setState({
//           list: list.results
//         });
//         console.log(this.state.list);
//       }
//       if (this.state.ingredients && this.state.recipe) {
//         let listRecipe = await this.state.recipeService.getIngredientsRecipe(this.state.ingredients, this.state.recipe);
//         this.setState({
//           list: listRecipe.results
//         });
//         console.log(this.state.list);
//       }
//     }
// }

// static getDerivedStateFromProps(props, state) {
//   let newIngredients = props.location.recipeProps.ingredients.slice(1).split(',');
//   let newRecipe = props.location.recipeProps.recipe;
//   console.log("props: ", newIngredients);
//   console.log("state: ", state);
//   if ((state.ingredients  !== newIngredients) || (state.recipe  !== newRecipe)) {
//     console.log("getting derived state ing: " + newIngredients);
//     return {
//       ingredients: newIngredients,
//       recipe: newRecipe
//     };
//   }
//   return null;
// }

  render() {
    return (
      <div className="list-container">
        <div className="info-box">
          {
            this.state.ingredients ? this.state.ingredients.map((ing, index) => (
              <div key={index} className="ingredient-box">
                <p>{ing}</p>
              </div>
            )) : <p>no results!</p>
          }
          {
            this.state.recipe ? (<div className="recipe-box">{this.state.recipe}</div>) : <div></div>
          }
          <Link to="/">
            <img className="generate-another" src={GenerateAnother} alt="generate another recipe"/>
          </Link>
        </div>
        <div className="recipe-list">
          <div className="row">
            {
              this.state.list ? this.state.list.map((recipeObj, index) => {
                return (<RecipeCard key={index} recipeList={this.state.list} recipe={recipeObj} inputRecipe={this.state.recipe} inputIngredients={this.state.ingredients}/>);
              }) : <h2>no results!</h2>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeList;