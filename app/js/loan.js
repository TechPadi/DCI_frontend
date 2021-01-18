axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

async function startAppData(params) {
     await axios({
        method: 'post',
        url: `api/v1/user/dashboarduser/${localStorage.getItem('userid')}`,
        headers:{
          Authorization: `Bearer ${localStorage.getItem('usertoken')}`
        }
      }).then(response=>{

        if(response.data.user.LoanRequest===true || response.data.user.LoanActive===true){
            window.location.replace('../app/loan-active.html')
        }
    
        else if(response.data.user.LoanRequest===false){
    
        }
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

startAppData()