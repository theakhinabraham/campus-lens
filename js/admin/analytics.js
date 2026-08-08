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
    labels,
    filterField = null
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


            /*
             * Make the bar clickable
             */

            if (filterField) {

                item.classList.add(
                    "analytics-bar-clickable"
                );


                item.addEventListener(
                    "click",
                    () => {

                        showAnalyticsIssues(
                            filterField,
                            key,
                            label
                        );

                    }
                );

            }


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
    categoryNames,
    "category"
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
    locationNames,
    "location"
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
    statusNames,
    "status"
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
    severityNames,
    "severity"
);


// =========================================
// CAMPUS HEALTH
// =========================================

function calculateLocationHealth(location) {

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


function calculateHealthScore() {

    if (!issues.length) {

        return 100;

    }


    const locations =
        Object.keys(locationNames);


    const scores =
        locations.map(
            location =>
                calculateLocationHealth(location)
        );


    return Math.round(
        scores.reduce(
            (total, score) =>
                total + score,
            0
        ) / scores.length
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

// =========================================
// ACTIONABLE INSIGHTS
// =========================================

const resolutionRateElement =
    document.getElementById(
        "resolutionRate"
    );

const problemLocationElement =
    document.getElementById(
        "problemLocation"
    );

const topCategoryElement =
    document.getElementById(
        "topCategory"
    );

const averageReportsElement =
    document.getElementById(
        "averageReports"
    );


// =========================================
// RESOLUTION RATE
// =========================================

function calculateResolutionRate() {

    if (!issues.length) {
        return 0;
    }

    return Math.round(
        (resolvedIssues.length / issues.length) * 100
    );

}


const resolutionRate =
    calculateResolutionRate();


if (resolutionRateElement) {

    resolutionRateElement.textContent =
        `${resolutionRate}%`;

}


// =========================================
// MOST PROBLEMATIC LOCATION
// =========================================

function getMostProblematicLocation() {

    if (!activeIssues.length) {
        return null;
    }

    const counts =
        countBy(
            activeIssues,
            "location"
        );

    const sorted =
        Object.entries(counts)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            );

    return sorted.length
        ? sorted[0]
        : null;

}


const problematicLocation =
    getMostProblematicLocation();


if (problemLocationElement) {

    if (problematicLocation) {

        problemLocationElement.textContent =
            locationNames[
                problematicLocation[0]
            ] ||
            problematicLocation[0];

    } else {

        problemLocationElement.textContent =
            "None";

    }

}


// =========================================
// TOP CATEGORY
// =========================================

function getTopCategory() {

    if (!issues.length) {
        return null;
    }

    const counts =
        countBy(
            issues,
            "category"
        );

    const sorted =
        Object.entries(counts)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            );

    return sorted.length
        ? sorted[0]
        : null;

}


const topCategory =
    getTopCategory();


if (topCategoryElement) {

    if (topCategory) {

        topCategoryElement.textContent =
            categoryNames[
                topCategory[0]
            ] ||
            topCategory[0];

    } else {

        topCategoryElement.textContent =
            "None";

    }

}


// =========================================
// AVERAGE REPORTS
// =========================================

function calculateAverageReports() {

    if (!issues.length) {
        return 0;
    }

    const totalReports =
        issues.reduce(
            (total, issue) =>
                total + (issue.reports || 1),
            0
        );

    return (
        totalReports / issues.length
    ).toFixed(1);

}


const averageReports =
    calculateAverageReports();


if (averageReportsElement) {

    averageReportsElement.textContent =
        averageReports;

}


// =========================================
// LOCATION HEALTH RANKING
// =========================================

const locationHealthList =
    document.getElementById(
        "locationHealthList"
    );


function renderLocationHealth() {

    if (!locationHealthList) {
        return;
    }

    locationHealthList.innerHTML = "";


    const locations =
        Object.keys(
            locationNames
        );


    locations
        .map(location => ({

            location,

            score:
                calculateLocationHealth(
                    location
                )

        }))
        .sort(
            (a, b) =>
                a.score - b.score
        )
        .forEach(
            item => {

                let healthClass =
                    "good";

                let healthLabel =
                    "Good";


                if (item.score < 60) {

                    healthClass =
                        "danger";

                    healthLabel =
                        "Critical";

                }

                else if (item.score < 80) {

                    healthClass =
                        "warning";

                    healthLabel =
                        "Needs attention";

                }


                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "location-health-row";


                row.innerHTML = `

                    <div class="location-health-info">

                        <strong>
                            ${escapeHTML(
                                locationNames[
                                    item.location
                                ]
                            )}
                        </strong>

                        <span class="
                            location-health-status
                            ${healthClass}
                        ">
                            ${healthLabel}
                        </span>

                    </div>


                    <div class="
                        location-health-bar
                    ">

                        <div
                            class="
                                location-health-fill
                                ${healthClass}
                            "
                            style="
                                width: ${item.score}%;
                            "
                        ></div>

                    </div>


                    <strong class="
                        location-health-score
                    ">
                        ${item.score}
                    </strong>

                `;


                locationHealthList.appendChild(
                    row
                );

            }
        );

}


renderLocationHealth();


// =========================================
// SMART INSIGHT MESSAGE
// =========================================

const insightMessage =
document.createElement(
    "div"
);

insightMessage.className =
    "analytics-smart-insight";


if (issues.length === 0) {

    insightMessage.innerHTML = `
        <strong>
            Campus looks clear.
        </strong>

        <span>
            No issues have been reported yet.
        </span>
    `;

}

else if (highPriorityIssues.length > 0) {

    insightMessage.innerHTML = `
        <strong>
            ⚠ Immediate attention recommended
        </strong>

        <span>
            ${highPriorityIssues.length}
            high-priority issue${
                highPriorityIssues.length === 1
                    ? ""
                    : "s"
            }
            currently require attention.
        </span>
    `;

}

else if (resolutionRate >= 80) {

    insightMessage.innerHTML = `
        <strong>
            ✓ Campus response is strong
        </strong>

        <span>
            ${resolutionRate}% of reported issues
            have been resolved.
        </span>
    `;

}

else {

    insightMessage.innerHTML = `
        <strong>
            Campus issues need monitoring
        </strong>

        <span>
            ${activeIssues.length}
            active issue${
                activeIssues.length === 1
                    ? ""
                    : "s"
            }
            currently remain unresolved.
        </span>
    `;

}


const analyticsPage =
document.querySelector(
    ".analytics-page"
);


if (
    analyticsPage &&
    !document.querySelector(
        ".analytics-smart-insight"
    )
) {

    analyticsPage.appendChild(
        insightMessage
    );

}

// =========================================
// CAMPUS INTELLIGENCE
// =========================================

const intelligenceList =
    document.getElementById(
        "intelligenceList"
    );


function generateIntelligence() {

    if (!intelligenceList) {
        return;
    }

    intelligenceList.innerHTML = "";

    const insights = [];


    // -----------------------------------------
    // HIGH PRIORITY
    // -----------------------------------------

    if (highPriorityIssues.length > 0) {

        insights.push({

            icon: "⚠",

            title:
                "High-priority issues require attention",

            description:
                `${highPriorityIssues.length} high-priority issue${
                    highPriorityIssues.length === 1
                        ? ""
                        : "s"
                } are currently unresolved.`,

            type: "warning"

        });

    }


    // -----------------------------------------
    // PROBLEM LOCATION
    // -----------------------------------------

    if (problematicLocation) {

        const location =
            locationNames[
                problematicLocation[0]
            ] ||
            problematicLocation[0];

        insights.push({

            icon: "⌖",

            title:
                `${location} needs attention`,

            description:
                `${problematicLocation[1]} active issue${
                    problematicLocation[1] === 1
                        ? ""
                        : "s"
                } are currently reported in this location.`,

            type: "location"

        });

    }


    // -----------------------------------------
    // TOP CATEGORY
    // -----------------------------------------

    if (topCategory) {

        const category =
            categoryNames[
                topCategory[0]
            ] ||
            topCategory[0];

        insights.push({

            icon: "#",

            title:
                `${category} is the leading issue type`,

            description:
                `${topCategory[1]} report${
                    topCategory[1] === 1
                        ? ""
                        : "s"
                } are associated with this category.`,

            type: "category"

        });

    }


    // -----------------------------------------
    // RESOLUTION PERFORMANCE
    // -----------------------------------------

    if (resolutionRate >= 70) {

        insights.push({

            icon: "✓",

            title:
                "Strong resolution performance",

            description:
                `${resolutionRate}% of all reported issues have been resolved.`,

            type: "success"

        });

    }

    else if (issues.length > 0) {

        insights.push({

            icon: "↗",

            title:
                "Resolution rate could improve",

            description:
                `Only ${resolutionRate}% of reported issues have been resolved.`,

            type: "warning"

        });

    }


    // -----------------------------------------
    // NO DATA
    // -----------------------------------------

    if (!insights.length) {

        intelligenceList.innerHTML = `

            <div class="intelligence-empty">

                <strong>
                    Campus looks healthy.
                </strong>

                <span>
                    There are currently no significant issues
                    requiring attention.
                </span>

            </div>

        `;

        return;

    }


    // -----------------------------------------
    // RENDER
    // -----------------------------------------

    insights
        .slice(0, 4)
        .forEach(
            insight => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    `intelligence-item ${insight.type}`;


                item.innerHTML = `

                    <div class="intelligence-icon">

                        ${insight.icon}

                    </div>


                    <div class="intelligence-content">

                        <strong>

                            ${escapeHTML(
                                insight.title
                            )}

                        </strong>


                        <span>

                            ${escapeHTML(
                                insight.description
                            )}

                        </span>

                    </div>

                `;


                intelligenceList.appendChild(
                    item
                );

            }
        );

}


generateIntelligence();

// =========================================
// ANALYTICS ISSUE EXPLORER
// =========================================

const analyticsExplorerList =
    document.getElementById(
        "analyticsExplorerList"
    );

const explorerTitle =
    document.getElementById(
        "explorerTitle"
    );

const explorerSubtitle =
    document.getElementById(
        "explorerSubtitle"
    );

const clearAnalyticsFilter =
    document.getElementById(
        "clearAnalyticsFilter"
    );


// =========================================
// SHOW FILTERED ISSUES
// =========================================

function showAnalyticsIssues(
    field,
    value,
    label
) {

    if (!analyticsExplorerList) {
        return;
    }


    const filteredIssues =
        issues.filter(
            issue =>
                String(issue[field]) ===
                String(value)
        );


    explorerTitle.textContent =
        `${label} Issues`;


    explorerSubtitle.textContent =
        `${filteredIssues.length} issue${
            filteredIssues.length === 1
                ? ""
                : "s"
        } match this filter.`;


    if (!filteredIssues.length) {

        analyticsExplorerList.innerHTML = `

            <div class="analytics-empty">

                No issues found.

            </div>

        `;

        return;

    }


    analyticsExplorerList.innerHTML =
        filteredIssues
            .sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )
            .map(
                issue => {

                    const location =
                        locationNames[
                            issue.location
                        ]
                        || issue.location;


                    const status =
                        statusNames[
                            issue.status
                        ]
                        || issue.status;


                    return `

                        <div
                            class="analytics-explorer-item"
                            onclick="
                                window.location.href=
                                'issue.html?id=${issue.id}'
                            "
                        >

                            <div
                                class="
                                    analytics-explorer-main
                                "
                            >

                                <div
                                    class="
                                        analytics-explorer-meta
                                    "
                                >

                                    <span
                                        class="
                                            issue-status
                                            ${issue.status}
                                        "
                                    >
                                        ${escapeHTML(status)}
                                    </span>


                                    <span
                                        class="
                                            issue-severity
                                            ${issue.severity}
                                        "
                                    >
                                        ${escapeHTML(
                                            capitalize(
                                                issue.severity
                                            )
                                        )}
                                    </span>

                                </div>


                                <strong>

                                    ${escapeHTML(
                                        issue.title
                                    )}

                                </strong>


                                <span>

                                    ${escapeHTML(location)}

                                    ·

                                    ${escapeHTML(
                                        issue.specificLocation
                                        || "Campus"
                                    )}

                                </span>

                            </div>


                            <div
                                class="
                                    analytics-explorer-impact
                                "
                            >

                                <strong>
                                    ${issue.reports || 1}
                                </strong>

                                <span>
                                    reports
                                </span>

                            </div>


                            <span
                                class="
                                    analytics-explorer-arrow
                                "
                            >
                                →
                            </span>

                        </div>

                    `;

                }
            )
            .join("");

}


// =========================================
// CLEAR FILTER
// =========================================

if (clearAnalyticsFilter) {

    clearAnalyticsFilter.addEventListener(
        "click",
        () => {

            explorerTitle.textContent =
                "Issue Explorer";


            explorerSubtitle.textContent =
                "Select a chart category to explore related issues.";


            analyticsExplorerList.innerHTML = `

                <div class="analytics-empty">

                    Click any analytics bar to explore issues.

                </div>

            `;

        }
    );

}