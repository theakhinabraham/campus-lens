const STORAGE_KEY = "campuslens-current-user";

const CURRENT_USER = {
    name: "Akhin Abraham",
    role: "Student",
    initials: "AA",
    image: ""
};

function loadStoredUser() {
    try {
        const storedUser = localStorage.getItem(STORAGE_KEY);

        if (!storedUser) {
            return;
        }

        const parsedUser = JSON.parse(storedUser);

        Object.assign(CURRENT_USER, parsedUser, {
            initials: parsedUser.initials || getInitials(parsedUser.name || CURRENT_USER.name)
        });
    } catch (error) {
        console.error("Unable to load saved profile", error);
    }
}

function saveUserProfile() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(CURRENT_USER));
    } catch (error) {
        console.error("Unable to save profile", error);
    }
}

function getCurrentUser() {
    return CURRENT_USER;
}

function getInitials(name) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0])
        .join("")
        .toUpperCase();
}

function compressImage(file, maxWidth = 220, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const image = new Image();

            image.onload = () => {
                const canvas = document.createElement("canvas");
                const ratio = Math.min(1, maxWidth / Math.max(image.width, image.height));
                canvas.width = Math.max(1, Math.round(image.width * ratio));
                canvas.height = Math.max(1, Math.round(image.height * ratio));

                const context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL("image/jpeg", quality));
            };

            image.onerror = () => reject(new Error("Unable to read image"));
            image.src = event.target.result;
        };

        reader.onerror = () => reject(new Error("Unable to read file"));
        reader.readAsDataURL(file);
    });
}

function updateUserProfile() {

    const nameElements = document.querySelectorAll("[data-user-name]");
    const roleElements = document.querySelectorAll("[data-user-role]");
    const initialsElements = document.querySelectorAll("[data-user-initials]");
    const avatarElements = document.querySelectorAll("[data-user-avatar], [data-user-initials]");

    nameElements.forEach(element => {
        element.textContent = CURRENT_USER.name;
    });

    roleElements.forEach(element => {
        element.textContent = CURRENT_USER.role;
    });

    initialsElements.forEach(element => {
        element.textContent = getInitials(CURRENT_USER.name);
    });

    avatarElements.forEach(element => {
        if (CURRENT_USER.image) {
            element.style.backgroundImage = `url(${CURRENT_USER.image})`;
            element.style.backgroundSize = "cover";
            element.style.backgroundPosition = "center";
            element.textContent = "";
        } else {
            element.style.backgroundImage = "none";
            element.textContent = getInitials(CURRENT_USER.name);
        }
    });

}

function openProfileDrawer() {

    const existingDrawer = document.getElementById("profileDrawer");

    if (existingDrawer) {
        existingDrawer.classList.remove("open");
        setTimeout(() => existingDrawer.remove(), 220);
        return;
    }

    const drawer = document.createElement("aside");
    drawer.id = "profileDrawer";
    drawer.className = "profile-drawer";

    drawer.innerHTML = `
        <div class="profile-drawer-header">
            <h3>Profile</h3>
            <button type="button" class="profile-drawer-close">×</button>
        </div>

        <div class="profile-drawer-body">
            <div class="profile-drawer-avatar" data-profile-avatar>
                ${CURRENT_USER.image ? "" : getInitials(CURRENT_USER.name)}
            </div>

            <label class="profile-drawer-label" for="profileImageInput">
                Profile image
            </label>
            <input id="profileImageInput" class="profile-drawer-input" type="file" accept="image/*">

            <label class="profile-drawer-label" for="profileNameInput">
                Name
            </label>
            <input id="profileNameInput" class="profile-drawer-input" type="text" value="${CURRENT_USER.name}" maxlength="40">

            <label class="profile-drawer-label" for="profileRoleInput">
                Role
            </label>
            <input id="profileRoleInput" class="profile-drawer-input" type="text" value="${CURRENT_USER.role}" maxlength="30">

            <div class="profile-drawer-actions">
                <button type="button" class="profile-drawer-cancel">Cancel</button>
                <button type="button" class="profile-drawer-save">Save</button>
            </div>
        </div>
    `;

    document.body.appendChild(drawer);

    const imageInput = document.getElementById("profileImageInput");
    const nameInput = document.getElementById("profileNameInput");
    const roleInput = document.getElementById("profileRoleInput");
    const closeButton = drawer.querySelector(".profile-drawer-close");
    const cancelButton = drawer.querySelector(".profile-drawer-cancel");
    const saveButton = drawer.querySelector(".profile-drawer-save");
    const avatarPreview = drawer.querySelector("[data-profile-avatar]");

    imageInput.addEventListener("change", async () => {
        const file = imageInput.files[0];

        if (!file) {
            return;
        }

        try {
            const compressedImage = await compressImage(file);
            CURRENT_USER.image = compressedImage;
            saveUserProfile();
            avatarPreview.style.backgroundImage = `url(${compressedImage})`;
            avatarPreview.style.backgroundSize = "cover";
            avatarPreview.style.backgroundPosition = "center";
            avatarPreview.textContent = "";
            updateUserProfile();
        } catch (error) {
            console.error("Image compression failed", error);
        }
    });

    const closeDrawer = () => {
        drawer.classList.remove("open");
        setTimeout(() => drawer.remove(), 220);
    };

    closeButton.addEventListener("click", closeDrawer);
    cancelButton.addEventListener("click", closeDrawer);

    saveButton.addEventListener("click", () => {

        const nextName = nameInput.value.trim();
        const nextRole = roleInput.value.trim();

        if (!nextName) {
            nameInput.focus();
            return;
        }

        CURRENT_USER.name = nextName;
        CURRENT_USER.role = nextRole || CURRENT_USER.role;
        CURRENT_USER.initials = getInitials(nextName);
        saveUserProfile();
        updateUserProfile();
        closeDrawer();

    });

    requestAnimationFrame(() => drawer.classList.add("open"));

}

document.addEventListener("DOMContentLoaded", () => {

    loadStoredUser();
    updateUserProfile();

    const profileCards = document.querySelectorAll(".user-profile");

    profileCards.forEach(card => {
        card.addEventListener("click", (event) => {
            if (event.target.closest("button")) {
                return;
            }
            openProfileDrawer();
        });
    });

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
