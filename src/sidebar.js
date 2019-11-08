// Sidebar toggle button
const toggleSidebarBtn = document.querySelector('.sidebar__toggle')
const sidebarContent = document.querySelector('.sidebar__content')
const sidebar = document.querySelector('.sidebar')
toggleSidebarBtn.addEventListener('click', (e) => {
    // Toggle class of hidden and width when clicked the button
    sidebarContent.classList.toggle("hidden");
    // Width is to make the sidebar 0 width
    sidebar.classList.toggle("width")

    // If the sidebar has hidden class, button's text must be ">"
    if (sidebar.classList.contains("hidden")) {
        toggleSidebarBtn.innerHTML = `<i class="fas fa-angle-right"></i>`
    }
    // If the sidebar doesn't have hidden class, button's text must be "<"
    else {
        toggleSidebarBtn.innerHTML = `<i class="fas fa-angle-left"></i>`
    }
})

// In case users test from browser, automatically add and remove the hidden and width classes on resize below 650px of viewport
window.addEventListener('resize', () => {
    innerWidth > 650 ? sidebarContent.classList.remove('hidden') : sidebarContent.classList.add('hidden')
    innerWidth > 650 ? sidebar.classList.remove('width') : sidebar.classList.add('width')
})