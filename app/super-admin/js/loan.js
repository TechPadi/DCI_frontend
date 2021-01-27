axios.defaults.baseURL = "https://dcibackend.herokuapp.com/";
let dataAll 
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
axios.get('/api/v1/user/users')
.then(res=>{
    dataAll =res.data
})
.catch(err=>{

})

function showModal(data) {
    console.log(data)
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
          console.log(actualuser)
          let ltype
          switch (actualuser.loandets.Ltype) {
              case 't1':
                  ltype='One (1) month 20% interest'
                  break;
                  case 't2':
                  ltype='Two to Six (2-6) months 15% interest'
                  
                  break;
                  case 't3':
                  ltype='Seven to Twelve (7-12) months 10% interest'
                  
                  break;
                  case 't4':
                  ltype='DCI investor loans (Duration of investment with DCI) 10%'
                  
                  break;
          
              default:
                  break;
          }
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
                                                  Email:
                                                  <br />
                                                  <span class="text-muted"><small>${actualuser.email&&actualuser.email?actualuser.email:"NA"}</small></span>
                                                  </div>
                                              </div>
                                          <div class="col-md-6 mb-2">
                                            <div class="font-weight-bold text-800">
                                              Phone Number:
                                              <br />
                                              <span class="text-muted"><small>+234${actualuser.phonenumber&&actualuser.phonenumber?actualuser.phonenumber:"NA"}</small></span>
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
                      <div class="card mt-1">
                        <div class="card-header">
                          <h6 class="card-title">Loan Details</h6>
                        </div>
                        <div class="card-body">
                        <ul class="list-unstyled team-members">
                              <div class="row">
                                  <div class="col-md-6">
                                      <li>
                                          <div class="row mb-2">
                                            <div class="col-12 font-weight-bold text-800">
                                            Loan Type:
                                              <br />
                                              <span class="text-muted"><small>${ltype}</small></span>
                                            </div>
                                           
                                          </div>
                                        </li>
                                  </div>
                                  <div class="col-md-6">
                                      <li>
                                          <div class="row mb-2">
                                            <div class="col-md-7 font-weight-bold text-800 col-7">
                                              Amount:
                                              <br />
                                              <span class="text-muted"><small>${actualuser.loandets&&actualuser.loandets?actualuser.loandets.Lamount :"NA"}</small></span>
                                            </div>
                                           
                                          </div>
                                        </li>
                                  </div>
                                  <div class="col-md-6">
                                            <li>
                                                <div class="row mb-2">
                                                  <div class="col-md-7 font-weight-bold text-800 col-7">
                                                    Employee's Name:
                                                    <br />
                                                    <span class="text-muted"><small>${actualuser&&actualuser.loandets?actualuser.loandets.Lemployer:"NA"}</small></span>
                                                  </div>
                                                 
                                                </div>
                                              </li>
                                        </div>
                                        <div class="col-md-6">
                                            <li>
                                                <div class="row mb-2">
                                                  <div class="col-md-7 font-weight-bold text-800 col-7">
                                                    Annual Income:
                                                    <br />
                                                    <span class="text-muted"><small>${actualuser&&actualuser.loandets?actualuser.loandets.Lincome:"NA"}</small></span>
                                                  </div>
                                                 
                                                </div>
                                              </li>
                                        </div>
                              </div>
                          </ul>
                        </div>
                      </div>
                      <div class="card mt-1">
                          <div class="card-header">
                            <h6 class="card-title">Collateral Details</h6>
                          </div>
                          <div class="card-body">
                            <ul class="list-unstyled team-members">
                              <div class="row">
                                  
                              <div class="col-md-6">
                              <li>
                                  <div class="row mb-2">
                                    <div class="col-12 font-weight-bold text-800">
                                      Collateral Type:
                                      <br />
                                      <span class="text-muted"><small>${actualuser.loandocs.CollateralType}</small></span>
                                    </div>
                                   
                                  </div>
                                </li>
                          </div>
                          <div class="col-md-6">
                              <li>
                                  <div class="row mb-2">
                                    <div class="col-md-7 font-weight-bold text-800 col-7">
                                      Collateral Worth:
                                      <br />
                                      <span class="text-muted"><small>${actualuser.loandocs.CollateralWorth}</small></span>
                                    </div>
                                   
                                  </div>
                                </li>
                          </div>
                          <div class="col-md-6">
                              <li>
                                  <div class="row mb-2">
                                    <div class="col-md-7 font-weight-bold text-800 col-7">
                                      Ownership State:
                                      <br />
                                      <span class="text-muted"><small>${actualuser.loandocs.OwnershipState}</small></span>
                                    </div>
                                   
                                  </div>
                                </li>
                          </div>
                          <div class="col-md-6">
                              <li>
                                  <div class="row mb-2">
                                    <div class="col-md-7 font-weight-bold text-800 col-7">
                                      Collateral Location:
                                      <br />
                                      <span class="text-muted"><small>${actualuser.loandocs.CollateralLocation}</small></span>
                                    </div>
                                   
                                  </div>
                                </li>
                          </div>
                          <div class="col-md-12">
                              <li>
                                  <div class="row mb-2">
                                    <div class="col-md-7 font-weight-bold text-800 col-7">
                                      Documents:
                                    </div>
                                    <div class="col-12">
                                      <a href=${actualuser.loandocs.docimage} class="btn btn-sm btn-primary" download rel="noopener noreferrer" target="_blank">Preview</a>
                                  </div>
                                  </div>
                                </li>
                          </div>
                                  </div>
                              </div>
                            </ul>
                          </div>
                        </div>
                    </div>
              </div>
              <div class="modal-footer">
              <a class="btn btn-primary" href="#">Continue</a>
          </div>
  </div>`
          $('#investmentModal').modal('show')
      }
  }


let usersAwaitingAproval=[]
function getPending(){
    axios.get("api/v1/admin/user/request/loans")
      .then((res) => {
        usersAwaitingAproval=res.data
        let holder =document.getElementById('awaitApproval');
        let place =[]
        for (let i = 0; i < usersAwaitingAproval.length; i++) {
            const data = usersAwaitingAproval;
            place.push(`<tr class="">
                    <td>${i+1}</td>
                    <td>${data[i].fullname}</td>
                    <td>Loan</td>
                    <td class="text-right">${data[i].loandets.Lamount}</td>
                    <td>${data[i].accesscode}</td>
                    <td class="text-center">Pending</td>
                    <td class="text-center">
                        <button  class="btn text-link text-danger" title="Decline" onclick="declinedPlan(${data[i].accesscode})">
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
                    <button class="btn btn-sm btn-primary"  onclick="showModal(${data[i].accesscode})" >
                    More <i class="fas fa-fw fa-ellipsis-h"></i>
                </button>
                    </td>
                </tr>`)
        }
holder.innerHTML=place
      })
      .catch((err) => {
      });
}
getPending()

function getAll(){
    axios.get("api/v1/admin/users/all/loan")
      .then((res) => {
          console.log(res)
        usersAwaitingAproval=res.data
        let holder =document.getElementById('allLoanrequests');
        let place =[]
        for (let i = 0; i < usersAwaitingAproval.length; i++) {
            const data = usersAwaitingAproval;
            place.push(`<tr class="">
                    <td>${i+1}</td>
                    <td>${data[i].fullname}</td>
                    <td>${data[i].email}</td>
                    <td class="text-right">${data[i].loandets.Lamount}</td>
                    <td>${data[i].accesscode}</td>
                    <td class="text-center ${data[i].LoanActive?
                        "text-success":"text-warning"}">${data[i].LoanActive?
                            "Active":"Pending"}</td>
                    
                    <td class="text-center">
                    <button class="btn btn-sm btn-primary"  onclick="showModal(${data[i].accesscode})" >
                    More <i class="fas fa-fw fa-ellipsis-h"></i>
                </button>
                    </td>
                </tr>`)
        }
holder.innerHTML=place
      })
      .catch((err) => {
      });
}
getAll()
function getApproved(){
    axios.get("api/v1/admin/users/all/active/loan")
      .then((res) => {
          console.log(res)
        usersAwaitingAproval=res.data
        let holder =document.getElementById('allLoanActive');
        let place =[]
        for (let i = 0; i < usersAwaitingAproval.length; i++) {
            const data = usersAwaitingAproval;
            place.push(`<tr class="">
                    <td>${i+1}</td>
                    <td>${data[i].fullname}</td>
                    <td>Loan</td>
                    <td class="text-right">${data[i].loandets.Lamount}</td>
                    <td>${data[i].accesscode}</td>
                    <td class="text-center text-success">Active</td>
                   
                    <td class="text-center">
                    <button class="btn btn-sm btn-primary"  onclick="showModal(${data[i].accesscode})" >
                    More <i class="fas fa-fw fa-ellipsis-h"></i>
                </button>
                    </td>
                </tr>`)
        }
holder.innerHTML=place
      })
      .catch((err) => {
      });
}
getApproved()
function getDeclined(){
    axios.get("api/v1/admin/users/all/declined/loan")
      .then((res) => {
          console.log(res)
        usersAwaitingAproval=res.data
        let holder =document.getElementById('allLoanDeclined');
        let place =[]
        for (let i = 0; i < usersAwaitingAproval.length; i++) {
            const data = usersAwaitingAproval;
            place.push(`<tr class="">
                    <td>${i+1}</td>
                    <td>${data[i].fullname}</td>
                    <td>Loan</td>
                    <td class="text-right">${data[i].loandets.Lamount}</td>
                    <td>${data[i].accesscode}</td>
                    <td class="text-center text-danger">Declined</td>
                    
                    <td class="text-center">
                    <button class="btn btn-sm btn-primary"  onclick="showModal(${data[i].accesscode})" >
                    More <i class="fas fa-fw fa-ellipsis-h"></i>
                </button>
                    </td>
                </tr>`)
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
        emaiil:UserEmail
    }
    const action = `Verified loan of ${actualuser.fullname}`
    const dataBody ={user,admin,id,action,date:new Date(),type:"Loan"}
    console.log(dataBody)
    document.getElementById('preloader').classList.add("d-block")
    axios.post(`https://dcibackend.herokuapp.com/api/v1/activate/loan/${actualuser._id}`,dataBody)
    .then(res=>{
        document.getElementById('preloader').className="d-none"
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully activated `,
            showConfirmButton: false,
            timer: 2000
          })
        }).catch(err=>{
        document.getElementById('preloader').className="d-none"
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `error occured`,
            showConfirmButton: false,
            timer: 2000
          })
    })
    
}
function declinedPlan(data) {
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
        emaiil:UserEmail
    }
    const action = `Declined loan of ${actualuser.fullname}`
    const dataBody ={user,admin,id,action,date:new Date(),type:"Loan"}
    console.log(dataBody)
    document.getElementById('preloader').className="d-block"
    axios.post(`https://dcibackend.herokuapp.com/api/v1/admin/user/newUser/${actualuser._id}/decline/loan`,dataBody)
    .then(res=>{
    document.getElementById('preloader').className="d-none"
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully declined `,
            showConfirmButton: false,
            timer: 2000
          })
        }).catch(err=>{
        document.getElementById('preloader').className="d-none"
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `error occured`,
                showConfirmButton: false,
                timer: 2000
              })
        console.log(err)
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