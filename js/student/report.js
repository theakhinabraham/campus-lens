const reportForm = document.getElementById("reportForm");

const description =
    document.getElementById("description");

const characterCount =
    document.getElementById("characterCount");


// =========================================
// CHARACTER COUNTER
// =========================================

description.addEventListener("input", () => {

    characterCount.textContent =
        description.value.length;

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
            "Akhin Abraham"

    };


    // Save to CampusLens data layer

    CampusLens.addIssue(report);


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


    // Return to dashboard

    window.location.href =
        "dashboard.html";

});