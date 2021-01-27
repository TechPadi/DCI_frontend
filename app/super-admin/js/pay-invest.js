
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
    axios.get("api/v1/admin/users/active/investors")
      .then((res) => {
          console.log(res.data)
          usersAwaitingAproval=res.data
          let holder =document.getElementById('allinvestors');
          let place =''
          for (let i = 0; i < usersAwaitingAproval.length; i++) {
            const data = usersAwaitingAproval;
            place+=`<tr class="" id='returnedtr'  >
            <td>${i+1}</td>
            <td>${usersAwaitingAproval[i].fullname}</td>
            <td class="">${usersAwaitingAproval[i].planDetails.MonthlyROI}</td>
            <td class="">${usersAwaitingAproval[i].investmentReturnsBalance}</td>
            <td class="">${usersAwaitingAproval[i].LastInvestmentPayDay.split('GMT')[0]}</td>
            <td class="">${usersAwaitingAproval[i].investmentStartDate.split("GMT")[0]}</td>
            
            <td class="text-center">
            <button class="btn btn-sm btn-success"  onclick="paynow(${usersAwaitingAproval[i].accesscode})" >
            Pay now
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
getAll()

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
                        <h6 class="card-title">Investment Details</h6>
                      </div>
                      <div class="card-body">
                      <ul class="list-unstyled team-members">
                            <div class="row">
                                <div class="col-md-6">
                                    <li>
                                        <div class="row mb-2">
                                          <div class="col-12 font-weight-bold text-800">
                                            Package:
                                            <br />
                                            <span class="text-muted"><small>${actualuser.planDetails&&actualuser.planDetails.dataName?actualuser.planDetails.dataName:"NA"}</small></span>
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
                                            <span class="text-muted"><small>${actualuser.planDetails&&actualuser.planDetails.dataPrice?actualuser.planDetails.dataPrice :"NA"}</small></span>
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
                          <h6 class="card-title">Proof Of Payment</h6>
                        </div>
                        <div class="card-body">
                          <ul class="list-unstyled team-members">
                            <div class="row">
                                <div class="col-md-6">
                                    <li>
                                        <div class="row mb-2">
                                        <div class="col-12 font-weight-bold text-800">
                                            Payment Method:
                                            <br />
                                            <span class="text-muted"><small>${actualuser.transferDets&&actualuser.transferDets?'Bank Transfer/Deposit':"Paystack"}</small></span>
                                          </div>
                                         
                                        </div>
                                      </li>
                                </div>
                                <div class="col-md-6">
                                    <li>
                                        <div class="row mb-2">
                                          <div class="col-md-7 font-weight-bold text-800 col-7">
                                            Payment Upload:
                                            <br />
                                            <span class="text-muted"><img src="" width="100%" alt="" srcset=""></span>
                                          </div>
                                          <div class="col-12">
                                          <img class="avatar border-gray" src=${actualuser.transferDets&&actualuser.transferDets?actualuser.transferDets:""} alt="..." width="100%" >
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
                  <div class="modal-footer">
                  <button class="btn btn-success"  onclick="paynow(${actualuser.accesscode})">
                  Pay now</button>
              </div>
            </div>
</div>`
        $('#investmentModal').modal('show')
    }
}

    




function paynow(data) {
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
    const amount =actualuser.planDetails.MonthlyROI
    const user ={
        fullname:UserFullname,
        _id:UserId,
        phonenumber:UserPhonenumber,
        email:UserEmail,
        amount
    }
    const action = `Activation of ${actualuser.fullname} account`
    const dataBody ={email:actualuser.email,user,admin,id:admin._id,action,date:new Date(),type:"Account Activation"}

    console.log(dataBody)
    console.log({userId:user._id,amount:user.amount})
    document.getElementById('preloader').className="d-block"
    axios.post(`https://dcibackend.herokuapp.com/api/v1/admin/users/payinvestment/${admin._id}/payuser`,{userId:user._id,amount:user.amount})
    .then(res=>{
        document.getElementById('preloader').className="d-none"
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully payed ${actualuser.fullname}  for this month`,
            showConfirmButton: false,
            timer: 3500
          })
          window.location.reload(   )
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




