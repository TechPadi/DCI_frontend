
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
axios.get('api/v1/admin/all/admin')
.then(res=>{
    dataAll =res.data
})
.catch(err=>{

})

let usersAwaitingAproval=[]
function getAll(){
    axios.get("api/v1/admin/all/admin")
      .then((res) => {
          usersAwaitingAproval=res.data
          let holder =document.getElementById('allUser');
          let place =''
          for (let i = 0; i < usersAwaitingAproval.length; i++) {
            const data = usersAwaitingAproval[i];
            console.log(data)
            place+=` <tr class="">
            <td>${i+1}</td>
            <td>${data.fullname}</td>
            <td>${data.email}</td>
            <td>${data.phonenumber}</td>
            <td >${data.referralsEarning}</td>
            <td class="text-center">${data.createdAt.split("T")[0]}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-primary"  onclick="showModal(${data.accesscode})" >
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
            <h5 class="modal-title" id="exampleModalLabel">Staff Logs</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="card-body">
                <div class="table-responsive" width="100%">
                    <table class="table table-hover show" id="dataTable" cellspacing="0">
                        <thead>
                            <tr class="font-weight-bold">
                                <th>S/N</th>
                                <th>Customer Name</th>
                                <th>Action</th>
                                <th class="text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        ${actualuser.activityLogs.length?actualuser.activityLogs.map((log,index)=>(
                           ` <tr class="">
                                <td>${index+1}</td>
                                <td>${log.user.fullname}</td>
                                <td>${log.action}</td>
                                <td class="text-center">${log.date.split('T')[0]}</td>
                                
                            </tr>`
                        )):`<h4>No log</h4>`}
                            
                        </tbody>
                    </table>
                </div>
                      </div>
                  </div>
            <div class="modal-footer">
            <a class="btn btn-primary" href="#">Continue</a>
        </div>
            </div>
        </div>`
        $('#investmentModal').modal('show')
    }
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




