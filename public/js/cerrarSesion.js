function checkSession() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/pages/page-403.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loginIcon = document.getElementById('loginIcon');
    const token = localStorage.getItem('token');
    const navbar = document.querySelector('.navbar ul');

    if (token) {
        loginIcon.innerHTML = '<i class="fa fa-user-times"></i>';
        loginIcon.addEventListener('click', function() {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.href = '/login.html';
        });
        const miPerfilItem = document.createElement('li');
        miPerfilItem.innerHTML = '<a href="/pages/miperfil.html">Mi perfil</a>';
        navbar.insertBefore(miPerfilItem, loginIcon.parentElement);
    }
});