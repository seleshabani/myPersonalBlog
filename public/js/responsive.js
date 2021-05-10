const menuTogler = document.querySelector('.menu-toggler')
const closeIcon = document.querySelector('.close');
const menuMobile = document.querySelector('.menu-mobile');

menuTogler.addEventListener('click',()=>{
    menuMobile.style.animation = 'slideIn 300ms linear';
    menuMobile.style.display = 'flex';
})

closeIcon.addEventListener('click',()=>{
    menuMobile.style.animation = 'slideOut 300ms linear';
    setTimeout(()=>{
        menuMobile.style.display = "none";
    },300)
})