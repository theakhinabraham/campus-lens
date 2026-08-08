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

// =========================================
// RECENT CAMPUS ISSUES
// =========================================

const dashboardIssues =
    document.getElementById(
        "dashboardIssues"
    );

if (dashboardIssues) {

    const recentIssues =
        [...issues]
            .sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )
            .slice(0, 3);


    if (recentIssues.length === 0) {

        dashboardIssues.innerHTML = `
            <div class="empty-state">
                <h3>No issues reported</h3>
                <p>
                    Everything looks good on campus.
                </p>
            </div>
        `;

    } else {

        dashboardIssues.innerHTML =
            recentIssues
                .map(issue => {

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

                    return `

                        <article
                            class="dashboard-issue-card"
                            onclick="window.location.href='issue.html?id=${issue.id}'"
                        >

                            <div class="dashboard-issue-main">

                                <div class="dashboard-issue-top">

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

                                    <span
                                        class="issue-severity ${issue.severity}"
                                    >
                                        ${
                                            issue.severity
                                                .charAt(0)
                                                .toUpperCase()
                                            +
                                            issue.severity.slice(1)
                                        }
                                    </span>

                                </div>


                                <h3>
                                    ${issue.title}
                                </h3>


                                <div class="dashboard-issue-meta">

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


                            <div class="dashboard-issue-impact">

                                <strong>
                                    ${issue.reports || 1}
                                </strong>

                                <span>
                                    affected
                                </span>

                            </div>


                            <div class="dashboard-issue-arrow">
                                →
                            </div>

                        </article>

                    `;

                })
                .join("");

    }

}

// =========================================
// PRIORITY ISSUES
// =========================================

const priorityIssues =
    document.getElementById(
        "priorityIssues"
    );

if (priorityIssues) {

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


    const priorityIssuesData =
        issues
            .filter(
                issue =>
                    issue.status !== "resolved"
            )
            .sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )
            .slice(0, 4);


    priorityIssues.innerHTML =
        priorityIssuesData
            .map(issue => `

                <div
                    class="issue-item"
                    onclick="window.location.href='issue.html?id=${issue.id}'"
                >

                    <span
                        class="issue-indicator ${issue.severity}"
                    ></span>


                    <div class="issue-content">

                        <span class="issue-title">

                            ${issue.title}

                        </span>


                        <span class="issue-location">

                            ${
                                locationNames[
                                    issue.location
                                ]
                                || issue.location
                            }

                            ·

                            ${
                                categoryNames[
                                    issue.category
                                ]
                                || issue.category
                            }

                        </span>

                    </div>


                    <span class="issue-count">

                        ${issue.reports || 1}
                        reports

                    </span>

                </div>

            `)
            .join("");

}

// =========================================
// CAMPUS HEALTH
// =========================================

const healthScoreElement =
    document.getElementById(
        "healthScore"
    );

const healthScoreLabel =
    document.getElementById(
        "healthScoreLabel"
    );

const healthLocations =
    document.getElementById(
        "healthLocations"
    );


// =========================================
// LOCATION NAMES
// =========================================

const healthLocationNames = {

    "block-a": "Block A",

    "block-b": "Block B",

    "block-c": "Block C",

    library: "Library",

    cafeteria: "Cafeteria",

    auditorium: "Auditorium",

    sports: "Sports Complex"

};


// =========================================
// CALCULATE LOCATION HEALTH
// =========================================

function calculateLocationHealth(
    location
) {

    const locationIssues =
        issues.filter(
            issue =>
                issue.location === location &&
                issue.status !== "resolved"
        );


    let score = 100;


    locationIssues.forEach(
        issue => {

            if (
                issue.severity === "high"
            ) {

                score -= 25;

            }

            else if (
                issue.severity === "medium"
            ) {

                score -= 12;

            }

            else {

                score -= 5;

            }


            // More reports = greater impact

            const reports =
                issue.reports || 1;


            if (reports >= 10) {

                score -= 5;

            }

            else if (reports >= 5) {

                score -= 2;

            }

        }
    );


    return Math.max(
        0,
        Math.min(
            100,
            score
        )
    );

}


// =========================================
// CALCULATE CAMPUS HEALTH
// =========================================

function calculateCampusHealth() {

    const locations =
        Object.keys(
            healthLocationNames
        );


    if (!locations.length) {

        return 100;

    }


    const scores =
        locations.map(
            location =>
                calculateLocationHealth(
                    location
                )
        );


    return Math.round(
        scores.reduce(
            (total, score) =>
                total + score,
            0
        ) / scores.length
    );

}


// =========================================
// RENDER CAMPUS HEALTH
// =========================================

function renderCampusHealth() {

    if (
        !healthScoreElement ||
        !healthLocations
    ) {

        return;

    }


    const campusHealth =
        calculateCampusHealth();


    // Main score

    healthScoreElement.textContent =
        campusHealth;


    // Health label

    let healthText =
        "Good";


    if (campusHealth < 40) {

        healthText =
            "Critical";

    }

    else if (campusHealth < 60) {

        healthText =
            "Needs attention";

    }

    else if (campusHealth < 80) {

        healthText =
            "Fair";

    }


    healthScoreLabel.textContent =
        `/ 100 · ${healthText}`;


    // =====================================
    // LOCATION BARS
    // =====================================

    healthLocations.innerHTML = "";


    Object.entries(
        healthLocationNames
    ).forEach(
        ([location, name]) => {

            const score =
                calculateLocationHealth(
                    location
                );


            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "health-location";


            let barClass = "";


            if (score < 40) {

                barClass =
                    "danger";

            }

            else if (score < 70) {

                barClass =
                    "warning";

            }


            wrapper.innerHTML = `

                <span
                    class="health-location-name"
                >
                    ${name}
                </span>


                <div
                    class="health-bar"
                >

                    <div
                        class="health-bar-fill ${barClass}"
                        style="width: ${score}%"
                    ></div>

                </div>


                <span
                    class="health-value"
                >
                    ${score}
                </span>

            `;


            healthLocations.appendChild(
                wrapper
            );

        }
    );

}


renderCampusHealth();