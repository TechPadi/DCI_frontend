axios.defaults.baseURL = "https://dcibackend.herokuapp.com/";

const year =new Date().getFullYear()
document.getElementById('year').innerHTML=year
const  id =localStorage.getItem('id')
axios.post(`https://dcibackend.herokuapp.com/api/v1/admin/dashboard/${id}`)
.then(res=>{
    console.log(res.data.user.referralsUsers)
    const {fullname,occupation,email,phonenumber,residentialAddress,
        nearestBusStop,town,State,country,DateOfBirth,idType,idNumber,accesscode} =res.data.user
        document.getElementById('accesscode1').textContent=accesscode?accesscode:"NA"
        
    document.getElementById('AdminName').innerHTML=fullname
    document.getElementById('AdminName1').innerHTML=fullname
    document.getElementById('AdminName2').value=fullname
    document.getElementById('AdminEmail').value=email
    document.getElementById('AdminOccupation').value=occupation?occupation:"NA"
    document.getElementById('AdminPhone').value=phonenumber?phonenumber:"NA"
    document.getElementById('AdminAddress').value=residentialAddress?residentialAddress:"NA"
    document.getElementById('AdminBusStop').value=nearestBusStop?nearestBusStop:"NA"
    document.getElementById('AdminTown').value=town?town:"NA"
    document.getElementById('AdminState').value=State?State:"NA"
    document.getElementById('AdminNation').value=country?country:"NA"
    document.getElementById('AdminType').value=idType?idType:"NA"
    document.getElementById('AdminNumber').value=idType?idType:"NA"
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