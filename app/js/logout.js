function _(str) {
    return document.querySelector(str);
}
  
  
// Set base url using axios global defaults
axios.defaults.baseURL = `https://dcibackend.herokuapp.com/`;

const logout = () => {


        Swal.fire({
            title: 'Are you sure you want to logout?',
            showDenyButton: true,
            confirmButtonText: `Logout`,
            denyButtonText: `Cancel`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
            Swal.fire('Logout Successful!', '', 'success');
            
            localStorage.clear("userid")
            localStorage.clear("name")
            localStorage.clear("usertoke")
        
            window.location.href = '../../index.html';

            } else if (result.isDenied) {
            Swal.fire('Welcome Back', '', 'info')
            }
        });

}
     