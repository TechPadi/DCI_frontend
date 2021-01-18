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

const checkPassword = () => {
  if (_("#rPwd").value == _("#rCPwd").value) {
    _(".feedback").style.color = "green";
    _(".feedback").innerHTML = `password is correct`;
    _("#firstRegBtn").removeAttribute("disabled");
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
  } else {
    _(".feedback").style.color = "red";
    _(".feedback").innerHTML = `password is not correct`;
    _("#firstRegBtn").setAttribute("disabled", true);
  }
} 

  // check if terms and conditions was checked
  if (_("#checkTerms").checked) {
    _("#secondRegBtn").removeAttribute("disabled");
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
  } else {
    _("#secondRegBtn").setAttribute("disabled", true);
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
  
  
  
 