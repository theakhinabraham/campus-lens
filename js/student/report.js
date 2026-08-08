const reportForm = document.getElementById("reportForm");

const description =
    document.getElementById("description");

const characterCount =
    document.getElementById("characterCount");

const photoInput =
    document.getElementById("photo");

const uploadBox =
    document.querySelector(".upload-box");

// =========================================
// CHARACTER COUNTER
// =========================================

description.addEventListener("input", () => {

    characterCount.textContent =
        description.value.length;

});

// =========================================
// PHOTO UPLOAD
// =========================================

photoInput.addEventListener("change", () => {

    const file =
        photoInput.files[0];

    if (!file) {
        return;
    }


    // Validate file type

    const allowedTypes = [
        "image/png",
        "image/jpeg"
    ];

    if (!allowedTypes.includes(file.type)) {

        alert(
            "Please upload a PNG or JPG image."
        );

        photoInput.value = "";

        return;
    }


    // Validate file size

    const maxSize =
        5 * 1024 * 1024;

    if (file.size > maxSize) {

        alert(
            "Image must be smaller than 5MB."
        );

        photoInput.value = "";

        return;
    }


    // Update upload UI

    uploadBox.innerHTML = `

        <span class="upload-icon">
            ✓
        </span>

        <span>

            <strong>
                ${file.name}
            </strong>

            <small>
                Photo selected
            </small>

        </span>

    `;

});


// =========================================
// FORM SUBMISSION
// =========================================

reportForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const formData =
        new FormData(reportForm);


    // Create the issue

    const report = {

        id: Date.now(),

        category:
            formData.get("category"),

        location:
            formData.get("location"),

        specificLocation:
            formData.get("specificLocation"),

        title:
            formData.get("title"),

        description:
            formData.get("description"),

        severity:
            formData.get("severity"),

        status:
            "reported",

        reports:
            1,

        createdAt:
            new Date().toISOString(),

        reportedBy:
            getCurrentUser().name,

        photo:
            photoInput.files[0]
                ? {
                    name:
                        photoInput.files[0].name,

                    type:
                        photoInput.files[0].type,

                    size:
                        photoInput.files[0].size
                }
                : null

    };


    // Save to CampusLens data layer

    try {
        const storedIssues = JSON.parse(localStorage.getItem("campusLensIssues") || "[]");
        storedIssues.unshift(report);
        localStorage.setItem("campusLensIssues", JSON.stringify(storedIssues));
    } catch (error) {
        console.error("Unable to save issue", error);
    }

    if (CampusLens?.addIssue) {
        CampusLens.addIssue(report);
    }


    console.log(
        "Issue saved:",
        report
    );


    // Success message

    alert(
        "Your issue has been reported successfully!"
    );


    // Reset form

    reportForm.reset();

    characterCount.textContent = "0";

    uploadBox.innerHTML = `

    <span class="upload-icon">
        ↑
    </span>

    <span>

        <strong>
            Click to upload
        </strong>

        <small>
            PNG, JPG up to 5MB
        </small>

    </span>

`;


    // Return to dashboard

    window.location.href =
        "dashboard.html";

});