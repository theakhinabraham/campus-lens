document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");
    const menuButton = document.querySelector(".mobile-menu-button");

    if (!sidebar || !menuButton) {
        return;
    }

    menuButton.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    document.addEventListener("click", (event) => {

        if (
            window.innerWidth > 900 ||
            !sidebar.classList.contains("open")
        ) {
            return;
        }

        const clickedInsideSidebar =
            sidebar.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);


        if (!clickedInsideSidebar && !clickedMenuButton) {
            sidebar.classList.remove("open");
        }

    });

});
