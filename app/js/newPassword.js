// function for grabbing ids
function _(str) {
    return document.querySelector(str);
}

// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

let queryString = location.search.substring(1);

const [token, input] = queryString.split('=');
console.log(token, input);

axios.post(`api/v1/password/reset/${input}`)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error.message);
        if (error.status == 401) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `Token expired, please go back and input your email again.`,
                showConfirmButton: false,
                timer: 3000
            })
            setTimeout(() => {
                location.replace('/app/forgot-password.html')
            }, 3000);   
        }
        
    })

const resetPwdForm = _("#resetPwdForm");
const pwdField = _("#cPwd");
const cPwdField = _("#cnPwd");
const submitBtn = _("button.btn-primary");
const feedback = _("p.feedback");

console.log(resetPwdForm, pwdField, cPwdField, submitBtn, feedback);

const checkPassword = () => {
    if (pwdField.value == cPwdField.value) {
        console.log(cPwdField.value);
        feedback.style.color = "green";
        feedback.innerHTML = `password is a match`;
        _("button.btn-primary").removeAttribute("disabled");
        // reset password api call
        if (resetPwdForm) {
            resetPwdForm.addEventListener("submit", e => {
                e.preventDefault();

                const body = {
                    password : _("#cPwd").value
                }

                axios.post(`api/v1/password/change/${input}`, body)
                .then(response => {
                    console.log(response.data);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Password changed successfully.`,
                        showConfirmButton: false,
                        timer: 3000
                    })
                    setTimeout(() => {
                        location.replace('/app/login.html')
                    }, 3000);
                })
                .catch(error => {
                    console.log(error.message)
                })

            });
        }
    } else {
        feedback.style.color = "red";
        feedback.innerHTML = `passwords don't match`;
        _("button.btn-primary").setAttribute("disabled", true);
    }
  } 