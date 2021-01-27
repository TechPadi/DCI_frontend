function _(str) {
    return document.querySelector(str);
}

function currencyFormat(num) {
    return `₦${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
}

// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;
  
const renewInvest = _("#renewInvest");

renewInvest.innerHTML = `You invested <code>${(localStorage.getItem('activeplan'))?currencyFormat(0):currencyFormat(localStorage.getItem('dataPrice'))}</code> 
<br>For <code>${(localStorage.getItem('activeplan'))?'No current investment package':localStorage.getItem('dataName')}</code> 
<br>Proceed with package renewal below, make sure to read the terms of renewal.`;

// const userProfile = _("#userProfile");

userProfile.innerHTML = `
      <span class="mr-2 d-none d-lg-inline text-gray-600 small">${localStorage.getItem('name')}</span>
      <img class="img-profile rounded-circle" src=${localStorage.getItem('userAvatar')}>
      `;



const renewBtn = _("#renewBtn");

if (localStorage.getItem('activeplan')) {
    renewBtn.setAttribute("disabled", true);
}

if (renewBtn) {
    renewBtn.addEventListener('click', () => {

        _("#renewBtn").setAttribute("disabled", true);
        _("#renewBtn").innerHTML = `<img src="/app/img/835.gif" width="20">`

        const body = {
            nextOfKins: localStorage.getItem('nextOfKins'),
            relationship: localStorage.getItem('relationship'),
            address: localStorage.getItem('address'),
            phone: localStorage.getItem('phone'),
            dataName: localStorage.getItem('dataName'),
            dataPrice: localStorage.getItem('dataPrice'),
            MonthlyROI: localStorage.getItem('MonthlyROI'),
            TotalROI: localStorage.getItem('TotalReturn'),
            TotalReturn: localStorage.getItem('TotalROI'),
            ACnumber: localStorage.getItem('ACnumber'),
            ACname: localStorage.getItem('ACname'),
            ACbank: localStorage.getItem('ACbank')
        }


        axios.put(`api/v1/plans/${localStorage.getItem('userid')}/pickedplan`, body)
        .then(response => {

            _("#renewBtn").removeAttribute("disabled");
            _("#renewBtn").innerHTML = `<span class="icon text-white-50">
            <i class="fas fa-flag"></i>
        </span>
        <span class="text">Renew Now</span>`

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Your request for investment has been submitted. Wait for confirmation.`,
                showConfirmButton: false,
                timer: 5000
            });
        })
        .catch(err => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 3500
            });
        });
    });
}