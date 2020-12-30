// javascript file for the api calls

const axios = require('axios').default;

// function for grabbing ids
function _(str) {
    return document.querySelector(str);
}

// Set base url using axios global defaults
axios.defaults.baseURL = "https://dcibackend.herokuapp.com/";

