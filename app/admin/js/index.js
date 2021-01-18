axios.defaults.baseURL = "https://dcibackend.herokuapp.com/";
function _(str) {
    return document.querySelector(str);
  }
const year =new Date().getFullYear()
document.getElementById('year').innerHTML=year
const  id =localStorage.getItem('id')
axios.post(`https://dcibackend.herokuapp.com/api/v1/admin/dashboard/${id}`)
.then(res=>{
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