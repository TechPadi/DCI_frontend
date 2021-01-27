// function for grabbing ids
function _(str) {
    return document.querySelector(str);
}

// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

let queryString = location.search.substring(1);

    const [token, input] = queryString.split('=');

    axios.post(`api/v1/password/reset/${input}`)
        .then(response => {
        })
        .catch(error => {

            if (error.response.status == 401) {
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

const checkPassword = () => {
    if (_("#cPwd").value == _("#cnPwd").value) {
        _(".feedback").style.color = "green";
        _(".feedback").innerHTML = `password is a match`;
        _("#resetPwdForm button.btn").removeAttribute("disabled");

        // Reset password form
       if ( _("#resetPwdForm")) {
        _("#resetPwdForm").addEventListener("submit", e => {
            e.preventDefault();

            _("#resetPwdForm button.btn").setAttribute("disabled", true);
            _("#resetPwdForm button.btn").innerHTML = `<img src="/app/img/835.gif" width="20">`;

            const body = {
                password : _("#cPwd").value
            }

            axios.post(`api/v1/password/change/${input}`, body)
            .then(response => {

                _("#resetPwdForm button.btn").removeAttribute("disabled");
                _("#resetPwdForm button.btn").innerHTML = `Change Password`;

                
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
            })

        })
       }
    } else {
        _(".feedback").style.color = "red";
        _(".feedback").innerHTML = `passwords don't match`;
        _("#resetPwdForm button.btn").setAttribute("disabled", true);
    }
}