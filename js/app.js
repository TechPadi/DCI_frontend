// javascript file for the api calls

// function for grabbing ids
function _(str) {
  return document.querySelector(str);
}


// Set base url using axios global defaults
axios.defaults.baseURL = "https://dcibackend.herokuapp.com/";

// Registeration forms api call
const regForm = _("#regForm");
const personalForm = _("#personalForm");
const verifyForm = _("#verifyForm");
const progressCircle = Array.from(document.querySelectorAll('.circle'));


// register api call
if (regForm) {

    regForm.addEventListener('submit', e => {
        e.preventDefault();

        const email = _("#rEmail").value;
        const password = _("#rPwd").value;
        const messageofknow = _("#rRefer").value;
        
        console.log(email, password, messageofknow);

        axios.post('api/v1/user/register', {
            email: email,
            password: password,
            messageofknow:messageofknow
            })
            .then ( response => {

            console.log(response);

            const id = response.data.user._id;
            localStorage.setItem('userid', id);
            console.log(id);

            regForm.classList.remove('show');
            
            personalForm.classList.add('show');
            
            progressCircle[0].classList.add('done2');
            })
            .catch ( error => {
            console.log(error);
            });

    });
    
}

// personal info api call
if (personalForm) {

    personalForm.addEventListener('submit', e => {
        e.preventDefault();

        const fullname = _("#fName").value;
        const phonenumber = _("#pNumber").value;
        const occupation = _("#occupation").value;
        const gender = _("#gender").value;

        console.log(fullname, phonenumber, occupation, gender);

        axios.put('api/v1/user/register/personal/'+`${localStorage.getItem('userid')}`, {
            fullname: fullname,
            phonenumber: phonenumber,
            occupation:occupation,
            gender:gender
          })
          .then ( response => {

            console.log(response);

            personalForm.classList.remove('show');
            
            verifyForm.classList.add('show');
            
            progressCircle[1].classList.add('done2');
          })
          .catch ( error => {
            console.log(error);
          });

    })
    
}

// verify info api call
if (verifyForm) {

    verifyForm.addEventListener('submit', e => {
        e.preventDefault();

        const email = _("#verInput");

        axios.put('api/v1/user/verify', {
            email: email
          })
          .then ( response => {

            console.log(response);

            location.replace("/login.html");
          })
          .catch ( error => {
            console.log(error);
          });

    })
    
}

// Login form api call
const loginForm = _("#loginForm");

if (loginForm) {

  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = _("#lEmail");
    const password = _("lPassword");

    axios.post('api/v1/user/login', {
      email: email,
      password: password
    })
    .then(function (response) {

      console.log(response);

      const token = response.data.token;
      localStorage.setItem('usertoken', token);

      location.replace("/update.html");

    })
    .catch(function (error) {
      console.log(error);
    });

  })

}

// Update User Profile form api call
