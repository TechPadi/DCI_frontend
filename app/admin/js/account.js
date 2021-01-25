axios.defaults.baseURL = "https://dcibackend.herokuapp.com/";

function _(params) {
    document.getElementById(params)
}
const year =new Date().getFullYear()
document.getElementById('year').innerHTML=year
const  id =localStorage.getItem('id')

axios.post(`https://dcibackend.herokuapp.com/api/v1/admin/dashboard/${id}`)
.then(res=>{
    const {fullname,occupation,email,phonenumber,residentialAddress,
        nearestBusStop,town,State,country,DateOfBirth,idType,idNumber,accesscode,referralsUsers} =res.data.user
        referralsUsersHolder=referralsUsers
        referralList(referralsUsers)
        window.AppData=referralsUsersHolder
        document.getElementById('accesscode1').textContent=accesscode?accesscode:"NA"
        document.getElementById('RefBonusBalance').innerHTML=res.data.user.referralsEarning?res.data.user.referralsEarning:"NA"
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
function referralList() {
    setTimeout(() => {
        let holder =document.getElementById('lastRefers')
        let place =''
        console.log(window.AppData)
        if(window.AppData){
            for (let index = 0; index < window.AppData.length; index++) {
                const element = window.AppData[index];
                console.log(element)
                place+=`<li>
                <div class="row mb-3">
                  <div class="col-md-7 col-7">
                    ${element.fullname}
                    <br />
                    </div>
                    
                    </div>
                    </li>`
                    // <span class="text-muted"><small>Pending Investment</small></span>

            }
        }
        holder.innerHTML=place
    }, 3000);
    // return true
}