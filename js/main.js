const regForms = Array.from(document.querySelectorAll('.user')) ;
const progressCircle = Array.from(document.querySelectorAll('.circle'));
const progressCircle2 = Array.from(document.querySelectorAll('.progress'));

console.log('Hellow');

regForms.forEach((curr, index) => {

    curr.addEventListener('submit', (e) => {
        e.preventDefault();
        curr.classList.toggle('show');
        curr.nextElementSibling.classList.toggle('show');
        
        progressCircle[index + 1].classList = 'circle done2';

    })
    
});

let loans = Array.from(document.querySelectorAll('.loans'));

loans.forEach((curr, index, arr) => {

    let btn = curr.querySelector('.btn');

    if(index == 0){
        btn = Array.from(curr.querySelectorAll('.nav-link'));

        btn.forEach(cur => {
            cur.addEventListener('click', () => {
                curr.classList.toggle('show');
                curr.nextElementSibling.classList.toggle('show');
                progressCircle[index + 1].classList = 'circle done2';
            })
        })
    } else if(index === arr.length-1) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

        });
    } else {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            curr.classList.toggle('show');
            curr.nextElementSibling.classList.toggle('show');
            progressCircle[index + 1].classList = 'circle done2';

            // console.log(arr.length);
            // console.log(index);

        });
    }
});


{
    const package = Array.from(document.querySelectorAll('.package'));
    const table1 = Array.from(document.querySelectorAll('.table'));
    
    package.forEach((curr,index,all) => {
        let buttons = document.querySelector('.buttons');
        

        curr.querySelector('.nav-link').addEventListener('click', () => {
            
            curr.parentElement.parentElement.classList.toggle('user')
            table1[index].classList.toggle('show');
            buttons.classList.toggle('show');

            buttons.querySelector('.back').onclick = (e) => {
                e.preventDefault();

                curr.parentElement.parentElement.classList.toggle('user')
                table1[index].classList.toggle('show');
                buttons.classList.toggle('show');
    
            }
        });

        table1.forEach((curr, index, all) => {
            let tableRow = Array.from(curr.querySelectorAll('tr'));

            tableRow.forEach((curr,index,arr) => {
                let checktable = tableRow.every(a => {
                    a.classList = '';
                })
                
                curr.addEventListener('click', () => {

                        for(let i = 0; i < arr.length; i++) {
                            if(curr.classList === ''){
                                curr. classList.toggle('bg-primary');
                                continue
                            } else {
                               arr[i].classList = '' ;
                            }
                            
                        }

                   
                })
            })
        })
    })
}

{
    let loaner = Array.from(document.querySelectorAll('.loanss'));
    loaner.forEach((curr,index,arr) => {

        if(index === arr.length-1){
            curr.querySelector('.btn').addEventListener('click', (e) => {
                e.preventDefault();
                
                curr.querySelector('.btn').setAttribute('data-toggle','modal');
                curr.querySelector('.btn').setAttribute('data-target','#successModal');

                setTimeout(changePage, 1500, curr);
                // window.location.href ='invest.html';

                function changePage(a){
                    window.location.href ='invest.html';
                };
            });
        } else {
            curr.querySelector('.btn').addEventListener('click', (e) => {
                e.preventDefault();
                curr.classList.toggle('show');
                curr.nextElementSibling.classList.toggle('show');
    
                arr.lastIndexOf(curr.cl);
            });
        }
        

        
    })
}
