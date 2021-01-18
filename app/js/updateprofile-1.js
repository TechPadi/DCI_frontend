axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

const updateOnForm = document.getElementById('#update1')
const updateTwoForm = document.getElementById('#update2')
const updateThreeForm = document.getElementById('#update3')
function _(str) {
    return document.querySelector(str);
  }

function handleUpdateOne(e){
    // e.preventDefault()
    console.log(e)
          let [maritalStatus, dateOfBirth, residentialAddress, nearestBusStop, cityTown, state, nationality] = [ _("#marSta").value,  _("#dob").value, _("#resAdd").value, _("#busStop").value, _("#town").value, _("#state").value, _("#natIon").value];
            
      const body = {
  
        MaritalStatus: maritalStatus,
        DateOfBirth: dateOfBirth,
        ResidentialAddress: residentialAddress,
        NearestBusStop: nearestBusStop,
        CityTown: cityTown,
        State: state,
        Nationality: nationality
  
      }
  
     axios.put(`api/v1/user/personal/${localStorage.getItem('userid')}/newuser1`, body)
      .then(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `First ${response.data.message}`,
          showConfirmButton: false,
          timer: 2000
        })
  
        setTimeout(() => {
            window.location.replace('../app/update2.html')
        }, 4000);
  
      })
      .catch(error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 2000
        })
      })
}

function handleUpdateTwo(e){
    // e.preventDefault()
    console.log(e)
    let [referralsId, referralsName, identificationMeans, identificationNo, nameOfOrgnisation, lga, stateOfOrigin, idimage] = [ _("#refNo").value,  _("#reNm").value, _("#ident").value, _("#idNum").value, _("#nOo").value, _("#lga").value, _("#stateOfOrigin").value, _("#idImg").value];
  
    const body = {
      
      referralsId: referralsId,
      referralsName: referralsName,
      identificationMeans: identificationMeans,
      identificationNo: identificationNo,
      nameOfOrgnisation: nameOfOrgnisation,
      lga: lga,
      stateOfOrigin: stateOfOrigin,
      idimage: idimage


    }

    axios.put(`api/v1/user/personal/${localStorage.getItem('userid')}/newuser/two`, body)
    .then(response => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Second ${response.data.message}`,
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        window.location.replace('../app/update3.html')
    }, 4000);
    })
    .catch(error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 2000
      })
    })

}

function handleUpdateThree(e){
    // e.preventDefault()
    let image = _("#pass");
    const img =image.files[0]
    
    const FD =new FormData()
    FD.append('image',img)
      axios.post(`api/v1/user/personal/${localStorage.getItem('userid')}/newuser/image/upload`, FD)
      .then(response => {
          Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Third ${response.data.message}`,
          showConfirmButton: false,
          timer: 2000
        })
  
        location.replace("/app/dashboard.html");
  
      })
      .catch(error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 2000
        })
        
      })

}
