axios.defaults.baseURL = "https://dcibackend.herokuapp.com/";
const year =new Date().getFullYear()
let dataAll 
document.getElementById('year').innerHTML=year
const  id =localStorage.getItem('id')
axios.post(`https://dcibackend.herokuapp.com/api/v1/admin/dashboard/${id}`)
.then(res=>{
    const {fullname,email,phonenumber,residentialAddress,nearestBusStop,town,State,country,DateOfBirth,idType,idNumber} =res.data.user
    document.getElementById('AdminName').innerHTML=fullname
})
.catch(err=>{
})

let usersAwaitingAproval=[]
function getPending(){
    axios.get("api/v1/admin/user/request/investment")
      .then((res) => {
        usersAwaitingAproval=res.data
        dataAll=res.data
        let holder =document.getElementById('awaitApproval');
        let place =[]
        for (let i = 0; i < usersAwaitingAproval.length; i++) {
            const data = usersAwaitingAproval;
            place.push(`<tr class="" id='returnedtr'  >
                    <td>${i+1}</td>
                    <td>${data[i].fullname}</td>
                    <td>${data[i].planDetails.dataName}</td>
                    <td class="text-right">${data[i].planDetails.dataPrice}</td>
                    <td>${data[i].accesscode}</td>
                    <td class="text-center">Pending</td>
                    <td class="text-center">
                        <button class="btn text-link text-danger" title="Decline">
                            <i class="fas fa-fw fa-times"></i>
                        </button>
                        <button 
                        id="accq" 
                        class="btn text-link text-success pl-1" 
                        title="Approve"
                        onclick="recieveData(${data[i].accesscode})"
                        >
                            <i class="fas fa-fw fa-check"></i>
                        </button>
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



function recieveData(data) {
    const actualuser = dataAll.filter(user=>user.accesscode==data)[0]
    const admin =JSON.parse(localStorage.getItem('user'))
    const id =admin._id
    const action = `Verifiey investment of ${actualuser.fullname}`
    const dataBody ={user:actualuser,admin,id,action}
    
    axios.post(`https://dcibackend.herokuapp.com/api/v1/admin/user/verifyinvestor/investment/${id}`,dataBody)
    .then(res=>{
        console.log(res)
        // Swal.fire({
        //     position: 'center',
        //     icon: 'success',
        //     title: `Successfully activated `,
        //     showConfirmButton: false,
        //     timer: 2000
        //   })
    }).catch(err=>{

    })
}

 
function logout(params) {
    localStorage.clear("id")
    localStorage.clear("user")
    localStorage.clear("toke")
    window.location.replace('/admin/login.html')
}
if(!localStorage.getItem("id")){
    window.location.replace('/admin/login.html')
}