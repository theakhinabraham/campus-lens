/* =========================================
   CAMPUSLENS MY REPORTS
   ========================================= */


const CURRENT_USER =
    "Akhin Abraham";


const reportsList =
    document.getElementById(
        "reportsList"
    );


const reportsEmpty =
    document.getElementById(
        "reportsEmpty"
    );


const totalReports =
    document.getElementById(
        "totalReports"
    );


const activeReports =
    document.getElementById(
        "activeReports"
    );


const resolvedReports =
    document.getElementById(
        "resolvedReports"
    );


// =========================================
// LABELS
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

    in_progress: "In Progress",

    resolved: "Resolved"

};


// =========================================
// FORMAT DATE
// =========================================

function formatDate(
    dateString
) {

    return new Date(
        dateString
    ).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// =========================================
// GET USER REPORTS
// =========================================

function getMyReports() {

    const issues =
        CampusLens.getIssues();


    return issues
        .filter(issue => {

            return (
                issue.reportedBy ===
                CURRENT_USER
            );

        })
        .sort((a, b) => {

            return (
                new Date(b.createdAt) -
                new Date(a.createdAt)
            );

        });

}


// =========================================
// UPDATE STATS
// =========================================

function updateStats(
    reports
) {

    const total =
        reports.length;


    const active =
        reports.filter(issue => {

            return (
                issue.status === "reported" ||
                issue.status === "investigating" ||
                issue.status === "in_progress"
            );

        }).length;


    const resolved =
        reports.filter(issue => {

            return (
                issue.status === "resolved"
            );

        }).length;


    totalReports.textContent =
        total;


    activeReports.textContent =
        active;


    resolvedReports.textContent =
        resolved;

}


// =========================================
// RENDER
// =========================================

function renderReports() {

    const reports =
        getMyReports();


    updateStats(
        reports
    );


    reportsList.innerHTML = "";


    if (reports.length === 0) {

        reportsEmpty.classList.add(
            "visible"
        );

        return;

    }


    reportsEmpty.classList.remove(
        "visible"
    );


    reports.forEach(
        issue => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "report-card";


            card.dataset.issueId =
                issue.id;


            card.innerHTML = `

                <div>

                    <div class="issue-card-top">

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


                        <span class="issue-severity">

                            <span
                                class="issue-severity-dot ${issue.severity}"
                            ></span>

                            ${
                                issue.severity
                            }

                        </span>

                    </div>


                    <h3>
                        ${escapeHTML(issue.title)}
                    </h3>


                    <p class="report-card-description">

                        ${escapeHTML(
                            issue.description
                        )}

                    </p>


                    <div class="report-meta">

                        <span>
                            ⌖ ${
                                locationNames[
                                    issue.location
                                ]
                                || issue.location
                            }
                        </span>


                        <span>
                            # ${
                                categoryNames[
                                    issue.category
                                ]
                                || issue.category
                            }
                        </span>


                        <span>
                            ${
                                issue.reports || 1
                            }
                                ${
                                    (issue.reports || 1) === 1
                                        ? "student affected"
                                        : "students affected"
                                }
                        </span>

                    </div>

                </div>


                <div class="report-card-side">

                    <span class="report-date">

                        Reported
                        ${
                            formatDate(
                                issue.createdAt
                            )
                        }

                    </span>


                    <span>
                        →
                    </span>

                </div>

            `;


            reportsList.appendChild(
                card
            );

        }
    );

}


// =========================================
// OPEN REPORT
// =========================================

reportsList.addEventListener(
    "click",
    event => {

        const card =
            event.target.closest(
                ".report-card"
            );


        if (!card) {
            return;
        }


        const issueId =
            card.dataset.issueId;


        window.location.href =
            `issue.html?id=${issueId}`;

    }
);


// =========================================
// ESCAPE HTML
// =========================================

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

renderReports();