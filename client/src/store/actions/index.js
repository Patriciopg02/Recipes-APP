import {GET_RECIPES, GET_RECIPES_DB, SEARCH_RECIPES,ORDER,FILTER,CHANGE_PAGE,GET_DIETS} from '../actions-type';
import axios from 'axios';

export function getRecipes(offset) {
    return function(dispatch) {
        axios.get(`http://localhost:3001/api/recipes?offset=${offset}`)
        .then((recipes) => {
            dispatch({
                type: GET_RECIPES,
                payload: recipes.data
            })
        })
        .catch(err => console.log(err))
    }
}

export function getDiets() {
    return function(dispatch) {
        axios.get(`http://localhost:3001/api/diets/`)
        .then((diets) => {
            dispatch({
                type: GET_DIETS,
                payload: diets.data
            })
        })
        .catch(err => console.log(err))
    }
}

export function getRecipesDB() {
    return function(dispatch) {
        axios.get(`http://localhost:3001/api/recipes?offset=0`)
        .then((recipes) => {
            dispatch({
                type: GET_RECIPES_DB,
                payload: recipes.data
            })
        })
        .catch(err => console.log(err))
    }
}

export function CreateRecipe(props) {
    return function() {
        axios.post('http://localhost:3001/api/recipes/', {
        name: props.name,
        image: props.image,
        summary: props.summary,
        instructions: props.steps,
        health_score: props.health_score
        })
        .then(function (response) {
            // console.log('id de receta nueva');
            // console.log(response.data.id);
            for (let i = 0; i < props.diets.length; i++) {
                // console.log('dieta');
                // console.log(props.diets[i].id);
                axios.post(`http://localhost:3001/api/recipes/${response.data.id}/diet/${props.diets[i].id}`)
                .then(function (response) {
                    console.log('OK');
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        })
        .catch(function (error) {
            alert('Receta existente.');
        });
    }
}

export function SearchRecipes(search) {
    return function(dispatch) {
        axios.get(`http://localhost:3001/api/recipes?name=${search}&offset=0`)
        .then((recipes) => {
            dispatch({
                type: SEARCH_RECIPES,
                payload: recipes.data
            })
        })
        .catch(err => console.log(err))
    }
}

export function ChangePage(offset) {
    return {
        type: CHANGE_PAGE,
        payload: offset
    }
}

export function Order_recipes(order) {
    return {
        type: ORDER,
        payload: order
    }
}

export function Filter_recipes(list) {
    return {
        type: FILTER,
        payload: list
    } 
}