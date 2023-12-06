// const initialize = () => {
//     initializeSidebarCollapse();
// };
// const initializeSidebarCollapse = () => {
//     const sidebarElement = document.getElementsByClassName('js-simplebar')[0];
//     const sidebarToggleElement = document.getElementById('#rrow-btn')[0];

//     if (sidebarElement && sidebarToggleElement) {
//         sidebarToggleElement.addEventListener('click', () => {
//             sidebarElement.classList.toggle('collapsed');

//             sidebarElement.addEventListener('transitionend', () => {
//                 window.dispatchEvent(new Event('resize'));
//             });
//         });
//     }
// };

const body = document.querySelector('body');
let sidebar = body.querySelector('.sidebar-content');
let toggle = body.querySelector('#arrow-btn');
let ms5Element = body.querySelector('#main-targets');

toggle.addEventListener('click', () => {
    sidebar.classList.toggle('close');
    ms5Element.style.marginLeft = sidebar.classList.contains('close')
        ? '3rem'
        : '10.7rem';
});
