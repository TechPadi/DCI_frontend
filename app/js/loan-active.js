axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

function currencyFormat(num) {
  return `₦${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
}

const loanbalance = document.getElementById('loan-balance')
const loanDue = document.getElementById('amount-due')
const loanfinanced = document.getElementById('amount-given')
const loanpercentage = document.getElementById('loan-percentage')
const loanmature = document.getElementById('loan-maturity-date')
const userName =document.getElementById('userName')



async function startAppData(params) {
    const response = await axios({
        method: 'post',
        url: `api/v1/user/dashboarduser/${localStorage.getItem('userid')}`,
        headers:{
          Authorization: `Bearer ${localStorage.getItem('usertoken')}`
        }
      });
    userName.innerHTML=response.data.user.fullname
    if(response.data.user.LoanRequest===true){
    }
    if(response.data.user.LoanActive===true){
        const mdate =response.data.user.LoanDateData.dateOfMaturity.split(' ');
        console.log(response,mdate);
        loanDue.innerHTML=currencyFormat(response.data.user.amountToRepay);
        loanbalance.innerHTML=currencyFormat(response.data.user.amountToRepayBalance);
        loanfinanced.innerHTML=response.data.user.loandets.Lamount;
        loanpercentage.innerHTML=response.data.user.loandets.Percentage + '%';
        loanmature.innerHTML=`${mdate[0]}/${mdate[1]}/${mdate[2]}/${mdate[3]}`;
    }
    else if(response.data.user.LoanRequest===false && response.data.user.LoanActive===false){
        window.location.replace('../app/loan.html')
        
    }
}

startAppData()