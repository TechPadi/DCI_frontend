function _(str) {
    return document.querySelector(str);
}
let tableTd;
// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;
  
const renewInvest = _("#renewInvest");

renewInvest.innerHTML = `You invested <code>${localStorage.getItem('dataPrice')}</code> 
<br>For <code>${localStorage.getItem('dataName')} Biannual Monthly Investment</code> 
<br>Proceed with package renewal below, make sure to read the terms of downgrade.`;

// const userProfile = _("#userProfile");

userProfile.innerHTML = `
      <span class="mr-2 d-none d-lg-inline text-gray-600 small">${localStorage.getItem('name')}</span>
      <img class="img-profile rounded-circle" src=${localStorage.getItem('userAvatar')}>
      `;




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

const showTable = () => {
    _("#upgradePack").style.display = "none";
}

const hideTable = () => {
    _("#upgradePack").style.display = "block";
}

const packagesLink = document.querySelectorAll("a.nav-link.collapsed");
packagesLink.forEach(packageLink => {
    packageLink.addEventListener("click", () => {
        // console.log(_("#upgradePack"));
        showTable();

        _(".btn.btn-primary.btn-icon-split.back").addEventListener("click", hideTable);

        const tables = document.querySelectorAll(".table");
        tables.forEach(table => {
            let tab = table;
            // console.log(tab);
            let tbody = tab.children[1];
            // console.log(tbody);
            let tdInvest
            let trs = Array.from(tbody.children);
            // console.log(trs[0]);
            trs.forEach((tr) => {
                let tds = Array.from(tr.children);
                tdInvest = tds.filter(td => td.classList.contains("invest"));
                 
                // return tdInvest;
                // console.log(tdInvest[0]);
                tableTd = tdInvest[0];
                // console.log(tableTd);
                // if(tdInvest.innerHTML > parseInt(localStorage.getItem('dataPrice'))) {
                if(tableTd.innerHTML > 300000) {
                    // tableTd.classList=[]
                    // console.log(table);
                    // console.log(tableTd.parentElement);
                    tableTd.style.display = "block";


                    // let trTable = tableTd.parentElement;
                    
                    // console.log(trTable);
    
                    tableTd.addEventListener("click", getPackages);
    
                    // 
                    // 
                } else {
                    tableTd.parentElement.style.display = "none"
                }
                // console.log(trs);
                // const price = document.querySelector(tab + " tbody tr");
                // console.log(price);
            })
            // console.log(tdInvest);
            
        });
        // console.log(tables)
    });
    
});
// console.log(packageLink);

const getPackages = event => {
    // tableTd.classList=[]
    let newEl = [];
    let tdParent = event.target.parentElement;
    console.log();
        
        // tdParent.addClass('tr-active');
    if(tdParent.classList.contains("tr-active")) {
        tdParent.classList.remove("tr-active");
        newEl = [];
        console.log(newEl);
    } else {
        tdParent.classList.add("tr-active");
        Array.from(tdParent.children)
        .forEach(item => {

            let x = item;

            newEl.push(x.innerHTML);

            return newEl
        })
        console.log(newEl);
    }
    



    
    
}