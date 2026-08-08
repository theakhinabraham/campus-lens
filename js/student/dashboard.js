/* =========================================
   CAMPUSLENS STUDENT DASHBOARD
   ========================================= */


const issues = CampusLens.getIssues();


// =========================================
// ACTIVE ISSUES
// =========================================

const activeIssues = issues.filter(
    issue => issue.status !== "resolved"
);


// =========================================
// RESOLVED ISSUES
// =========================================

const resolvedIssues = issues.filter(
    issue => issue.status === "resolved"
);


// =========================================
// HIGH PRIORITY ISSUES
// =========================================

const highPriorityIssues = issues.filter(
    issue =>
        issue.severity === "high" &&
        issue.status !== "resolved"
);


// =========================================
// UPDATE STAT CARDS
// =========================================

const statValues =
    document.querySelectorAll(".stat-value");


// Campus Pulse

if (statValues[0]) {

    const pulse =
        Math.max(
            0,
            100 - (activeIssues.length * 5)
        );

    statValues[0].textContent =
        pulse;

}


// Active Issues

if (statValues[1]) {

    statValues[1].textContent =
        activeIssues.length;

}


// My Reports

if (statValues[2]) {

    const myReports =
        CampusLens.getMyReports(
            "Akhin Abraham"
        );

    statValues[2].textContent =
        myReports.length;

}


// Resolved

if (statValues[3]) {

    statValues[3].textContent =
        resolvedIssues.length;

}