/* =========================================
   CAMPUSLENS ADMIN ANALYTICS
   ========================================= */


// =========================================
// ELEMENTS
// =========================================

const totalIssuesElement =
    document.getElementById(
        "totalIssues"
    );

const activeIssuesElement =
    document.getElementById(
        "activeIssues"
    );

const resolvedIssuesElement =
    document.getElementById(
        "resolvedIssues"
    );

const highPriorityIssuesElement =
    document.getElementById(
        "highPriorityIssues"
    );

const healthScoreElement =
    document.getElementById(
        "healthScore"
    );

const healthRingValue =
    document.getElementById(
        "healthRingValue"
    );

const healthMessage =
    document.getElementById(
        "healthMessage"
    );

const categoryChart =
    document.getElementById(
        "categoryChart"
    );

const locationChart =
    document.getElementById(
        "locationChart"
    );

const statusChart =
    document.getElementById(
        "statusChart"
    );

const severityChart =
    document.getElementById(
        "severityChart"
    );


// =========================================
// LABELS
// =========================================

const categoryNames = {

    infrastructure: "Infrastructure",

    wifi: "Wi-Fi",

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


const severityNames = {

    high: "High",

    medium: "Medium",

    low: "Low"

};


// =========================================
// GET DATA
// =========================================

const issues =
    CampusLens.getIssues();


// =========================================
// SUMMARY
// =========================================

const activeIssues =
    issues.filter(
        issue =>
            issue.status !== "resolved"
    );


const resolvedIssues =
    issues.filter(
        issue =>
            issue.status === "resolved"
    );


const highPriorityIssues =
    activeIssues.filter(
        issue =>
            issue.severity === "high"
    );


// =========================================
// UPDATE SUMMARY
// =========================================

totalIssuesElement.textContent =
    issues.length;


activeIssuesElement.textContent =
    activeIssues.length;


resolvedIssuesElement.textContent =
    resolvedIssues.length;


highPriorityIssuesElement.textContent =
    highPriorityIssues.length;


// =========================================
// COUNT BY FIELD
// =========================================

function countBy(
    items,
    field
) {

    const counts = {};


    items.forEach(
        item => {

            const value =
                item[field];


            if (!value) {
                return;
            }


            counts[value] =
                (counts[value] || 0) + 1;

        }
    );


    return counts;

}


// =========================================
// RENDER BAR CHART
// =========================================

function renderBars(
    container,
    counts,
    labels
) {

    container.innerHTML = "";


    const entries =
        Object.entries(counts);


    if (!entries.length) {

        container.innerHTML = `

            <div class="analytics-empty">

                No data available.

            </div>

        `;

        return;

    }


    entries.sort(
        (a, b) =>
            b[1] - a[1]
    );


    const maximum =
        Math.max(
            ...entries.map(
                entry => entry[1]
            )
        );


    entries.forEach(
        ([key, value]) => {

            const percentage =
                (value / maximum) * 100;


            const label =
                labels[key]
                || key;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "analytics-bar-item";


            item.innerHTML = `

                <span
                    class="analytics-bar-label"
                    title="${escapeHTML(label)}"
                >
                    ${escapeHTML(label)}
                </span>


                <div
                    class="analytics-bar-track"
                >

                    <div
                        class="analytics-bar-fill"
                        style="width: ${percentage}%"
                    ></div>

                </div>


                <span
                    class="analytics-bar-value"
                >
                    ${value}
                </span>

            `;


            container.appendChild(
                item
            );

        }
    );

}


// =========================================
// CATEGORY
// =========================================

renderBars(
    categoryChart,
    countBy(
        activeIssues,
        "category"
    ),
    categoryNames
);


// =========================================
// LOCATION
// =========================================

renderBars(
    locationChart,
    countBy(
        activeIssues,
        "location"
    ),
    locationNames
);


// =========================================
// STATUS
// =========================================

renderBars(
    statusChart,
    countBy(
        issues,
        "status"
    ),
    statusNames
);


// =========================================
// SEVERITY
// =========================================

renderBars(
    severityChart,
    countBy(
        issues,
        "severity"
    ),
    severityNames
);


// =========================================
// CAMPUS HEALTH
// =========================================

function calculateHealthScore() {

    if (!issues.length) {

        return 100;

    }


    let penalty = 0;


    issues.forEach(
        issue => {

            if (
                issue.status ===
                "resolved"
            ) {

                return;

            }


            if (
                issue.severity ===
                "high"
            ) {

                penalty += 12;

            }

            else if (
                issue.severity ===
                "medium"
            ) {

                penalty += 6;

            }

            else {

                penalty += 3;

            }


            // Student impact

            const reports =
                issue.reports || 1;


            if (reports >= 10) {

                penalty += 4;

            }

            else if (reports >= 5) {

                penalty += 2;

            }

        }
    );


    return Math.max(
        0,
        Math.min(
            100,
            Math.round(
                100 - penalty
            )
        )
    );

}


const healthScore =
    calculateHealthScore();


healthScoreElement.textContent =
    healthScore;


healthRingValue.textContent =
    healthScore;


// =========================================
// HEALTH MESSAGE
// =========================================

if (healthScore >= 80) {

    healthMessage.textContent =
        "Campus conditions look healthy.";

}

else if (healthScore >= 60) {

    healthMessage.textContent =
        "Some issues need attention.";

}

else if (healthScore >= 40) {

    healthMessage.textContent =
        "Several problems require attention.";

}

else {

    healthMessage.textContent =
        "Campus conditions need urgent attention.";

}


// =========================================
// HEALTH RING
// =========================================

const healthDegrees =
    (healthScore / 100) * 360;


const healthRing =
    document.querySelector(
        ".health-ring"
    );


if (healthRing) {

    healthRing.style.background =
        `conic-gradient(
            var(--primary)
            0deg,
            var(--primary)
            ${healthDegrees}deg,
            var(--border)
            ${healthDegrees}deg,
            var(--border)
            360deg
        )`;

}


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