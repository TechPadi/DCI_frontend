// javascript file for the api calls

// function for grabbing ids
function _(str) {
    return document.querySelector(str);
  }
  
  
  // Set base url using axios global defaults
  axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;
  
  // Login form api call
  const loginForm = _("#loginForm");
//   const progressCircle = Array.from(document.querySelectorAll('.circle'));

  
  
  
  // Login form api call
  
  if (loginForm) {
  
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
  
      const email = _("#lEmail").value;
      const password = _("#lPassword").value;
  
  
      axios.post(`api/v1/user/login`, {
        email: email,
        password: password
      })
      .then(function (response) {
  
        console.log(response.data)
        
        const id = response.data.user._id;
        localStorage.setItem('userid', id);
  
        const token = response.data.token;
        localStorage.setItem('usertoken', token);
  
        const fullname = response.data.user.fullname;
        localStorage.setItem('name', fullname);

        const email = response.data.user.email;
        localStorage.setItem('useremail', email);

        const save_balance = response.data.user.savingBalance;
        localStorage.setItem('save_balance', save_balance);

        
        // console.log(fullname, token, id);
  console.log(response)
        if(!response.data.user.verified) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please verify your email.',
            showConfirmButton: false,
            timer: 5000
          })
  
          location.replace("/app/verify.html");
        } else if(response.data.user.upToDate) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${response.data.message}`,
            showConfirmButton: false,
            timer: 5000
          })
  
          location.replace("/app/dashboard.html");
        }else{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login Successful. Please update your profile so you can start investing.',
            showConfirmButton: false,
            timer: 5000
          })
  
          setTimeout(() => {
          
            location.replace("/app/update1.html");
          }, 5000);
  
        }
  
        
  
      })
      .catch(function (error) {
        if(error.message === 'Request failed with status code 404') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `This email is not registered`,
            showConfirmButton: false,
            timer: 5000
          })
          setTimeout(() => {
          
            location.replace("/app/register.html");
          }, 5000);
        } else if(error.message === 'Request failed with status code 403') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `password is incorrect`,
            showConfirmButton: false,
            timer: 5000
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `It's not you, it's from the server`,
            showConfirmButton: false,
            timer: 5000
          })
        }
        
      });
  
    });
  
  }
  
  
 