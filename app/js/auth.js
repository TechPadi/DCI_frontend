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
  const verifydForm = _("#verifydForm");
  const loginForm = _("#loginForm");
//   const progressCircle = Array.from(document.querySelectorAll('.circle'));
  
  
  // register api call
  if (regForm) {
  console.log(regForm)
      regForm.addEventListener('submit', e => {
          e.preventDefault();
  
          const email = _("#rEmail").value;
          const password = _("#rPwd").value;
          const messageofknow = _("#rRefer").value;
  
          localStorage.setItem('useremail', email);
  
  
          // axios.all([
  
          //   axios.post(`api/v1/user/register`, {
          //     email: email,
          //     password: password,
          //     messageofknow:messageofknow
          //     }),
          //   axios.post(`api/v1/user/verify`, {
          //     email: email
          //     })
  
          // ])
          axios.post(`api/v1/user/register`, {
            email: email,
            password: password,
            messageofknow:messageofknow
          })
          .then( resp1 => {
  
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `${resp1.data.message} now add your personal details`,
              showConfirmButton: false,
              timer: 5000
            })

            
  
            const id = resp1.data.user._id;
            localStorage.setItem('userid', id);
  
            regForm.classList.remove('show');
              
            personalForm.classList.add('show');
              
            progressCircle[0].classList.add('done2');
          })
          .catch ( error => {
            if(error.response.status===500){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: `email already exist`,
                showConfirmButton: false,
                timer: 5000
              })
            }
            else{
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: `error occured please try again`,
                showConfirmButton: false,
                timer: 5000
              })
            }
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
                title: 'please input the verification code sent to your email address (or spam folder)',
                showConfirmButton: false,
                timer: 5000
              })
              setTimeout(() => {
                
                location.replace("/app/verify.html")
              }, 5000);
            })
            .catch ( error => {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${error.data.message}`,
                showConfirmButton: false,
                timer: 5000
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
              timer: 5000
            })
  
            location.replace("/app/login.html")
  
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: `${error.data.message}`,
              showConfirmButton: false,
              timer: 5000
            })
          });
      })
      
  }
  
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

        const save_balance = response.data.user.savingBalance        ;
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
  
          location.replace("/app/update1.html");
  
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
          location.replace("/app/register.html");
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
  
  
 