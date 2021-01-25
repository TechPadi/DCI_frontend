uploadImage = async () =>{
    var x = document.getElementById("myFile");
    let files = null
    console.log("x",x)
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


    const res =await fetch("https://api.cloudinary.com/v1_1/dxmrb9qlp/image/upload",
    {
      method:"POST",
      body:data
    })
    const file = await res.json()
    console.log(file)
    localStorage.setItem("idimage",file.secure_url)
}

const userProfile2 = document.querySelector('#userProfile');
// userProfile.innerHTML = `
// <span class="mr-2 d-none d-lg-inline text-gray-600 small">${localStorage.getItem('name')}</span>
// <img class="img-profile rounded-circle" src="${localStorage.getItem('userAvatar')}">`

const progressCircle = Array.from(document.querySelectorAll('.circle'));

// const progressCircle2 = Array.from(document.querySelectorAll('.progress'));

let loans = Array.from(document.querySelectorAll('.loans'));

// loans.forEach((curr, index, arr) => {

//     let btn = curr.querySelector('.btn');

//     if(index == 0){
//         btn = Array.from(curr.querySelectorAll('.nav-link'));

//         btn.forEach(cur => {
//             cur.addEventListener('click', () => {
//                 curr.classList.toggle('show');
//                 curr.nextElementSibling.classList.toggle('show');
//                 progressCircle[index + 1].classList = 'circle done2';
//             })
//         })
//     } else if(index === arr.length-1) {
//         btn.addEventListener('click', (e) => {
//             e.preventDefault();

//         });
//     } else {
//         btn.addEventListener('click', (e) => {
//             e.preventDefault();

//             curr.classList.toggle('show');
//             curr.nextElementSibling.classList.toggle('show');
//             progressCircle[index + 1].classList = 'circle done2';

//             // console.log(arr.length);
//             // console.log(index);

//         });
//     }
// });


{
    const package = Array.from(document.querySelectorAll('.package'));
    const table1 = Array.from(document.querySelectorAll('.table'));
    
    package.forEach((curr,index) => {
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
        })
    })
}

// {
//   var loadFile = function(event) {
//     var image = document.getElementById('output');
//     image.src = URL.createObjectURL(event.target.files[0]);
//   };
// }
{

  var loadFile = function(event) {
    var image = document.getElementById('output2');
    let ggg;
    let galleryImg = `<p><img id="output2" width="200" /></p>`;
    image.src = URL.createObjectURL(event.target.files[0]);

    image.parentElement.append(galleryImg);
  };
  
}