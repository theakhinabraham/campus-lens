/* =========================================
   CAMPUSLENS STUDENT CAMPUS MAP
   ========================================= */


// =========================================
// ELEMENTS
// =========================================

const campusBuildings =
    document.querySelectorAll(
        ".campus-building"
    );

const campusDetails =
    document.getElementById(
        "campusDetails"
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


const severityNames = {

    high: "High",

    medium: "Medium",

    low: "Low"

};


// =========================================
// GET ACTIVE ISSUES
// =========================================

function getActiveIssues() {

    return CampusLens
        .getIssues()
        .filter(
            issue =>
                issue.status !== "resolved"
        );

}


// =========================================
// GET ISSUES FOR LOCATION
// =========================================

function getLocationIssues(
    location
) {

    return getActiveIssues().filter(
        issue =>
            issue.location === location
    );

}


// =========================================
// DETERMINE LOCATION SEVERITY
// =========================================

function getLocationSeverity(
    issues
) {

    if (!issues.length) {

        return "clear";

    }


    const severityPriority = {

        high: 3,

        medium: 2,

        low: 1

    };


    let highest =
        "low";


    issues.forEach(
        issue => {

            if (
                severityPriority[
                    issue.severity
                ]
                >
                severityPriority[
                    highest
                ]
            ) {

                highest =
                    issue.severity;

            }

        }
    );


    return highest;

}


// =========================================
// UPDATE BUILDINGS
// =========================================

function updateCampusMap() {

    campusBuildings.forEach(
        building => {

            const location =
                building.dataset.location;


            const issues =
                getLocationIssues(
                    location
                );


            const severity =
                getLocationSeverity(
                    issues
                );


            // Remove old status classes

            building.classList.remove(
                "status-high",
                "status-medium",
                "status-low",
                "status-clear"
            );


            // Add current status

            building.classList.add(
                `status-${severity}`
            );


            // Update issue count

            const issueCount =
                building.querySelector(
                    ".building-issues"
                );


            if (!issueCount) {

                return;

            }


            if (issues.length === 0) {

                issueCount.textContent =
                    "No active issues";

            }

            else if (issues.length === 1) {

                issueCount.textContent =
                    "1 active issue";

            }

            else {

                issueCount.textContent =
                    `${issues.length} active issues`;

            }

        }
    );

}


// =========================================
// RENDER LOCATION DETAILS
// =========================================

function renderLocationDetails(
    location
) {

    const issues =
        getLocationIssues(
            location
        );


    const locationName =
        locationNames[
            location
        ]
        || location;


    // =====================================
    // NO ISSUES
    // =====================================

    if (!issues.length) {

        campusDetails.innerHTML = `

            <div class="campus-detail-header">

                <div>

                    <h3>
                        ${locationName}
                    </h3>

                    <p>
                        No active issues
                    </p>

                </div>

            </div>


            <div class="campus-details-empty">

                <span class="details-icon">
                    ✓
                </span>

                <h3>
                    All clear
                </h3>

                <p>
                    There are currently no
                    unresolved issues reported
                    at this location.
                </p>

            </div>

        `;

        return;

    }


    // =====================================
    // SORT BY SEVERITY
    // =====================================

    const severityPriority = {

        high: 3,

        medium: 2,

        low: 1

    };


    issues.sort(
        (a, b) => {

            return (
                severityPriority[
                    b.severity
                ]
                -
                severityPriority[
                    a.severity
                ]
            );

        }
    );


    // =====================================
    // ISSUE CARDS
    // =====================================

    const issueCards =
        issues.map(
            issue => {

                return `

                    <button
                        class="campus-detail-issue"
                        data-issue-id="${issue.id}"
                    >

                        <span
                            class="campus-detail-issue-title"
                        >
                            ${escapeHTML(
                                issue.title
                            )}
                        </span>


                        <span
                            class="campus-detail-issue-meta"
                        >

                            <span>
                                ${
                                    severityNames[
                                        issue.severity
                                    ]
                                    || issue.severity
                                }
                            </span>


                            <span>
                                ${
                                    issue.reports
                                    || 1
                                }
                                affected
                            </span>

                        </span>


                        <span
                            class="campus-detail-issue-meta"
                        >

                            <span>
                                ${
                                    statusNames[
                                        issue.status
                                    ]
                                    || issue.status
                                }
                            </span>

                            <span>
                                View →
                            </span>

                        </span>

                    </button>

                `;

            }
        )
        .join("");


    // =====================================
    // DETAILS HTML
    // =====================================

    campusDetails.innerHTML = `

        <div class="campus-detail-header">

            <div>

                <h3>
                    ${locationName}
                </h3>

                <p>
                    ${
                        issues.length
                    }
                    active ${
                        issues.length === 1
                            ? "issue"
                            : "issues"
                    }
                </p>

            </div>

        </div>


        <div class="campus-detail-issues">

            ${issueCards}

        </div>

    `;


    // =====================================
    // ISSUE CLICK
    // =====================================

    const issueButtons =
        campusDetails.querySelectorAll(
            ".campus-detail-issue"
        );


    issueButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const issueId =
                        button.dataset.issueId;


                    window.location.href =
                        `issue.html?id=${issueId}`;

                }
            );

        }
    );

}


// =========================================
// BUILDING CLICK
// =========================================

campusBuildings.forEach(
    building => {

        building.addEventListener(
            "click",
            () => {

                const location =
                    building.dataset.location;


                renderLocationDetails(
                    location
                );


                // Highlight selected building

                campusBuildings.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                building.classList.add(
                    "selected"
                );

            }
        );

    }
);


// =========================================
// HTML ESCAPE
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

updateCampusMap();