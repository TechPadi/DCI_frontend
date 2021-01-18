// javascript file for the api calls

// function for grabbing ids
function _(str) {
  return document.querySelector(str);
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
          Lamount: _("#Lamount").value,
          Luse: _("#Luse").value,
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

          ;

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


// Investment api call
const packages = [
  {
    dataName: _("#bron1 td.name").textContent,
    dataPrice: _("#bron1 td.invest").textContent,
    MonthlyROI: `${(!_("#bron1 td.mroi"))?null:_("#bron1 td.mroi").textContent}`,
    TotalReturn: _("#bron1 td.troi").textContent,
    TotalROI: _("#bron1 td.tcroi").textContent
  },
  {
   dataName: _("#bron2 td.name").textContent,
    dataPrice: _("#bron2 td.invest").textContent,
    MonthlyROI: `${(!_("#bron2 td.mroi"))?null:_("#bron2 td.mroi").textContent}`,
    TotalReturn: _("#bron2 td.troi").textContent,
    TotalROI: _("#bron2 td.tcroi").textContent
  },
  {
   dataName: _("#bron3 td.name").textContent,
    dataPrice: _("#bron3 td.invest").textContent,
    MonthlyROI: `${(!_("#bron3 td.mroi"))?null:_("#bron3 td.mroi").textContent}`,
    TotalReturn: _("#bron3 td.troi").textContent,
    TotalROI: _("#bron3 td.tcroi").textContent
  },
  {
   dataName: _("#bron4 td.name").textContent,
    dataPrice: _("#bron4 td.invest").textContent,
    MonthlyROI: `${(!_("#bron4 td.mroi"))?null:_("#bron4 td.mroi").textContent}`,
    TotalReturn: _("#bron4 td.troi").textContent,
    TotalROI: _("#bron4 td.tcroi").textContent
  },
  {
   dataName: _("#bron5 td.name").textContent,
    dataPrice: _("#bron5 td.invest").textContent,
    MonthlyROI: `${(!_("#bron5 td.mroi"))?null:_("#bron5 td.mroi").textContent}`,
    TotalReturn: _("#bron5 td.troi").textContent,
    TotalROI: _("#bron5 td.tcroi").textContent
  },
  {
   dataName: _("#silver1 td.name").textContent,
    dataPrice: _("#silver1 td.invest").textContent,
    MonthlyROI: `${(!_("#silver1 td.mroi"))?null:_("#silver1 td.mroi").textContent}`,
    TotalReturn: _("#silver1 td.troi").textContent,
    TotalROI: _("#silver1 td.tcroi").textContent
  },
  {
   dataName: _("#silver2 td.name").textContent,
    dataPrice: _("#silver2 td.invest").textContent,
    MonthlyROI: `${(!_("#silver2 td.mroi"))?null:_("#silver2 td.mroi").textContent}`,
    TotalReturn: _("#silver2 td.troi").textContent,
    TotalROI: _("#silver2 td.tcroi").textContent
  },
  {
   dataName: _("#gold1 td.name").textContent,
    dataPrice: _("#gold1 td.invest").textContent,
    MonthlyROI: `${(!_("#gold1 td.mroi"))?null:_("#gold1 td.mroi").textContent}`,
    TotalReturn: _("#gold1 td.troi").textContent,
    TotalROI: _("#gold1 td.tcroi").textContent
  },
  {
   dataName: _("#gold2 td.name").textContent,
    dataPrice: _("#gold2 td.invest").textContent,
    MonthlyROI: `${(!_("#gold2 td.mroi"))?null:_("#gold2 td.mroi").textContent}`,
    TotalReturn: _("#gold2 td.troi").textContent,
    TotalROI: _("#gold2 td.tcroi").textContent
  },
  {
   dataName: _("#diamond1 td.name").textContent,
    dataPrice: _("#diamond1 td.invest").textContent,
    MonthlyROI: `${(!_("#diamond1 td.mroi"))?null:_("#diamond1 td.mroi").textContent}`,
    TotalReturn: _("#diamond1 td.troi").textContent,
    TotalROI: _("#diamond1 td.tcroi").textContent
  },
  {
   dataName: _("#diamond2 td.name").textContent,
    dataPrice: _("#diamond2 td.invest").textContent,
    MonthlyROI: `${(!_("#diamond2 td.mroi"))?null:_("#diamond2 td.mroi").textContent}`,
    TotalReturn: _("#diamond2 td.troi").textContent,
    TotalROI: _("#diamond2 td.tcroi").textContent
  },
  {
   dataName: _("#plat1 td.name").textContent,
    dataPrice: _("#plat1 td.invest").textContent,
    MonthlyROI: `${(!_("#plat1 td.mroi"))?null:_("#plat1 td.mroi").textContent}`,
    TotalReturn: _("#plat1 td.troi").textContent,
    TotalROI: _("#plat1 td.tcroi").textContent
  }
]

console.log(packages);

const investForm = _("#investForm");
const tables = document.querySelectorAll('table');
if (tables) {
  tables.forEach(table => {
    table.addEventListener('click', event => {

      let newEl = [];

      let tr = event.target.parentElement;
      console.log(tr);
      tr.classList.add = "tr-active"

      Array.from(event.target.parentElement.children)
        .forEach(item => {

          let x = item;

          newEl.push(x.innerHTML);

          return newEl
        })
      console.log(newEl);  
      const newPackage = packages.filter( package => {
          return package.dataPrice === newEl[2]
      });
      console.log(newPackage);

      if (investForm) {
        investForm.addEventListener("submit", e => {
          e.preventDefault();
          const body = {
            nextOfKins: _("#nextOfKins").value,
            relationship: _("#relationship").value,
            address: _("#address").value,
            phone: _("#phone").value,
            dataName: newPackage[0].dataName,
            dataPrice: parseInt(newPackage[0].dataPrice),
            MonthlyROI: parseInt( newPackage[0].MonthlyROI),
            TotalROI: parseInt(newPackage[0].TotalReturn),
            TotalReturn: parseInt(newPackage[0].TotalROI),
            ACnumber: _("#ACnumber").value,
            ACname: _("#ACname").value,
            ACbank: _("#ACbank").value
          }

          console.log(body);

          localStorage.setItem("dataPrice", body.dataPrice);
          localStorage.setItem("dataName", body.dataName);
          localStorage.setItem("accNum", body.ACnumber);
          localStorage.setItem("accName", body.ACname);
          localStorage.setItem("accBank", body.ACbank);
          

          
          axios.put(`api/v1/plans/${localStorage.getItem('userid')}/pickedplan`, body)
          .then(response => {

            

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `${response.data.message}`,
              showConfirmButton: false,
              timer: 1500
            });

            location.replace('/app/payment.html')
          })
          .catch(error => {
            
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: `${error.message}`,
              showConfirmButton: false,
              timer: 1500
            });
          });
        });
      }
    });
  });
}
