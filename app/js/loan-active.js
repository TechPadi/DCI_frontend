// Preloader
$(window).on('load', function() {
  if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function() {
      $(this).remove();
    });
  }
});

axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

// function for grabbing ids
function _(str) {
  return document.querySelector(str);
}

function currencyFormat(num) {
  return `₦${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
}

const loanbalance = document.getElementById('loan-balance')
const loanDue = document.getElementById('amount-due')
const loanfinanced = document.getElementById('amount-given')
const loanpercentage = document.getElementById('loan-percentage')
const loanmature = document.getElementById('loan-maturity-date')
// const userName =document.getElementById('userName')



async function startAppData(params) {
    const response = await axios({
        method: 'post',
        url: `api/v1/user/dashboarduser/${localStorage.getItem('userid')}`,
        headers:{
          Authorization: `Bearer ${localStorage.getItem('usertoken')}`
        }
      });
    // userName.innerHTML=response.data.user.fullname
    userProfile.innerHTML = `
      <span class="mr-2 d-none d-lg-inline text-gray-600 small">${localStorage.getItem('name')}</span>
      <img class="img-profile rounded-circle" src=${localStorage.getItem('userAvatar')}>
      `;

      localStorage.setItem("loanDue", currencyFormat(response.data.user.amountToRepay));
      localStorage.setItem("loanbalance", currencyFormat(response.data.user.amountToRepayBalance));
      localStorage.setItem("loanfinanced", response.data.user.loandets.Lamount);
      localStorage.setItem("loanpercentage", response.data.user.loandets.Percentage + '%');
    if(response.data.user.LoanRequest===true){
    }
    if(response.data.user.LoanActive===true){
        const mdate =response.data.user.LoanDateData.dateOfMaturity.split(' ');
        console.log(response,mdate);
        loanDue.innerHTML=`${localStorage.getItem('loanDue')}`;
        loanbalance.innerHTML=`${localStorage.getItem('loanbalance')}`;
        loanfinanced.innerHTML=`${localStorage.getItem('loanfinanced')}`;
        loanpercentage.innerHTML=`${localStorage.getItem('loanpercentage')}`;
        loanmature.innerHTML=`${mdate[0]}/${mdate[1]}/${mdate[2]}/${mdate[3]}`;
    }
    else if(response.data.user.LoanRequest===false && response.data.user.LoanActive===false){
        window.location.replace('../app/loan.html')
        
    }
}

startAppData()

const repayLoanForm = _("#repayLoanForm");
const repayLoanFormBtn = _("#repayLoanForm button.btn");
if (repayLoanForm) {
  repayLoanForm.addEventListener("submit", e => {
    e.preventDefault();

    repayLoanFormBtn.setAttribute("disabled", true);
    repayLoanFormBtn.innerHTML = `<img src="/app/img/835.gif" width="20">`;

    const body = {
      amount: Number(_("#lAmount").value)
    }

    localStorage.setItem("loanAmount", currencyFormat(body.amount));

    axios.post(`api/v1/paynowloan/loan/${localStorage.getItem('userid')}`, body)
    .then(response => {
      
      repayLoanFormBtn.removeAttribute("disabled");
      repayLoanFormBtn.innerHTML = `Continue`;
      location.replace('../app/payment-loan.html');
    })
    .catch(error => {
    })

  })
}