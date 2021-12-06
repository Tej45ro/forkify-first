import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookMarksView from './views/bookmarksView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import addRecipeView from './views/addRecipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log('hi2');
const showRes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //resl to mark update
    resultsView.update(model.getSearchPageResults());

    //(1) loding recipe
    await model.loadRecipe(id);

    // console.log(model.state.recipe);
    //rendring recipe
    recipeView.render(model.state.recipe);
    // console.log(model.state.recipe);
    bookMarksView.update(model.state.bookmarks);
  } catch (er) {
    console.log(`${er} controll`);
    recipeView.renderError(`${er} controll`);
  }
};
//https://media.istockphoto.com/photos/fresh-homemade-pizza-margherita-picture-id1278998606?b=1&k=20&m=1278998606&s=170667a&w=0&h=BlXvVFfwLwD4ckIF_7sg_mis8ULaqy9sdPgA6grpSo4=

const controllSearchRes = async function () {
  try {
    resultsView.renderSpinner();

    // console.log('search');
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearch(query);
    // console.log(model.state.search.results);

    resultsView.render(model.getSearchPageResults(1));
    // resultsView.render(model.state.search.results)

    paginationView.render(model.state.search);
  } catch (err) {}
};

const controlPagination = function (goto) {
  resultsView.render(model.getSearchPageResults(goto));
  // resultsView.render(model.state.search.results)

  paginationView.render(model.state.search);
};

const controlServings = function (newSer) {
  model.updateServings(newSer);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookMark = function () {
  console.log('book2');
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deletBookMark(model.state.recipe.id);
  recipeView.update(model.state.recipe);

  bookMarksView.render(model.state.bookmarks);
};

const controlBookMarks = function () {
  console.log('b33');
  bookMarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    console.log(newRecipe);
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMsg('Add your recipe 👨‍🍳🍽');

    // Render bookmark view
    bookMarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookMarksView.addHandlerRender(controlBookMarks);
  recipeView.addHandlerRender(showRes);
  recipeView.addHandlerServing(controlServings);
  recipeView.addHandlerBookMark(controlBookMark);
  searchView.addHandlerSearch(controllSearchRes);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
