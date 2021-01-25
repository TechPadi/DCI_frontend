axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;


function _(str) {
    return document.querySelector(str);
}

const renewInvest = _("#renewInvest");

renewInvest.innerHTML = `You invested <code>${localStorage.getItem('dataPrice')}</code> 
<br>For <code>${localStorage.getItem('dataName')}</code> 
<br>Proceed with package renewal below, make sure to read the terms of downgrade.`;

// const userProfile = _("#userProfile");

userProfile.innerHTML = `
      <span class="mr-2 d-none d-lg-inline text-gray-600 small">${localStorage.getItem('name')}</span>
      <img class="img-profile rounded-circle" src=${localStorage.getItem('userAvatar')}>
      `;


const terminateBtn = _("#terminateBtn");

if (terminateBtn) {
    terminateBtn.addEventListener('click', () => {
        console.log("you clicked me");

        // const body = {
        //     nextOfKins: localStorage.getItem('nextOfKins'),
        //     relationship: localStorage.getItem('relationship'),
        //     address: localStorage.getItem('address'),
        //     phone: localStorage.getItem('phone'),
        //     dataName: localStorage.getItem('dataName'),
        //     dataPrice: localStorage.getItem('dataPrice'),
        //     MonthlyROI: localStorage.getItem('MonthlyROI'),
        //     TotalROI: localStorage.getItem('TotalReturn'),
        //     TotalReturn: localStorage.getItem('TotalROI'),
        //     ACnumber: localStorage.getItem('ACnumber'),
        //     ACname: localStorage.getItem('ACname'),
        //     ACbank: localStorage.getItem('ACbank')
        // }

        // console.log(body);

        axios.put(`api/v1/plansdelete/${localStorage.getItem('userid')}/terminate`)
        .then(response => {
            console.log(response.data);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Your request for termination has been submitted. Wait for confirmation.`,
                showConfirmButton: false,
                timer: 5000
            });
        })
        .catch(err => {
            console.log(err.message);
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