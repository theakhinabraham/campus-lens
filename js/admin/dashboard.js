/* =========================================
   CAMPUSLENS ADMIN DASHBOARD
   ========================================= */


const totalIssues =
    document.getElementById(
        "totalIssues"
    );

const attentionIssues =
    document.getElementById(
        "attentionIssues"
    );

const investigatingIssues =
    document.getElementById(
        "investigatingIssues"
    );

const resolvedIssues =
    document.getElementById(
        "resolvedIssues"
    );

const priorityList =
    document.getElementById(
        "priorityList"
    );

const campusHealth =
    document.getElementById(
        "campusHealth"
    );

const recentReports =
    document.getElementById(
        "recentReports"
    );


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


const statusNames = {

    reported: "Reported",

    investigating: "Investigating",

    in_progress: "In Progress",

    resolved: "Resolved"

};


// =========================================
// SEVERITY RANK
// =========================================

function severityRank(
    severity
) {

    const ranks = {

        high: 3,

        medium: 2,

        low: 1

    };

    return ranks[severity] || 0;

}


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
            month: "short"
        }
    );

}


// =========================================
// LOAD ISSUES
// =========================================

function getIssues() {

    return CampusLens.getIssues();

}


// =========================================
// UPDATE STATS
// =========================================

function updateStats(
    issues
) {

    const total =
        issues.length;


    const attention =
        issues.filter(issue => {

            return (
                issue.status === "reported" ||
                (
                    issue.severity === "high" &&
                    issue.status !== "resolved"
                )
            );

        }).length;


    const investigating =
        issues.filter(issue => {

            return (
                issue.status === "investigating" ||
                issue.status === "in_progress"
            );

        }).length;


    const resolved =
        issues.filter(issue => {

            return issue.status === "resolved";

        }).length;


    totalIssues.textContent =
        total;


    attentionIssues.textContent =
        attention;


    investigatingIssues.textContent =
        investigating;


    resolvedIssues.textContent =
        resolved;

}


// =========================================
// PRIORITY ISSUES
// =========================================

function renderPriorityIssues(
    issues
) {

    priorityList.innerHTML = "";


    const priorityIssues =
        [...issues]
            .filter(issue => {

                return (
                    issue.status !== "resolved"
                );

            })
            .sort((a, b) => {

                const severityDifference =
                    severityRank(b.severity) -
                    severityRank(a.severity);


                if (
                    severityDifference !== 0
                ) {

                    return severityDifference;

                }


                return (
                    (b.reports || 1) -
                    (a.reports || 1)
                );

            })
            .slice(0, 5);


    if (
        priorityIssues.length === 0
    ) {

        priorityList.innerHTML = `

            <div class="empty-state">

                <p>
                    No active issues need attention.
                </p>

            </div>

        `;

        return;

    }


    priorityIssues.forEach(
        issue => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "priority-item";


            item.dataset.issueId =
                issue.id;


            item.innerHTML = `

                <span
                    class="priority-indicator ${issue.severity}"
                ></span>


                <div class="priority-content">

                    <div class="priority-title">

                        ${escapeHTML(
                            issue.title
                        )}

                    </div>


                    <div class="priority-meta">

                        ${
                            locationNames[
                                issue.location
                            ]
                            || issue.location
                        }

                        ·

                        ${
                            statusNames[
                                issue.status
                            ]
                            || issue.status
                        }

                    </div>

                </div>


                <span class="priority-count">

                    ${
                        issue.reports || 1
                    }

                    ${
                        (issue.reports || 1) === 1
                            ? "student"
                            : "students"
                    }

                </span>

            `;


            priorityList.appendChild(
                item
            );

        }
    );

}


// =========================================
// CAMPUS HEALTH
// =========================================

function renderCampusHealth(
    issues
) {

    const total =
        issues.length;


    if (total === 0) {

        campusHealth.innerHTML = `

            <div class="health-score">

                <div class="health-number">
                    100
                </div>

                <div class="health-label">
                    Campus health<br>
                    No reported issues
                </div>

            </div>

        `;

        return;

    }


    const resolved =
        issues.filter(issue => {

            return issue.status === "resolved";

        }).length;


    const active =
        total - resolved;


    const health =
        Math.max(
            0,
            Math.round(
                (resolved / total) * 100
            )
        );


    const reported =
        issues.filter(issue => {

            return issue.status === "reported";

        }).length;


    const investigating =
        issues.filter(issue => {

            return (
                issue.status === "investigating" ||
                issue.status === "in_progress"
            );

        }).length;


    campusHealth.innerHTML = `

        <div class="health-score">

            <div class="health-number">
                ${health}
            </div>


            <div class="health-label">

                Campus health<br>

                Based on issue resolution

            </div>

        </div>


        <div class="health-bar">

            <div
                class="health-bar-fill"
                style="width: ${health}%"
            ></div>

        </div>


        <div class="health-breakdown">

            <div class="health-row">

                <span class="health-row-label">
                    Active issues
                </span>

                <span class="health-row-value">
                    ${active}
                </span>

            </div>


            <div class="health-row">

                <span class="health-row-label">
                    Awaiting action
                </span>

                <span class="health-row-value">
                    ${reported}
                </span>

            </div>


            <div class="health-row">

                <span class="health-row-label">
                    Being investigated
                </span>

                <span class="health-row-value">
                    ${investigating}
                </span>

            </div>


            <div class="health-row">

                <span class="health-row-label">
                    Resolved
                </span>

                <span class="health-row-value">
                    ${resolved}
                </span>

            </div>

        </div>

    `;

}


// =========================================
// RECENT REPORTS
// =========================================

function renderRecentReports(
    issues
) {

    recentReports.innerHTML = "";


    const recent =
        [...issues]
            .sort((a, b) => {

                return (
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                );

            })
            .slice(0, 6);


    recent.forEach(
        issue => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "recent-report";


            item.dataset.issueId =
                issue.id;


            item.innerHTML = `

                <div>

                    <div class="recent-report-title">

                        ${escapeHTML(
                            issue.title
                        )}

                    </div>


                    <div class="recent-report-meta">

                        ${
                            locationNames[
                                issue.location
                            ]
                            || issue.location
                        }

                        ·

                        ${
                            issue.reports || 1
                        }
                        ${
                            (issue.reports || 1) === 1
                                ? "student"
                                : "students"
                        }

                    </div>

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


                <span class="recent-report-date">

                    ${
                        formatDate(
                            issue.createdAt
                        )
                    }

                </span>

            `;


            recentReports.appendChild(
                item
            );

        }
    );

}


// =========================================
// NAVIGATE TO ISSUE
// =========================================

function openIssue(
    issueId
) {

    window.location.href =
        `issue.html?id=${issueId}`;

}


priorityList.addEventListener(
    "click",
    event => {

        const item =
            event.target.closest(
                ".priority-item"
            );


        if (!item) {
            return;
        }


        openIssue(
            item.dataset.issueId
        );

    }
);


recentReports.addEventListener(
    "click",
    event => {

        const item =
            event.target.closest(
                ".recent-report"
            );


        if (!item) {
            return;
        }


        openIssue(
            item.dataset.issueId
        );

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

function initializeDashboard() {

    const issues =
        getIssues();


    updateStats(
        issues
    );


    renderPriorityIssues(
        issues
    );


    renderCampusHealth(
        issues
    );


    renderRecentReports(
        issues
    );

}


initializeDashboard();