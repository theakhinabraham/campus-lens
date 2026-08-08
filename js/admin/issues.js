/* =========================================
   CAMPUSLENS ADMIN ISSUE MANAGEMENT
   ========================================= */


const issueSearch =
    document.getElementById(
        "issueSearch"
    );


const severityFilter =
    document.getElementById(
        "severityFilter"
    );


const adminIssueList =
    document.getElementById(
        "adminIssueList"
    );


const adminIssuesEmpty =
    document.getElementById(
        "adminIssuesEmpty"
    );


const issueCount =
    document.getElementById(
        "issueCount"
    );


const statusButtons =
    document.querySelectorAll(
        ".issue-filter"
    );


let currentStatus =
    "all";


let currentSearch =
    "";


let currentSeverity =
    "all";


// =========================================
// LABELS
// =========================================

const locationNames = {

    "block-a": "Block A",

    "block-b": "Block B",

    "block-c": "Block C",

    library: "Library",

    cafeteria: "Cafeteria",

    auditorium: "Auditorium",

    sports: "Sports Complex"

};


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


const statusNames = {

    reported: "Reported",

    investigating: "Investigating",

    in_progress: "In Progress",

    resolved: "Resolved"

};


// =========================================
// GET ISSUES
// =========================================

function getIssues() {

    return CampusLens.getIssues();

}


// =========================================
// FILTER ISSUES
// =========================================

function getFilteredIssues() {

    const issues =
        getIssues();


    return issues.filter(
        issue => {


            // STATUS

            if (
                currentStatus !== "all" &&
                issue.status !== currentStatus
            ) {

                return false;

            }


            // SEVERITY

            if (
                currentSeverity !== "all" &&
                issue.severity !== currentSeverity
            ) {

                return false;

            }


            // SEARCH

            if (
                currentSearch
            ) {

                const searchText =
                    currentSearch
                        .toLowerCase();


                const searchableText = `

                    ${issue.title}

                    ${issue.description}

                    ${issue.location}

                    ${issue.category}

                `.toLowerCase();


                if (
                    !searchableText.includes(
                        searchText
                    )
                ) {

                    return false;

                }

            }


            return true;

        }
    );

}


// =========================================
// RENDER
// =========================================

function renderIssues() {

    const issues =
        getFilteredIssues();


    adminIssueList.innerHTML =
        "";


    issueCount.textContent =
        `${issues.length} ${
            issues.length === 1
                ? "issue"
                : "issues"
        }`;


    if (
        issues.length === 0
    ) {

        adminIssuesEmpty.classList.add(
            "visible"
        );

        return;

    }


    adminIssuesEmpty.classList.remove(
        "visible"
    );


    // Sort unresolved issues first

    issues.sort(
        (a, b) => {

            if (
                a.status === "resolved" &&
                b.status !== "resolved"
            ) {

                return 1;

            }


            if (
                a.status !== "resolved" &&
                b.status === "resolved"
            ) {

                return -1;

            }


            const severityRank = {

                high: 3,

                medium: 2,

                low: 1

            };


            return (
                (severityRank[b.severity] || 0) -
                (severityRank[a.severity] || 0)
            );

        }
    );


    issues.forEach(
        issue => {

            const row =
                document.createElement(
                    "article"
                );


            row.className =
                "admin-issue-row";


            row.dataset.issueId =
                issue.id;


            row.innerHTML = `

                <div class="admin-issue-main">

                    <div class="admin-issue-title">

                        ${escapeHTML(
                            issue.title
                        )}

                    </div>


                    <div class="admin-issue-meta">

                        <span>

                            ⌖
                            ${
                                locationNames[
                                    issue.location
                                ]
                                || issue.location
                            }

                        </span>


                        <span>

                            #
                            ${
                                categoryNames[
                                    issue.category
                                ]
                                || issue.category
                            }

                        </span>

                    </div>

                </div>


                <div class="admin-issue-severity">

                    <span
                        class="admin-severity-dot ${issue.severity}"
                    ></span>

                    ${
                        capitalize(
                            issue.severity
                        )
                    }

                </div>


                <div class="admin-issue-affected">

                    <strong>
                        ${
                            issue.reports || 1
                        }
                    </strong>

                    ${
                        (issue.reports || 1) === 1
                            ? "student"
                            : "students"
                    }

                </div>


                <span
                    class="issue-status ${issue.status}"
                >

                    ${
                        statusNames[
                            issue.status
                        ]
                        || issue.status
                    }

                </span>

            `;


            adminIssueList.appendChild(
                row
            );

        }
    );

}


// =========================================
// STATUS FILTER
// =========================================

statusButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                statusButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentStatus =
                    button.dataset.status;


                renderIssues();

            }
        );

    }
);


// =========================================
// SEARCH
// =========================================

issueSearch.addEventListener(
    "input",
    event => {

        currentSearch =
            event.target.value.trim();


        renderIssues();

    }
);


// =========================================
// SEVERITY FILTER
// =========================================

severityFilter.addEventListener(
    "change",
    event => {

        currentSeverity =
            event.target.value;


        renderIssues();

    }
);


// =========================================
// OPEN ISSUE
// =========================================

adminIssueList.addEventListener(
    "click",
    event => {

        const row =
            event.target.closest(
                ".admin-issue-row"
            );


        if (!row) {
            return;
        }


        window.location.href =
            `issue.html?id=${row.dataset.issueId}`;

    }
);


// =========================================
// HELPERS
// =========================================

function capitalize(
    value
) {

    if (!value) {
        return "";
    }


    return (
        value.charAt(0).toUpperCase() +
        value.slice(1)
    );

}


function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value ?? "";


    return div.innerHTML;

}


// =========================================
// INITIALIZE
// =========================================

renderIssues();