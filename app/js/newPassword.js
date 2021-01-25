// function for grabbing ids
function _(str) {
    return document.querySelector(str);
}

// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;