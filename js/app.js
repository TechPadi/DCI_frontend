// javascript file for the api calls

// function for grabbing ids
function _(str) {
  return document.querySelector(str);
}


// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

// Registeration forms api call
const regForm = _("#regForm");
const personalForm = _("#personalForm");
const verifyForm = _("#verifyForm");
const verifydForm = _("#verifydForm");
const progressCircle = Array.from(document.querySelectorAll('.circle'));


// register api call
if (regForm) {

    regForm.addEventListener('submit', e => {
        e.preventDefault();

        const email = _("#rEmail").value;
        const password = _("#rPwd").value;
        const messageofknow = _("#rRefer").value;

        localStorage.setItem('useremail', email);


        axios.all([

          axios.post(`api/v1/user/register`, {
            email: email,
            password: password,
            messageofknow:messageofknow
            }),
          axios.post(`api/v1/user/verify`, {
            email: email
            })

        ])
        .then(axios.spread((resp1, resp2) => {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${resp1.data.message}`,
            showConfirmButton: false,
            timer: 1500
          })

          const id = resp1.data.user._id;
          localStorage.setItem('userid', id);

          regForm.classList.remove('show');
            
          personalForm.classList.add('show');
            
          progressCircle[0].classList.add('done2');

        }))
        .catch ( error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 2000
          })
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

        axios.put(`api/v1/user/register/personal/${localStorage.getItem('userid')}`, {
            fullname: fullname,
            phonenumber: phonenumber,
            occupation:occupation,
            gender:gender
          })
          .then ( response => {

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'A code has been sent to your email address, please input the code in the next form to verify your email address.',
              showConfirmButton: false,
              timer: 2000
            })

            personalForm.classList.remove('show');
            
            verifydForm.classList.add('show');
            
            progressCircle[1].classList.add('done2');
          })
          .catch ( error => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: `${error.data.message}`,
              showConfirmButton: false,
              timer: 2000
            })
          });

    })
    
}

// verify info api call


if (verifydForm) {

    verifydForm.addEventListener('submit', e => {
        e.preventDefault();

        const email = localStorage.getItem('useremail');
        const accesscode = _('#verInput').value;

        axios.post(`api/v1/user/verified`, {
          email: email,
          accesscode: accesscode
        })
        .then(response => {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${response.data.message} proceed to login`,
            showConfirmButton: false,
            timer: 2000
          })

          location.replace("/login.html")

        })
        .catch(error => {
          console.log(error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${error.data.message}`,
            showConfirmButton: false,
            timer: 2000
          })
        });
    })
    
}

// Login form api call
const loginForm = _("#loginForm");

if (loginForm) {

  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = _("#lEmail").value;
    const password = _("#lPassword").value;

    console.log(email, password);

    axios.post(`api/v1/user/login`, {
      email: email,
      password: password
    })
    .then(function (response) {

      const token = response.data.token;
      localStorage.setItem('usertoken', token);

      if(!response.data.user.verified) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Please verify your email.',
          showConfirmButton: false,
          timer: 2000
        })

        // location.replace("/register.html#verifydForm");
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successful. Please update your profile so you can start investing.',
          showConfirmButton: false,
          timer: 2000
        })

        location.replace("/update.html");
      }

      

    })
    .catch(function (error) {
      console.log(error.message);
      if(error.message === 'Request failed with status code 404') {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `This email is not registered`,
          showConfirmButton: false,
          timer: 2000
        })
      } else if(error.message === 'Request failed with status code 403') {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `password is incorrect`,
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `It's not you, it's from the server`,
          showConfirmButton: false,
          timer: 2000
        })
      }
      
    });

  })

}

// Update User Profile form api call
