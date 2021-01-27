axios.defaults.baseURL = "https://dcibackend.herokuapp.com/";
function _(str) {
    return document.querySelector(str);
  }
const year =new Date().getFullYear()
document.getElementById('year').innerHTML=year
const  id =localStorage.getItem('id')
const adminLogs =document.getElementById('adminLogs')
axios.post(`https://dcibackend.herokuapp.com/api/v1/admin/dashboard/${id}`)
.then(res=>{
    _('#fullname').innerHTML=res.data.user.fullname
   _("#refB").innerHTML=res.data.user.referralsEarning
   _("#refL").innerHTML=res.data.user.referralsUsers.length
    const logs = res.data.user.activityLogs
    const place =[]
    for (let index = 0; index < logs.length; index++) {
        const element = logs[index];
        place.push(` <tr>
        <td>${element.type}</td>
        <td>${element.user.fullname}</td>
        <td>${element.user.emaiil}</td>
        <td>${element.action}</td>
        <td>${element.date.split("T")[0]}</td>
    </tr>`)
    
}
adminLogs.innerHTML=place
    const {fullname,email,phonenumber,residentialAddress,nearestBusStop,town,State,country,DateOfBirth,idType,idNumber} =res.data.user
    document.getElementById('AdminName').innerHTML=fullname
})
.catch(err=>{
})

function logout(params) {
    localStorage.clear("id")
    localStorage.clear("user")
    localStorage.clear("toke")
    window.location.replace('/admin/login.html')
}
if(!localStorage.getItem("id")){
    window.location.replace('/admin/login.html')
}


axios.get('/api/v1/user/users').then(res=>{
    const investors = res.data.filter(investor=>investor.activeplan===true).length
    const sticlients = res.data.filter(savers=>savers.SavingsActive===true).length
    const deptors = res.data.filter(debtors=>debtors.LoanActive===true).length
    const userCount = res.data.length
    _('#usersCount').innerHTML=userCount
    _('#investorsCount').innerHTML=`${investors}`
    _('#saversCount').innerHTML=`${sticlients}`
    _('#debtorsCount').innerHTML=`${deptors}`
})
.catch(err=>{
})

let img
_('#addNewAdminForm').addEventListener("submit", function(e){
let [email,fullname,DateOfBirth]=[_('#emailAdmin').value,_('#fullnameAdmin').value,_('#DOBAdmin').value]
let [phonenumber,residentialAddress,nearestBusStop]=[_('#phonenumberAdmin').value,_('#residentAdmin').value,_('#nearestBusStopAdmin').value]
let [town,State,country]=[_('#townAdmin').value,_('#stateAdmin').value,_('#countryAdmin').value]
let [idType,idNumber,password,AdminType]=[_('#idtypeAdmin').value,_('#idnumberAdmin').value,_('#passwordAdmin').value,_('#AdminType').value]
    e.preventDefault();
    const data={
        email,
        fullname,
        DateOfBirth,
        phonenumber,
        residentialAddress,
        nearestBusStop,
        town,State,
        country,
        idNumber,
        idType,
        password,
        image:img,
        AdminType
    }
    _('#preloader').className="d-block"
    axios.post('api/v1/admin/register',data)
    .then(res=>{
    _('#preloader').className="d-none"
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Admin created successfully`,
        showConfirmButton: false,
        timer: 5000
    })
    window.location.reload()
})
.catch(err=>{
    _('#preloader').className="d-none"
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: `an error occured`,
        showConfirmButton: false,
        timer: 5000
    })
})
    
  });
    uploadImage = async e =>{
        var x = document.getElementById("myFile");
        let files = null
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
    
          _('#preloader').className="d-block"
          const res =await fetch("https://api.cloudinary.com/v1_1/wise-solution-inc/image/upload",
          {
              method:"POST",
              body:data
            })
        const file = await res.json()
        if(file){
            img=file
            _('#preloader').className="d-none"
        }

      }
