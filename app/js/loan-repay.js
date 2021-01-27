// Preloader
function preloader() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
}

// function for grabbing ids
function _(str) {
    return document.querySelector(str);
}

function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

let transferForm = _("#transferForm");

//   transferForm

window.addEventListener("load", () => {
    preloader()

    userProfile.innerHTML = `
      <span class="mr-2 d-none d-lg-inline text-gray-600 small">${localStorage.getItem('name')}</span>
      <img class="img-profile rounded-circle" src=${localStorage.getItem('userAvatar')}>
      `;

    transferForm.innerHTML = `<h3>Payment Information</h3>
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
                <input type="text" readonly class="form-control-plaintext" value="${localStorage.getItem('loanAmount')}">
            </div>
        </div>
        <div class="col-md-12 pl-1">
            <div class="form-group">
            <h5>Made payment ? Upload proof below</h5>
            </div>
        </div>
        <div class="col-md-6 pl-1">
            <div class="form-group form-group-img">
                <label for="exampleInputEmail1"><i>A proof can be a reciept (either a scan, a photo or a PDF) or a screenshot from your online banking clearly showing payment details such as:Source account name and account number, payment amount and payment time/date:</i></label>
                <input type="file" onchange="uploadImage()" id="myFile" required/>
                <span class="d-none pt-5"><img src="/app/img/826.gif" alt="" width="20"> Please Wait...</span>
            </div>
        </div>
    </div>
    <div class="row">
      <div class="ml-2 mr-auto text-left">
        <button type="submit" class="btn btn-primary btn-round pl-3 pr-3" id="transferFormBtn">Continue</button>
      </div>
    </div>`;
    let transferFormBtn = _("#transferFormBtn");
    
    let y
    uploadImage = async () =>{
        var x =  _("#myFile");
        let files = null;
        
        if ('files' in x) {
            if (x.files.length == 0) {
                alert('Select one or more files.')
            } else {
                for (var i = 0; i < x.files.length; i++) {
                files = x.files[i];
                }
            }
        } 
        const data = new FormData()
        data.append("file",files)
        data.append("upload_preset","node-app")

        let loader = _(".form-group-img span");
        loader.classList.toggle("d-none");
        
        transferFormBtn.setAttribute("disabled", true);

        const res =await fetch("https://api.cloudinary.com/v1_1/dxmrb9qlp/image/upload",
        {
            method:"POST",
            body:data
        })
        const file = await res.json()
        if (file) {
            y = file;
            loader.classList.toggle("d-none");
            
            transferFormBtn.removeAttribute("disabled");
        }
        
        localStorage.setItem("idimage",file.secure_url)
    }

    console.log(transferForm);
    if (transferForm) {
        transferForm.addEventListener("submit", e => {
            e.preventDefault();

            e.preventDefault();
        const file = localStorage.getItem('idimage')
        const body = {
            accName: `${localStorage.getItem('accName')}`,
            accNum: `${localStorage.getItem('accNum')}`,
            bankName: `${localStorage.getItem('accBank')}`,
            amount: `${parseInt(localStorage.getItem('dataPrice'))}`,
            file: `${localStorage.getItem('idimage')}`
        }
        if(file && file.includes('https://res.cloudinary.com/')){
            
            axios.post(`api/v1/transfer/proof/${localStorage.getItem('userid')}`, body)
            .then(response => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Your request is waiting to be verified`,
                    showConfirmButton: false,
                    timer: 5000
                });
                setTimeout(() => {
                    
                    location.replace('/app/dashboard.html');
                }, 5000);
            })
            .catch(error => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `${error.message}`,
                    showConfirmButton: false,
                    timer: 5000
                });
            })
        }
        else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `please attach your payment proof file`,
                showConfirmButton: false,
                timer: 5000
            });
        }

        })
    }
});

