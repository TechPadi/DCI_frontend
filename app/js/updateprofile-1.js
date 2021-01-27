// Preloader
function preloader() {
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function() {
      $(this).remove();
    });
  }
}

$(window).on('load', preloader());

function _(str) {
  return document.querySelector(str);
}

axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

const updateOnForm = _('#update1');
const updateTwoForm = _('#update2');
const updateThreeForm = _('#update3');
const firstUpdateBtn = _('#firstUpdateBtn');
const secondUpdateBtn = _('#secondUpdateBtn');
const thirdUpdateBtn = _('#thirdUpdateBtn');


function handleUpdateOne(e){
    // e.preventDefault()
    firstUpdateBtn.setAttribute("disabled", true);
    firstUpdateBtn.innerHTML = `<img src="/app/img/835.gif" width="20">`;
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
        firstUpdateBtn.removeAttribute("disabled");
        firstUpdateBtn.innerHTML = `Next`;
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

let y
uploadImage = async () =>{
  var x =  _("#idImg");
  let files = null;

  if ('files' in x) {
      if (x.files.length == 0) {
        alert('Select one or more files.')
      } else {
        for (var i = 0; i < x.files.length; i++) {
          files = x.files[i];
        }
      }
    } 
  const data = new FormData()
  data.append("file",files)
  data.append("upload_preset","node-app")

  let loader = _(".form-group-img span");
  loader.classList.toggle("d-none");
  if (secondUpdateBtn) {
    secondUpdateBtn.setAttribute("disabled", true);
  }
  if (thirdUpdateBtn) {
    thirdUpdateBtn.setAttribute("disabled", true);
  }
  

  const res =await fetch("https://api.cloudinary.com/v1_1/dxmrb9qlp/image/upload",
  {
    method:"POST",
    body:data
  })
  const file = await res.json()
  if (file) {
    y = file;
    loader.classList.toggle("d-none");
    
    
    if (secondUpdateBtn) {
      secondUpdateBtn.removeAttribute("disabled");
    }
    if (thirdUpdateBtn) {
      thirdUpdateBtn.removeAttribute("disabled");
    }
  }
  console.log(file)
  localStorage.setItem("idimage",file.secure_url)
}

function handleUpdateTwo(e){
    // e.preventDefault()
    secondUpdateBtn.setAttribute("disabled", true);
    secondUpdateBtn.innerHTML = `<img src="/app/img/835.gif" width="20">`;

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
      secondUpdateBtn.removeAttribute("disabled");
        secondUpdateBtn.innerHTML = `Next`;
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
    thirdUpdateBtn.setAttribute("disabled", true);
    thirdUpdateBtn.innerHTML = `<img src="/app/img/835.gif" width="20">`;
    let image = _("#idImg");
    const img =image.files[0]
    
    const FD =new FormData()
    FD.append('image',img)
      axios.post(`api/v1/user/personal/${localStorage.getItem('userid')}/newuser/image/upload`, FD)
      .then(response => {
        thirdUpdateBtn.removeAttribute("disabled");
        thirdUpdateBtn.innerHTML = `Finish`;
          

        if(response.data.user.approvedUser === false) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `You have successfully completed your registration. Awaiting Verification.`,
            showConfirmButton: false,
            timer: 3000
          })
          setTimeout(() => {
            location.replace("/app/user-verify.html");
          }, 3100);
          
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Third ${response.data.message}`,
            showConfirmButton: false,
            timer: 3000
          })
          setTimeout(() => {
            location.replace("/app/dashboard.html");
          }, 3100);
        }
  
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
