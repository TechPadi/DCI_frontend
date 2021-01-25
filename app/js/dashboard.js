// javascript file for the api calls

// function for grabbing ids
function _(str) {
    return document.querySelector(str);
}
  
  
// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;
  
const update1 = _("#update1");
const update2 = _("#update2");
const update3 = _("#update3");

let [sti, roi, invAm, actLon, mReb, userProfile, roiCoi] = [_("#sti"), _("#roi"), _("#invAm"), _("#actLon"), _("#mReb"), _("#userProfile"), _("#roiCoi")];
// console.log(sti, roi, invAm, actLon, mReb, userProfile, roiCoi);
// sti.innerHTML = `hello world`;
  
const fullName = _("#fullName");
if(fullName) {

    fullName.innerHTML = `
    <h1 class="h3 mb-0 text-gray-800">Welcome, </h1><span class="span-align">Please Update Your Account To Select A Future To Start</span>
    <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
            class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
    `

}
  
const userName = _("#userName");
if(userName) {
    userName.innerHTML = `
    <h1 class="h3 mb-0 text-gray-800">Welcome, ${localStorage.getItem('name')} </h1>
    `
}
  
  
  
// Dashboard api call
  // console.log(sti, roi)
window.onload = async () => {
    // console.log('page is fully loaded');
    try{
      const response = await axios({
        method: 'post',
        url: `api/v1/user/dashboarduser/${localStorage.getItem('userid')}`,
        headers:{
          Authorization: `Bearer ${localStorage.getItem('usertoken')}`
        }
      });
    //   console.log('page is fully loaded');
      console.log(response);

      localStorage.setItem("dataPrice", `${(response.data.user.planDetails)?parseInt(response.data.user.planDetails.dataPrice):0}`);
        localStorage.setItem("dataName", `${(response.data.user.planDetails)?response.data.user.planDetails.dataName:"---"}`);
        localStorage.setItem("accNum", `${(response.data.user.planDetails)?parseInt(response.data.user.planDetails.ACnumber):0}`);
        localStorage.setItem("accName", `${(response.data.user.planDetails)?response.data.user.planDetails.ACname:"---"}`);
        localStorage.setItem("accBank", `${(response.data.user.planDetails)?response.data.user.planDetails.ACbank:"---"}`);
        localStorage.setItem("nextOfKins", `${(response.data.user.planDetails)?response.data.user.planDetails.nextOfKins:"---"}`);
        localStorage.setItem("relationship", `${(response.data.user.planDetails)?response.data.user.planDetails.relationship:"---"}`);
        localStorage.setItem("address", `${(response.data.user.planDetails)?response.data.user.planDetails.address:"---"}`);
        localStorage.setItem("phone", `${(response.data.user.planDetails)?response.data.user.planDetails.phone:0}`);
        localStorage.setItem("MonthlyROI", `${(response.data.user.planDetails)?parseInt(response.data.user.planDetails.MonthlyROI):0}`);
        localStorage.setItem("TotalROI", `${(response.data.user.planDetails)?parseInt(response.data.user.planDetails.TotalROI):0}`);
        localStorage.setItem("TotalReturn", `${(response.data.user.planDetails)?parseInt(response.data.user.planDetails.TotalReturn):0}`);
        localStorage.setItem("investmentCount", `${response.data.user.investmentCount}`);

        
      roiCoi.innerHTML += `<div class="row no-gutters align-items-center">
      <a href="#">
          <div class="col mr-2">
              <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
              ROI + COI
              </div>
              <div class="row no-gutters align-items-center">
                  <div class="col-auto">
                <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">₦${localStorage.getItem('TotalReturn')}
                      </div>
                  </div>
              </div>
          </div>
      </a>
      <div class="col-auto">
          <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
      </div>
  </div>`;
      
      userProfile.innerHTML = `
      <span class="mr-2 d-none d-lg-inline text-gray-600 small">${localStorage.getItem('name')}</span>
      <img class="img-profile rounded-circle" src=${localStorage.getItem('userAvatar')}>
      `;
  
      sti.innerHTML = `
      <div class="row no-gutters align-items-center">
      <a href="#">
          <div class="col mr-2">
              <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                  Saving Balance (STI)
              </div>
              <div class="row no-gutters align-items-center">
                  <div class="col-auto">
                <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">₦${response.data.user.savingBalance}
                      </div>
                  </div>
              </div>
          </div>
      </a>
      <div class="col-auto">
          <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
      </div>
  </div>
      `;
  
      roi.innerHTML = `
      <div class="row no-gutters align-items-center">
      <a href="#">
          <div class="col mr-2">
              <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                  ROI </div>
  <div class="h5 mb-0 font-weight-bold text-gray-800">₦${localStorage.getItem('TotalROI')}</div>
          </div>
      </a>
      <div class="col-auto">
          <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
      </div>
  </div>
      `;
  
      invAm.innerHTML = `
      <div class="row no-gutters align-items-center">
      <a href="#">
          <div class="col mr-2">
              <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Invested Amount</div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">₦${localStorage.getItem('dataPrice')}</div>
          </div>
      </a>
      <div class="col-auto">
          <i class="fas fa-calendar fa-2x text-gray-300"></i>
      </div>
  </div>
      `
  
      actLon.innerHTML = `
      <div class="row no-gutters align-items-center">
      <a href="#">
          <div class="col mr-2">
              <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Active Loans</div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">${0}</div>
          </div>
      </a>
      <div class="col-auto">
          <i class="fas fa-comments fa-2x text-gray-300"></i>
      </div>
  </div>
      `;
  
      mReb.innerHTML = `
      <div class="col-lg-6 mb-4">
      <div class="card bg-primary text-white shadow">
          <div class="card-body">
              ₦${0}
              <div class="text-white-50 small">Monthly Return on Investment</div>
          </div>
      </div>
  </div>
  <div class="col-lg-6 mb-4">
      <div class="card bg-success text-white shadow">
          <div class="card-body">
              ₦${0}
              <div class="text-white-50 small">Referal Bonus</div>
          </div>
      </div>
  </div>
      `;
  
      const img = `${(!response.data.user.image)?"img/undraw_profile.svg":response.data.user.image.path}`;
      localStorage.setItem('userAvatar', img);

      console.log(response.data.user.investmentCount > 0);
  
      
  
    } catch (error) {
  
      
      
  
      if(error.message === "Request failed with status code 403") {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Session expired, please you will be redirected to login again`,
          showConfirmButton: false,
          timer: 5000
        })
        setTimeout(() => {
          
          location.replace("/app/login.html")
        }, 5000);
      }
  
      
    }
  
  };
  
  