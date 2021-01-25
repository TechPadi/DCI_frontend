// javascript file for the api calls

// function for grabbing ids
function _(str) {
  return document.querySelector(str);
}

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}




// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

userProfile.innerHTML = `
      <span class="mr-2 d-none d-lg-inline text-gray-600 small">${localStorage.getItem('name')}</span>
      <img class="img-profile rounded-circle" src=${localStorage.getItem('userAvatar')}>
      `;

// Savings api call
const savingForm = document.getElementById("savingForm");

console.log(savingForm);
if (savingForm) {
  savingForm.addEventListener('submit', e => {
    e.preventDefault();
    const amount = _("#amount").value;

    if(amount<500) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `500 is the minimum amount`,
        showConfirmButton: false,
        timer: 2000
      })
    } else {
      axios.post(`api/v1/add/savings/${localStorage.getItem('userid')}`, {
        amount: amount
      })
      .then(response => {
        
        localStorage.setItem('saveAmount', amount);

        location.replace('/app/payment-save.html');

      })
      .catch(error => {

        

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 2000
        })

      })
    }

    

  })
}

// Loans api call

const progressCircle2 = Array.from(document.querySelectorAll('.progress'));

const form1 = _("#form1");
const form2 = _("#form2");
const form3 = _("#form3");
const form4 = _("#form4");
const detForm = _("#detForm");
const docForm = _("#docForm");
const investLoan = _("#investLoan");
let index = 0;

const checkInvestorLoanAmount = () => {
  if( _("#invAmt").value > localStorage.getItem('dataPrice')) {
    console.log( _("#invAmt").value);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `The loan amount should not be more than the amount used for investment`,
      showConfirmButton: false,
      timer: 4000
    })
  }
}

const checkID = (id) => {
  if (id === 't4') {

    console.log(`you clicked on the element with the investor loan id`);

    form1.classList.remove('show');
    form4.classList.add('show');

    progressCircle[index].classList.add('done2');
    progressCircle[index + progressCircle.length-1].classList.add('done2');

    // code for investor form here
    const investLoan = _("#investLoan");
    if (investLoan) {
      investLoan.addEventListener('submit', e => {
        e.preventDefault();

        const investorLoan = {
          Ltype: 't4',
          Percentage: 15
        }
    
        let body = {
          Lamount: _("#invAmt").value,
          Luse: _("#invPup").value,
          Lemployer: _("#Lemployer").value,
          Lincome: _("#Lincome").value,
          id: `${localStorage.getItem('userid')}`,
          messageofknow: _("#messageofknow").value,
          Ltype: investorLoan.Ltype,
          Percentage: investorLoan.Percentage,
          Interval: 12
        }
        
        axios.post(`api/v1/request/loan/dciinvestor/${localStorage.getItem('userid')}`, body)
        .then(response => {
          
         
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${response.data.message}`,
            showConfirmButton: false,
            timer: 2000
          })
          
          location.replace('/app/loan.html');

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

  } else {

    console.log(`you clicked on the element with id ${id}`);

    form1.classList.remove('show');
    form2.classList.add('show');

    progressCircle[index + 1].classList.add('done2');

    // code for second form here
    const loanDetails = _("#detForm");
    if (loanDetails) {

      loanDetails.addEventListener('submit', e => {

        e.preventDefault();

        const loanDet = [
        
          {
            Ltype: 't1',
            Percentage: 20,
            Interval: 1
          },
          {
            Ltype: 't2',
            Percentage: 15,
            Interval: 6
          },
          {
            Ltype: 't3',
            Percentage: 10,
            Interval: 12
          }
        
        ];

        // console.log(loanDet);

        // const change = p => {
        //   localStorage.setItem('loanType',JSON.stringify(p));
        //   console.log(JSON.parse(localStorage.getItem('loanType')));
        // }

        const newLoanDet = loanDet.filter( det => {
          return det.Ltype === id
        });

        

        let body = {
          Lamount: _("#Lamount").value,
          Luse: _("#Luse").value,
          Lemployer: _("#Lemployer").value,
          Lincome: _("#Lincome").value,
          id: `${localStorage.getItem('userid')}`,
          messageofknow: _("#messageofknow").value,
          Ltype: newLoanDet[0].Ltype,
          Percentage: newLoanDet[0].Percentage,
          Interval: newLoanDet[0].Interval
        }

        console.log(newLoanDet, body);

        axios.post(`api/v1/request/loan/details/${localStorage.getItem('userid')}`, body)
        .then(response => {

          

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `loan details recieved, now upload document to  continue`,
            showConfirmButton: false,
            timer: 5000
          })

          form2.classList.remove('show');
          form3.classList.add('show');

          progressCircle[index + 1].classList.add('done2');

        })
        .catch(error => {


          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 2000
          })

        })
      });
      
    }

    const docForm = _("#docForm");
    if (docForm) {

      docForm.addEventListener("submit", e => {

        e.preventDefault();

        let body = {
          CollateralType: _("#CollateralType").value,
          CollateralWorth: _("#CollateralWorth").value,
          OwnershipState: _("#OwnershipState").value,
          CollateralLocation: _("#CollateralLocation").value,
          Propertydescription: _("#Propertydescription").value,
          docimage: `${localStorage.getItem('idimage')}`
        }
        
      axios.post(`api/v1/request/loan/docs/${localStorage.getItem('userid')}`, body)
      .then(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `loan request successfull please wait for an admin to approve your loan`,
          showConfirmButton: false,
          timer: 5000
        })
        setTimeout(() => {
          location.replace('/app/loan-active.html');
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

      });

      })



      
    }

  }  
}

