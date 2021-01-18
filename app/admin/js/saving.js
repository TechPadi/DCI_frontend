axios.defaults.baseURL = "https://dcibackend.herokuapp.com/";

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



let usersAwaitingAproval=[]
function getPending(){
    axios.get("api/v1/admin/user/requestaddtosti/paysaveadd")
      .then((res) => {
        usersAwaitingAproval=res.data
        let holder =document.getElementById('awaitApproval');
        let place =[]
        for (let i = 0; i < usersAwaitingAproval.length; i++) {
            const data = usersAwaitingAproval;
            place.push(`<tr class="">
                    <td>${i+1}</td>
                    <td>${data[i].fullname}</td>
                    <td>Save To Invest</td>
                    <td class="text-right">${data[i].savingDets.amount}</td>
                    <td>${data[i].accesscode}</td>
                    <td class="text-center">Pending</td>
                    <td class="text-center">
                        <a  class="text-link text-danger" title="Decline">
                            <i class="fas fa-fw fa-times"></i>
                        </a>
                        <span 
                        name=${data[i].fullname}
                        name1=${data[i].email}}
                        name2=${data[i].phonenumber}}
                        id="acc" 
                        class="text-link text-success pl-1" 
                        title="Approve"
                        >
                            <i class="fas fa-fw fa-check"></i>
                        </span>
                    </td>
                    <td class="text-center">
                        <a href="#" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#investmentModal">
                            More <i class="fas fa-fw fa-ellipsis-h"></i>
                        </a>
                    </td>
                </tr>`)
        }
holder.innerHTML=place
      })
      .catch((err) => {
      });
}
getPending()