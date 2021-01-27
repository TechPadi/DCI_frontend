// Preloader
function preloader() {
    if ($('#preloader').length) {
      $('#preloader').delay(1000).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  }
  
  $(window).on('load', preloader());
  // function for grabbing ids
function _(str) {
  return document.querySelector(str);
}
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

const email =localStorage.getItem('useremail')
async function sendverifycode () {
    axios({
        method: 'post',
        url: 'api/v1/user/verify',
        data: {
          email
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept':'*/*'
        },
      })
    .then(response=>{
        
    })
    .catch(err=>{
        Swal.fire({
        position: 'center',
        icon: 'error',
        title: `please refresh page to sent verification code again `,
        showConfirmButton: false,
        timer: 5000
        })
    })
}
sendverifycode()

const verifyRegBtn = _("#verifyRegBtn");

document.getElementById('verifydForm').addEventListener('submit',
handleVerifyCode=(e)=>{
    e.preventDefault()
    
    verifyRegBtn.setAttribute("disabled", true);
    verifyRegBtn.innerHTML = `<img src="/app/img/835.gif" width="20">`;

    const codeValues =document.getElementById('verInput').value
    axios.post('api/v1/user/verified',{email,accesscode:codeValues})
    .then(res=>{
        verifyRegBtn.removeAttribute("disabled");
        verifyRegBtn.innerHTML = `Next`;
        if(res.status===200){
             Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Verification Successful`,
                    showConfirmButton: true,
                    confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Proceed To Login',
                })
                setTimeout(() => {
                    
                    window.location.replace('../app/login.html')
                }, 4000);
        }
    })
    .catch(err=>{
    })
})