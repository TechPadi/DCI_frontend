
axios.defaults.baseURL = "https://dcibackend.herokuapp.com/";
// $(window).on('load', function() {
//     if ($('#preloader').length) {
//       $('#preloader').delay(100).fadeOut('slow', function() {
//         $(this).remove();
//       });
//     }
//   });
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
axios.get('/api/v1/user/users')
.then(res=>{
    dataAll =res.data
})
.catch(err=>{

})

let usersAwaitingAproval=[]
function getAll(){
    axios.get("api/v1/user/users")
      .then((res) => {
          usersAwaitingAproval=res.data
          let holder =document.getElementById('allUser');
          let place =''
          for (let i = 0; i < usersAwaitingAproval.length; i++) {
            const data = usersAwaitingAproval;
            place+=`<tr class="" id='returnedtr'  >
            <td>${i+1}</td>
            <td>${usersAwaitingAproval[i].fullname}</td>
            <td>${usersAwaitingAproval[i].email}</td>
            <td class="text-center ${usersAwaitingAproval[i].approvedUser?
                "text-success":"text-warning"}">${usersAwaitingAproval[i].approvedUser?
                "Active":"Pending"}
            </td>
            
            <td class="text-center">
            <button class="btn btn-sm btn-primary"  onclick="showModal(${usersAwaitingAproval[i].accesscode})" >
            More <i class="fas fa-fw fa-ellipsis-h"></i>
        </button>
            </td>
        </tr>`
        }
holder.innerHTML=place
      })
      .catch((err) => {
      });
}
getAll()
function getPending(){
    axios.get("api/v1/admin/user/new/user/unapproved")
      .then((res) => {
          usersAwaitingAproval=res.data
          let holder =document.getElementById('pendingUsers');
          let place =''
          for (let i = 0; i < usersAwaitingAproval.length; i++) {
            const data = usersAwaitingAproval;
            place+=`<tr class="" id='returnedtr'  >
            <td>${i+1}</td>
            <td>${usersAwaitingAproval[i].fullname}</td>
            <td>${usersAwaitingAproval[i].email}</td>
            <td class="text-center text-warning">Pending</td>
            <td class="text-center">
        <button class="btn text-link text-danger"
         title="Decline" 
         onclick="declineUserAccount(${usersAwaitingAproval[i].accesscode})">
            <i class="fas fa-fw fa-times"></i>
        </button>
        <button 
        id="accq" 
        class="btn text-link text-success pl-1" 
        title="Approve"
        onclick="verifyUserAccount(${usersAwaitingAproval[i].accesscode})"
        >
            <i class="fas fa-fw fa-check"></i>
        </button>
    </td>
            <td class="text-center">
                <button class="btn btn-sm btn-primary"  onclick="showModal(${usersAwaitingAproval[i].accesscode})" >
                    More <i class="fas fa-fw fa-ellipsis-h"></i>
                </button>
            </td>
        </tr>`
        }
        
holder.innerHTML=place
      })
      .catch((err) => {
      });
}
getPending()
function showModal(data) {
    const holder = document.getElementById('investmentModal')
    if(!data){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `this user profile is not up to date`,
            showConfirmButton: false,
            timer: 5000
        })
    }
    else{
        const actualuser = dataAll.filter(user=>user.accesscode==data)[0]
    holder.innerHTML=`<div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="card-body">
                            <div class="card card-user">
                                <div class="card-header">
                                    <h6 class="card-title">Profile Details</h6>
                                  </div>
                                <div class="author p-4">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <img class="avatar border-gray" src=${actualuser.image&&actualuser.image?actualuser.image.path:""} alt="..." width="150px" height="150px">
                                        </div>
                                        <div class="col-md-8">
                                           
                                            <h4 class="title font-weight-bold text-800 mt-1" id="name"></h4>
                                            <div class="row">
                                                <div class="col-md-6 mb-2">
                                                      <div class="font-weight-bold text-800">
                                                        Fullname:
                                                        <br />
                                                        <span class="text-muted"><small>${actualuser.fullname&&actualuser.fullname?actualuser.fullname:"NA"}</small></span>
                                                      </div>
                                                    </div>
                                                <div class="col-md-6 mb-2">
                                                      <div class="font-weight-bold text-800">
                                                        Email:
                                                        <br />
                                                        <span class="text-muted"><small>${actualuser.email&&actualuser.email?actualuser.email:"NA"}</small></span>
                                                      </div>
                                                    </div>
                                                <div class="col-md-6 mb-2">
                                                  <div class="font-weight-bold text-800">
                                                    Phone Number:
                                                    <br />
                                                    <span class="text-muted"><small>${actualuser.phonenumber&&actualuser.phonenumber?actualuser.phonenumber:"NA"}</small></span>
                                                  </div>
                                                </div>
                                                <div class="col-md-6 mb-2">
                                                    <div class="font-weight-bold text-800">
                                                      Occupation:
                                                      <br />
                                                      <span class="text-muted"><small>${actualuser.occupation&&actualuser.occupation?actualuser.occupation:"NA"}</small></span>
                                                    </div>
                                                  </div>
                                            </div>
                                                    
    
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                    </div>
                    <div class="modal-footer">
                    <a class="btn btn-primary" href="#">Continue</a>
                </div>
        </div>   
            </div>
        </div>`
        $('#investmentModal').modal('show')
    }
}

    

function getActive(){
    axios.get("api/v1/admin/user/new/user/approved")
      .then((res) => {
          usersAwaitingAproval=res.data
          let holder =document.getElementById('allUserActive');
          let place =''
          for (let i = 0; i < usersAwaitingAproval.length; i++) {
            const data = usersAwaitingAproval;
            place+=`<tr class="" id='returnedtr'  >
            <td>${i+1}</td>
            <td>${usersAwaitingAproval[i].fullname}</td>
            <td>${usersAwaitingAproval[i].email}</td>
            <td class="text-center text-success">${usersAwaitingAproval[i].approvedUser?"Active":"Pending"}</td>
            
            <td class="text-center">
            <button class="btn btn-sm btn-primary"  onclick="showModal(${usersAwaitingAproval[i].accesscode})" >
            More <i class="fas fa-fw fa-ellipsis-h"></i>
        </button>
            </td>
        </tr>`
        }
holder.innerHTML=place
      })
      .catch((err) => {
      });
}
getActive()


function getDeclined(){
    axios.get("api/v1/admin//user/newUser/decline")
      .then((res) => {
          usersAwaitingAproval=res.data
          let holder =document.getElementById('allUserDeclined');
          let place =''
          for (let i = 0; i < usersAwaitingAproval.length; i++) {
            const data = usersAwaitingAproval;
            place+=`<tr class="" id='returnedtr'  >
            <td>${i+1}</td>
            <td>${usersAwaitingAproval[i].fullname}</td>
            <td>${usersAwaitingAproval[i].email}</td>
            <td class="text-center text-danger">Declined</td>
            
            <td class="text-center">
            <button class="btn btn-sm btn-primary"  onclick="showModal(${usersAwaitingAproval[i].accesscode})" >
            More <i class="fas fa-fw fa-ellipsis-h"></i>
        </button>
            </td>
        </tr>`
        }
holder.innerHTML=place
      })
      .catch((err) => {
      });
}
getDeclined()

function recieveData(data) {
    const actualuser = dataAll.filter(user=>user.accesscode==data)[0]
    const admin1 =JSON.parse(localStorage.getItem('user'))
    const AdminId =admin1._id
    const AdminFullname =admin1.fullname
    const AdminPhonenumber =admin1.phonenumber
    const AdminEmail =admin1.email
    const admin ={
        fullname:AdminFullname,
        _id:AdminId,
        phonenumber:AdminPhonenumber,
        emaiil:AdminEmail
    }
    const UserId =actualuser._id
    const UserFullname =actualuser.fullname
    const UserPhonenumber =actualuser.phonenumber
    const UserEmail =actualuser.email
    const user ={
        fullname:UserFullname,
        _id:UserId,
        phonenumber:UserPhonenumber,
        emaiil:UserEmail,
    }
    const action = `Verified investment of ${actualuser.fullname}`
    const dataBody ={user,admin,id:admin._id,action,date:new Date(),type:"Investment"}

    
    axios.post(`https://dcibackend.herokuapp.com/api/v1/user/verifyinvestor/investment/${id}`,dataBody)
    .then(res=>{
        
  
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

function verifyUserAccount(data) {
    const actualuser = dataAll.filter(user=>user.accesscode==data)[0]
    const admin1 =JSON.parse(localStorage.getItem('user'))
    const AdminId =admin1._id
    const AdminFullname =admin1.fullname
    const AdminPhonenumber =admin1.phonenumber
    const AdminEmail =admin1.email
    const admin ={
        fullname:AdminFullname,
        _id:AdminId,
        phonenumber:AdminPhonenumber,
        email:AdminEmail
    }
    const UserId =actualuser._id
    const UserFullname =actualuser.fullname
    const UserPhonenumber =actualuser.phonenumber
    const UserEmail =actualuser.email
    const user ={
        fullname:UserFullname,
        _id:UserId,
        phonenumber:UserPhonenumber,
        email:UserEmail,
    }
    const action = `Activation of ${actualuser.fullname} account`
    const dataBody ={email:actualuser.email,user,admin,id:admin._id,action,date:new Date(),type:"Account Activation"}

    
    document.getElementById('preloader').className="d-block"
    axios.post(`https://dcibackend.herokuapp.com/api/v1/admin/user/newUser/${user._id}/approve`,dataBody)
    .then(res=>{
        document.getElementById('preloader').className="d-none"
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully activated `,
            showConfirmButton: false,
            timer: 3500
          })
        }).catch(err=>{
        document.getElementById('preloader').className="d-none"
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `An error occured `,
            showConfirmButton: false,
            timer: 3500
          })

    })
    // 
}


function declineUserAccount(data) {
    const actualuser = dataAll.filter(user=>user.accesscode==data)[0]
    const admin1 =JSON.parse(localStorage.getItem('user'))
    const AdminId =admin1._id
    const AdminFullname =admin1.fullname
    const AdminPhonenumber =admin1.phonenumber
    const AdminEmail =admin1.email
    const admin ={
        fullname:AdminFullname,
        _id:AdminId,
        phonenumber:AdminPhonenumber,
        email:AdminEmail
    }
    const UserId =actualuser._id
    const UserFullname =actualuser.fullname
    const UserPhonenumber =actualuser.phonenumber
    const UserEmail =actualuser.email
    const user ={
        fullname:UserFullname,
        _id:UserId,
        phonenumber:UserPhonenumber,
        email:UserEmail,
    }
    const action = `Deactivation of ${actualuser.fullname} account`
    const dataBody ={email:actualuser.email,user,admin,id:admin._id,action,date:new Date(),type:"Account Activation"}

    document.getElementById('preloader').className="d-block"
    axios.post(`https://dcibackend.herokuapp.com/api/v1/admin/user/newUser/${user._id}/decline`,dataBody)
    .then(res=>{
        document.getElementById('preloader').className="d-none"
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully Deactivated `,
            showConfirmButton: false,
            timer: 2000
          })
        }).catch(err=>{
            document.getElementById('preloader').className="d-none"
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `An Error Occured`,
            showConfirmButton: false,
            timer: 2000
          })
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




