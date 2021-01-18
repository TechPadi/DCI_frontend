function _(str) {
    return document.querySelector(str);
  }
 
  axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;


function getUserDets(params) {
    const name = localStorage.getItem('name')
    _('#username1').innerHTML=name
     _('#username2').value=name
     axios({
        method: 'post',
        url: `api/v1/user/dashboarduser/${localStorage.getItem('userid')}`,
        headers:{
          Authorization: `Bearer ${localStorage.getItem('usertoken')}`
        }
    })
        .then(res=>{
            console.log(res)
            const {email,occupation,phonenumber,ResidentialAddress,NearestBusStop,State,Nationality,stateOfOrigin,CityTown,_id,accesscode} = res.data.user
            const image =res.data.user.image.path
            console.log(image)
            console.log(email)
            _('#accimg').src=image
            _('#accemail').value=email
            _('#accoccupation').value=occupation
            _('#accphone').value=phonenumber
            _('#accaddress').value=ResidentialAddress
            _('#accbusstop').value=NearestBusStop
            _('#acccountry').value=Nationality
            _('#accstate').value=State
            _('#accownstate').value=stateOfOrigin
            _('#acctown').value=CityTown
            // _('#accid').innerHTML=_id
            _('#accaccesscode').innerHTML=accesscode
        })
    
}
getUserDets()