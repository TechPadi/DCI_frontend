axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;


function _(str) {
    return document.querySelector(str);
  }


async function startAppSave(params) {
    
    await axios({
      method: 'post',
      url: `api/v1/user/dashboarduser/${localStorage.getItem('userid')}`,
      headers:{
        Authorization: `Bearer ${localStorage.getItem('usertoken')}`
      }
    }).then(response=>{
        const balance = response.data.user.savingBalance
        
          _("#saveBalance").innerHTML = balance;
      
    })
    .catch(err=>{
      if (err.response.status===403) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Session expired, please you will be redirected to login again`,
          showConfirmButton: false,
          timer: 5000
        })
        setTimeout(() => {
          window.location.replace('../../index.html')
          
        }, 4000);
      }
    })
  

}

startAppSave()