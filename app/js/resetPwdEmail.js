$(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
});
// function for grabbing ids
function _(str) {
    return document.querySelector(str);
}

// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

const resetPwdEmailForm = _("#resetPwdEmailForm");
let resetPwdEmailFormBtn = _("#resetPwdEmailForm button.btn");

if (resetPwdEmailForm) {
    resetPwdEmailForm.addEventListener('submit', e => {
        e.preventDefault(); 

        resetPwdEmailFormBtn.setAttribute("disabled", true);
        resetPwdEmailFormBtn.innerHTML = `<img src="/app/img/835.gif" width="20">`

        const body = {
            email: _("#lEmail").value,
            type: "user",
            host: "http://127.0.0.1:8080",
            path: "/app/new-password.html"
        }

        axios.post(`api/v1/password/reset-request`,body)
        .then(response => {

            resetPwdEmailFormBtn.removeAttribute("disabled");
            resetPwdEmailFormBtn.innerHTML = `Reset Password`

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Check your email for reset link`,
                showConfirmButton: false,
                timer: 3000
            })
        })
        .catch(err => {
        });
        
    });
}