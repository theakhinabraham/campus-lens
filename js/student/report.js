const reportForm = document.getElementById("reportForm");
const description = document.getElementById("description");
const characterCount = document.getElementById("characterCount");


// =========================================
// CHARACTER COUNTER
// =========================================

description.addEventListener("input", () => {

    characterCount.textContent = description.value.length;

});


// =========================================
// FORM SUBMISSION
// =========================================

reportForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const formData = new FormData(reportForm);

    const report = {

        id: Date.now(),

        category: formData.get("category"),

        location: formData.get("location"),

        specificLocation: formData.get("specificLocation"),

        title: formData.get("title"),

        description: formData.get("description"),

        severity: formData.get("severity"),

        status: "reported",

        createdAt: new Date().toISOString(),

        reportedBy: "Akhin Abraham"

    };


    console.log("New CampusLens report:", report);


    alert(
        "Your issue has been reported successfully!"
    );


    reportForm.reset();

    characterCount.textContent = "0";

}); 