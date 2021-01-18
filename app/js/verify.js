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


document.getElementById('verifydForm').addEventListener('submit',
handleVerifyCode=(e)=>{
    e.preventDefault()
    const codeValues =document.getElementById('verInput').value
    axios.post('api/v1/user/verified',{email,accesscode:codeValues})
    .then(res=>{
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
        console.log(err)
    })
})