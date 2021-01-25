// function for grabbing ids
function _(str) {
    return document.querySelector(str);
}

// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

const resetPwdEmailForm = _("#resetPwdEmailForm");

if (resetPwdEmailForm) {
    resetPwdEmailForm.addEventListener('submit', e => {
        e.preventDefault(); 

        const body = {
            email: _("#lEmail").value,
            type: "user",
            host: "http://127.0.0.1:8080",
            path: "/app/new-password.html"
        }

        axios.post(`api/v1/password/reset-request`,body)
        .then(response => {
            console.log(response.data);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Check your email for reset link`,
                showConfirmButton: false,
                timer: 3000
            })
        })
        .catch(err => {
            console.log(err.message)
        });
        
    });
}