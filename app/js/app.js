// javascript file for the api calls
$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(100)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});

// function for grabbing ids
function _(str) {
  return document.querySelector(str);
}

function currencyFormat(num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

userProfile.innerHTML = `
      <span class="mr-2 d-none d-lg-inline text-gray-600 small">${localStorage.getItem(
        "name"
      )}</span>
      <img class="img-profile rounded-circle" src=${localStorage.getItem(
        "userAvatar"
      )}>
      `;

// Savings api call
const savingForm = document.getElementById("savingForm");

console.log(savingForm);
if (savingForm) {
  savingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = _("#amount").value;

    if (amount < 500) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `500 is the minimum amount`,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      axios
        .post(`api/v1/add/savings/${localStorage.getItem("userid")}`, {
          amount: amount,
        })
        .then((response) => {
          localStorage.setItem("saveAmount", amount);

          location.replace("/app/payment-save.html");
        })
        .catch((error) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 2000,
          });
        });
    }
  });
}

// Loans api call

const progressCircle2 = Array.from(document.querySelectorAll(".progress"));

const form1 = _("#form1");
const form2 = _("#form2");
const form3 = _("#form3");
const form4 = _("#form4");
const docForm = _("#docForm");
const investLoan = _("#investLoan");
const investLoanBtn = _("#investLoan button.btn");
const docFormBtn = _("#docForm button.btn");
const loanDetails = _("#detForm");
const loanDetailsBtn = _("#detForm button.btn");
let index = 0;

const checkInvestorLoanAmount = () => {
  if (_("#invAmt").value > localStorage.getItem("dataPrice")) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `The loan amount should not be more than the amount used for investment`,
      showConfirmButton: false,
      timer: 4000,
    });
  }
};

const checkID = (id) => {
  if (id === "t4") {
    form1.classList.remove("show");
    form4.classList.add("show");

    progressCircle[index].classList.add("done2");
    progressCircle[index + progressCircle.length - 1].classList.add("done2");

    // code for investor form here

    if (investLoan) {
      investLoan.addEventListener("submit", (e) => {
        e.preventDefault();

        investLoanBtn.setAttribute("disabled", true);
        investLoanBtn.innerHTML = `<img src="/app/img/835.gif" width="20">`;

        const investorLoan = {
          Ltype: "t4",
          Percentage: 15,
        };

        let body = {
          Lamount: _("#invAmt").value,
          Luse: _("#invPup").value,
          Lemployer: _("#Lemployer").value,
          Lincome: _("#Lincome").value,
          id: `${localStorage.getItem("userid")}`,
          messageofknow: _("#messageofknow").value,
          Ltype: investorLoan.Ltype,
          Percentage: investorLoan.Percentage,
          Interval: 12,
        };

        const docBody = {
          CollateralType: "DCI Investment",
          CollateralWorth: `${localStorage.getItem("dataPrice")}`,
          OwnershipState: "Investor",
          CollateralLocation: "DCI",
          Propertydescription: "DCI Investment Plan",
          docimage: `${localStorage.getItem("idimage")}`,
        };

        axios
          .post(
            `api/v1/request/loan/dciinvestor/${localStorage.getItem("userid")}`,
            body
          )
          .then((response) => {
            investLoanBtn.removeAttribute("disabled");
            investLoanBtn.innerHTML = `Next`;

            axios
              .post(
                `api/v1/request/loan/docs/${localStorage.getItem("userid")}`,
                docBody
              )
              .then((response) => {});

            Swal.fire({
              position: "center",
              icon: "success",
              title: `${response.data.message}`,
              showConfirmButton: false,
              timer: 2000,
            });

            location.replace("/app/loan.html");
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: `${error.message}`,
              showConfirmButton: false,
              timer: 2000,
            });
          });
      });
    }
  } else {
    form1.classList.remove("show");
    form2.classList.add("show");

    progressCircle[index + 1].classList.add("done2");

    // code for second form here

    console.log(loanDetailsBtn);
    if (loanDetails) {
      loanDetails.addEventListener("submit", (e) => {
        e.preventDefault();

        loanDetailsBtn.setAttribute("disabled", true);
        loanDetailsBtn.innerHTML = `<img src="/app/img/835.gif" width="20">`;

        const loanDet = [
          {
            Ltype: "t1",
            Percentage: 20,
            Interval: 1,
          },
          {
            Ltype: "t2",
            Percentage: 15,
            Interval: 6,
          },
          {
            Ltype: "t3",
            Percentage: 10,
            Interval: 12,
          },
        ];

        const newLoanDet = loanDet.filter((det) => {
          return det.Ltype === id;
        });

        let body = {
          Lamount: _("#Lamount").value,
          Luse: _("#Luse").value,
          Lemployer: _("#Lemployer").value,
          Lincome: _("#Lincome").value,
          id: `${localStorage.getItem("userid")}`,
          messageofknow: _("#messageofknow").value,
          Ltype: newLoanDet[0].Ltype,
          Percentage: newLoanDet[0].Percentage,
          Interval: newLoanDet[0].Interval,
        };

        axios
          .post(
            `api/v1/request/loan/details/${localStorage.getItem("userid")}`,
            body
          )
          .then((response) => {
            loanDetailsBtn.removeAttribute("disabled");
            loanDetailsBtn.innerHTML = `Next`;

            Swal.fire({
              position: "center",
              icon: "success",
              title: `loan details recieved, now upload document to  continue`,
              showConfirmButton: false,
              timer: 5000,
            });

            form2.classList.remove("show");
            form3.classList.add("show");

            progressCircle[index + 1].classList.add("done2");
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: `${error.message}`,
              showConfirmButton: false,
              timer: 2000,
            });
          });
      });
    }

    if (docForm) {
      docForm.addEventListener("submit", (e) => {
        e.preventDefault();

        docFormBtn.setAttribute("disabled", true);
        docFormBtn.innerHTML = `<img src="/app/img/835.gif" width="20">`;

        let body = {
          CollateralType: _("#CollateralType").value,
          CollateralWorth: _("#CollateralWorth").value,
          OwnershipState: _("#OwnershipState").value,
          CollateralLocation: _("#CollateralLocation").value,
          Propertydescription: _("#Propertydescription").value,
          docimage: `${localStorage.getItem("idimage")}`,
        };

        axios
          .post(
            `api/v1/request/loan/docs/${localStorage.getItem("userid")}`,
            body
          )
          .then((response) => {
            docFormBtn.removeAttribute("disabled");
            docFormBtn.innerHTML = `Next`;
            Swal.fire({
              position: "center",
              icon: "success",
              title: `loan request successfull please wait for an admin to approve your loan`,
              showConfirmButton: false,
              timer: 5000,
            });
            setTimeout(() => {
              location.replace("/app/loan-active.html");
            }, 5000);
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: `${error.message}`,
              showConfirmButton: false,
              timer: 5000,
            });
          });
      });
    }
  }
};

let y;
uploadImage = async () => {
  var x = _("#myFile");
  let files = null;

  if ("files" in x) {
    if (x.files.length == 0) {
      alert("Select one or more files.");
    } else {
      for (var i = 0; i < x.files.length; i++) {
        files = x.files[i];
      }
    }
  }
  const data = new FormData();
  data.append("file", files);
  data.append("upload_preset", "node-app");

  let loader = _(".form-group-img span");
  loader.classList.toggle("d-none");
  docFormBtn.setAttribute("disabled", true);

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dxmrb9qlp/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const file = await res.json();
  if (file) {
    y = file;
    loader.classList.toggle("d-none");

    docFormBtn.removeAttribute("disabled");
  }
  localStorage.setItem("idimage", file.secure_url);
};
