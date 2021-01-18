// javascript file for the api calls

// function for grabbing ids
function _(str) {
    return document.querySelector(str);
}
  
  
// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;
const userProfile = _("#userProfile");

userProfile.innerHTML = `
    <span class="mr-2 d-none d-lg-inline text-gray-600 small">${localStorage.getItem('name')}</span>
    <img class="img-profile rounded-circle" src=${localStorage.getItem('userAvatar')}>
    `;
  
    
const paidAmount = _("#paidAmount");
paidAmount.innerHTML = `
    ₦${(!localStorage.getItem("saveAmount"))?0:localStorage.getItem("saveAmount")}
`;

const paystackBtn = _("#paystackBtn");
if (paystackBtn) {
    paystackBtn.addEventListener("click", () => {
        const body = {
            amount: localStorage.getItem("dataPrice"),
            email: localStorage.getItem('useremail')
        }

        axios.post(`api/v1/payment/paystack`, body)
        .then(response => {
            
        })
        .catch(error => {
            ;
        })
    });
}

// bank transfer api
let savingForm = _("#savingForm");

savingForm.innerHTML = `
<h3>Payment Information (For Transfer/Deposit)</h3>
<div class="row">
<div class="col-md-6 pl-1">
        <div class="form-group">
            <label for="exampleInputEmail1"><strong>Account Name</strong></label>
            <input type="text" readonly class="form-control-plaintext" value="Double Coin Investment LTD">
        </div>
    </div>
  
    
    <div class="col-md-6 pl-1">
        <div class="form-group">
            <label for="exampleInputEmail1"><strong>Account Number</strong></label>
            <input type="text" readonly class="form-control-plaintext" value="0592395220">
        </div>
    </div>
    <div class="col-md-6 pl-1">
        <div class="form-group">
            <label for="exampleInputEmail1"><strong>Bank name</strong></label>
            <input type="text" readonly class="form-control-plaintext" value="GTBank">
        </div>
    </div>
    <div class="col-md-6 pl-1">
        <div class="form-group">
            <label for="exampleInputEmail1"><strong>Amount</strong></label>
            <input type="text" readonly class="form-control-plaintext" value="${localStorage.getItem('saveAmount')}">
        </div>
    </div>
    <div class="col-md-12 pl-1">
        <div class="form-group">
        <h5>Made payment ? Upload proof below</h5>
        </div>
    </div>
    <div class="col-md-6 pl-1">
        <div class="form-group">
            <label for="exampleInputEmail1"><i>A proof can be a reciept (either a scan, a photo or a PDF) or a screenshot from your online banking clearly showing payment details such as:Source account name and account number, payment amount and payment time/date:</i></label>
            <input type="file" onchange="uploadImage()" id="myFile"/>
        </div>
    </div>
</div>
<div class="row">
  <div class="ml-2 mr-auto text-left">
    <button type="submit" class="btn btn-primary btn-round pl-3 pr-3">Continue</button>
  </div>
</div>`

if (savingForm) {
    savingForm.addEventListener("submit", e => {

        e.preventDefault();

        const body = {
            accName: `${localStorage.getItem('accName')}`,
            accNum: `${localStorage.getItem('accNum')}`,
            bankName: `${localStorage.getItem('accBank')}`,
            amount: `${parseInt(localStorage.getItem('dataPrice'))}`,
            file: `${localStorage.getItem('idimage')}`
        }

        axios.post(`api/v1/transfer/proof/${localStorage.getItem('userid')}`, body)
        .then(response => {
            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Your request is waiting to be verified`,
                showConfirmButton: false,
                timer: 2000
            });
            location.replace('/app/dashboard.html');
        })
        .catch(error => {
            ;
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 2000
            });
        })
    });
}

