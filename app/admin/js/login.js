axios.defaults.baseURL = "https://dcibackend.herokuapp.com/";




document.getElementById('loginAdminForm').addEventListener("submit",
function handleLogin(e){

    e.preventDefault(); 
    const email = document.getElementById('email').value
const password = document.getElementById('password').value
    axios.post('api/v1/admin/login',{email,password})
    .then(res=>{
        localStorage.setItem("id",res.data.user._id)
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify(res.data.user))
        if(res.data.user.AdminType==="admin"){
            window.location.replace("./admin-dashboard.html")
        }
        else if(res.data.user.AdminType==="superadmin"){
            localStorage.setItem("id",res.data.user._id)
            window.location.replace("../super-admin/sup-admin-dashboard.html")
        }
        else{
            alert("You are using the wrong portal to register")
        }
    })
    .catch(err=>{
    })
})