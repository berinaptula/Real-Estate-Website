const toggleSidebarBtn = document.querySelector('.sidebar__toggle')
const sidebarContent = document.querySelector('.sidebar__content')
const sidebar = document.querySelector('.sidebar')
toggleSidebarBtn.addEventListener('click', (e) => {
    sidebarContent.classList.toggle("hidden");
    sidebar.classList.toggle("width")
    if (sidebar.classList.contains("hidden")) {
        toggleSidebarBtn.innerHTML = `<i class="fas fa-angle-right"></i>`
    } else {
        toggleSidebarBtn.innerHTML = `<i class="fas fa-angle-left"></i>`
    }


})
window.addEventListener('resize', () => {
    innerWidth > 650 ? sidebarContent.classList.remove('hidden') : sidebarContent.classList.add('hidden')
    innerWidth > 650 ? sidebar.classList.remove('width') : sidebar.classList.add('width')
})