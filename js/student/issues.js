/* =========================================
   CAMPUSLENS ISSUES EXPLORER
   ========================================= */


const issuesList =
    document.getElementById("issuesList");

const issuesEmpty =
    document.getElementById("issuesEmpty");

const resultsCount =
    document.getElementById("resultsCount");

const searchInput =
    document.getElementById("issueSearch");

const categoryFilter =
    document.getElementById("categoryFilter");

const locationFilter =
    document.getElementById("locationFilter");

const statusFilter =
    document.getElementById("statusFilter");

const sortIssues =
    document.getElementById("sortIssues");


// =========================================
// CURRENT USER
// =========================================

const CURRENT_USER = "Akhin Abraham";


// =========================================
// FRIENDLY LABELS
// =========================================

const categoryNames = {

    infrastructure: "Infrastructure",

    wifi: "Wi-Fi / Network",

    cleanliness: "Cleanliness",

    water: "Water & Sanitation",

    electricity: "Electricity",

    ac: "Air Conditioning",

    cafeteria: "Cafeteria",

    accessibility: "Accessibility",

    other: "Other"

};


const locationNames = {

    "block-a": "Block A",

    "block-b": "Block B",

    "block-c": "Block C",

    library: "Library",

    cafeteria: "Cafeteria",

    auditorium: "Auditorium",

    sports: "Sports Complex"

};


const statusNames = {

    reported: "Reported",

    investigating: "Investigating",

    resolved: "Resolved"

};


// =========================================
// FORMAT TIME
// =========================================

function formatTime(dateString) {

    const date =
        new Date(dateString);

    const now =
        new Date();

    const difference =
        now - date;

    const minutes =
        Math.floor(
            difference / (1000 * 60)
        );

    if (minutes < 1) {
        return "Just now";
    }

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours =
        Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days =
        Math.floor(hours / 24);

    if (days === 1) {
        return "Yesterday";
    }

    return `${days}d ago`;

}


// =========================================
// SEVERITY RANK
// =========================================

function severityRank(severity) {

    const ranks = {

        high: 3,

        medium: 2,

        low: 1

    };

    return ranks[severity] || 0;

}


// =========================================
// GET FILTERED ISSUES
// =========================================

function getFilteredIssues() {

    let issues =
        CampusLens.getIssues();


    // Search

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    if (search) {

        issues = issues.filter(issue => {

            return (

                issue.title
                    .toLowerCase()
                    .includes(search)

                ||

                issue.description
                    .toLowerCase()
                    .includes(search)

            );

        });

    }


    // Category

    if (
        categoryFilter.value !== "all"
    ) {

        issues = issues.filter(
            issue =>
                issue.category ===
                categoryFilter.value
        );

    }


    // Location

    if (
        locationFilter.value !== "all"
    ) {

        issues = issues.filter(
            issue =>
                issue.location ===
                locationFilter.value
        );

    }


    // Status

    if (
        statusFilter.value !== "all"
    ) {

        issues = issues.filter(
            issue =>
                issue.status ===
                statusFilter.value
        );

    }


    // Sorting

    switch (sortIssues.value) {

        case "priority":

            issues.sort((a, b) => {

                return (
                    severityRank(b.severity) -
                    severityRank(a.severity)
                );

            });

            break;


        case "recent":

            issues.sort((a, b) => {

                return (
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                );

            });

            break;


        case "reports":

            issues.sort((a, b) => {

                return (
                    (b.reports || 1) -
                    (a.reports || 1)
                );

            });

            break;

    }


    return issues;

}


// =========================================
// RENDER ISSUES
// =========================================

function renderIssues() {

    const issues =
        getFilteredIssues();


    issuesList.innerHTML = "";


    resultsCount.textContent =
        `${issues.length} ${
            issues.length === 1
                ? "issue"
                : "issues"
        }`;


    if (issues.length === 0) {

        issuesEmpty.classList.add(
            "visible"
        );

        return;

    }


    issuesEmpty.classList.remove(
        "visible"
    );


    issues.forEach(issue => {

        const card =
            document.createElement("article");

        card.className =
            "issue-card";


        const userReports =
            JSON.parse(
                localStorage.getItem(
                    `campusLensConfirmed_${CURRENT_USER}`
                ) || "[]"
            );


        const confirmed =
            userReports.includes(
                String(issue.id)
            );


        card.innerHTML = `

            <div class="issue-main">

                <div class="issue-card-top">

                    <span class="issue-status ${issue.status}">
                        ${statusNames[issue.status] || issue.status}
                    </span>

                    <span class="issue-severity">

                        <span
                            class="issue-severity-dot ${issue.severity}"
                        ></span>

                        ${issue.severity}
                    </span>

                </div>


                <h3>
                    ${escapeHTML(issue.title)}
                </h3>


                <p class="issue-card-description">
                    ${escapeHTML(issue.description)}
                </p>


                <div class="issue-meta">

                    <span>
                        ⌖
                        ${locationNames[issue.location] || issue.location}
                    </span>

                    <span>
                        #
                        ${categoryNames[issue.category] || issue.category}
                    </span>

                    <span>
                        ${formatTime(issue.createdAt)}
                    </span>

                </div>

            </div>


            <div class="issue-actions">

                <span class="issue-reports">

                    ${issue.reports || 1}
                    ${
                        (issue.reports || 1) === 1
                            ? "student"
                            : "students"
                    }

                </span>


                <button
                    class="confirm-button ${
                        confirmed ? "confirmed" : ""
                    }"
                    data-id="${issue.id}"
                >

                    ${
                        confirmed
                            ? "✓ I've experienced this"
                            : "I've experienced this"
                    }

                </button>

            </div>

        `;


        issuesList.appendChild(card);

    });

}


// =========================================
// CONFIRM ISSUE
// =========================================

function confirmIssue(id) {

    const issues =
        CampusLens.getIssues();


    const issue =
        issues.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!issue) {
        return;
    }


    const storageKey =
        `campusLensConfirmed_${CURRENT_USER}`;


    let confirmedIssues =
        JSON.parse(
            localStorage.getItem(
                storageKey
            ) || "[]"
        );


    const issueId =
        String(id);


    // Already confirmed

    if (
        confirmedIssues.includes(
            issueId
        )
    ) {

        confirmedIssues =
            confirmedIssues.filter(
                item =>
                    item !== issueId
            );

        issue.reports =
            Math.max(
                1,
                (issue.reports || 1) - 1
            );

    }

    // New confirmation

    else {

        confirmedIssues.push(
            issueId
        );

        issue.reports =
            (issue.reports || 1) + 1;

    }


    localStorage.setItem(
        storageKey,
        JSON.stringify(
            confirmedIssues
        )
    );


    CampusLens.updateIssue(
        issue.id,
        {
            reports: issue.reports
        }
    );


    renderIssues();

}


// =========================================
// EVENT LISTENERS
// =========================================

searchInput.addEventListener(
    "input",
    renderIssues
);

categoryFilter.addEventListener(
    "change",
    renderIssues
);

locationFilter.addEventListener(
    "change",
    renderIssues
);

statusFilter.addEventListener(
    "change",
    renderIssues
);

sortIssues.addEventListener(
    "change",
    renderIssues
);


issuesList.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".confirm-button"
            );


        if (!button) {
            return;
        }


        confirmIssue(
            button.dataset.id
        );

    }
);


// =========================================
// HTML ESCAPING
// =========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


// =========================================
// INITIAL RENDER
// =========================================

renderIssues();