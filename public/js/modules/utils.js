let iconDashboard = document.querySelector('#dashboard');
let iconTransacciones = document.querySelector('#transacciones');
let iconUsuarios = document.querySelector('#usuarios');
let iconVehiculos = document.querySelector('#vehiculos');
let iconErrores = document.querySelector('#errores');
let iconPerfilCarga = document.querySelector('#perfil-carga');
const elementos = document.querySelectorAll('.sidebar-item');

iconDashboard.classList.add('active-sidebar');

iconDashboard.addEventListener('click', () => {
    elementos.forEach((elemento) => {
        elemento.classList.remove('active-sidebar');
    });
    iconDashboard.classList.toggle('active-sidebar');
});

iconTransacciones.addEventListener('click', () => {
    elementos.forEach((elemento) => {
        elemento.classList.remove('active-sidebar');
    });
    iconTransacciones.classList.toggle('active-sidebar');
});

iconUsuarios.addEventListener('click', () => {
    elementos.forEach((elemento) => {
        elemento.classList.remove('active-sidebar');
    });
    iconUsuarios.classList.toggle('active-sidebar');
});

iconVehiculos.addEventListener('click', () => {
    elementos.forEach((elemento) => {
        elemento.classList.remove('active-sidebar');
    });
    iconVehiculos.classList.toggle('active-sidebar');
});

iconErrores.addEventListener('click', () => {
    elementos.forEach((elemento) => {
        elemento.classList.remove('active-sidebar');
    });
    iconErrores.classList.toggle('active-sidebar');
});

iconPerfilCarga.addEventListener('click', () => {
    elementos.forEach((elemento) => {
        elemento.classList.remove('active-sidebar');
    });
    iconPerfilCarga.classList.toggle('active-sidebar');
});

const loadActiveSidebar = (location) => {
    var current = location.split('/').slice(-1)[0];
    if (current === '') return;
    var menuItems = document.querySelectorAll('.sidebar-link');
    //console.log(current);
    //console.log(menuItems);
    for (var i = 0, len = menuItems.length; i < len; i++) {
        if (
            menuItems[i].getAttribute('href') &&
            menuItems[i].getAttribute('href').indexOf(current) !== -1
        ) {
            //console.log(menuItems[i].getAttribute("href"));
            menuItems[i].parentElement.className += ' active-sidebar';
        }
    }
};
