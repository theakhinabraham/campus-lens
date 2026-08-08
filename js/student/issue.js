/* =========================================
   CAMPUSLENS ISSUE DETAIL
   ========================================= */


const params =
    new URLSearchParams(
        window.location.search
    );


const issueId =
    params.get("id");


const issue =
    CampusLens.getIssue(issueId);


// =========================================
// ELEMENTS
// =========================================

const header =
    document.getElementById(
        "issueDetailHeader"
    );

const description =
    document.getElementById(
        "issueDescription"
    );

const locationElement =
    document.getElementById(
        "issueLocation"
    );

const activity =
    document.getElementById(
        "issueActivity"
    );

const timeline =
    document.getElementById(
        "issueTimeline"
    );

const reportCount =
    document.getElementById(
        "reportCount"
    );

const confirmButton =
    document.getElementById(
        "confirmIssueButton"
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
// HANDLE INVALID ISSUE
// =========================================

if (!issue) {

    header.innerHTML = `

        <div class="issue-detail-title">

            <h2>
                Issue not found
            </h2>

            <p>
                This issue may have been removed
                or no longer exists.
            </p>

        </div>

    `;

    throw new Error(
        "CampusLens issue not found."
    );

}


// =========================================
// FORMAT DATE
// =========================================

function formatDate(dateString) {

    return new Date(
        dateString
    ).toLocaleString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }
    );

}


// =========================================
// ISSUE HEADER
// =========================================

header.innerHTML = `

    <div class="issue-detail-title">

        <div class="issue-card-top">

            <span class="issue-status ${issue.status}">
                ${
                    statusNames[issue.status]
                    || issue.status
                }
            </span>

            <span class="detail-priority">

                <span
                    class="detail-priority-dot ${issue.severity}"
                ></span>

                ${
                    issue.severity
                        .charAt(0)
                        .toUpperCase()
                    + issue.severity.slice(1)
                }
                priority

            </span>

        </div>


        <h2>
            ${escapeHTML(issue.title)}
        </h2>


        <p>
            Reported ${formatDate(issue.createdAt)}
        </p>


        <div class="issue-detail-meta">

            <span>
                # ${
                    categoryNames[
                        issue.category
                    ]
                    || issue.category
                }
            </span>

            <span>
                ⌖ ${
                    locationNames[
                        issue.location
                    ]
                    || issue.location
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

`;


// =========================================
// DESCRIPTION
// =========================================

description.textContent =
    issue.description;


// =========================================
// LOCATION
// =========================================

locationElement.innerHTML = `

    <div class="location-icon">
        ⌖
    </div>

    <div>

        <div class="location-name">

            ${
                locationNames[
                    issue.location
                ]
                || issue.location
            }

        </div>

        <div class="location-specific">

            ${
                issue.specificLocation
                || "Location not specified"
            }

        </div>

    </div>

`;


// =========================================
// TIMELINE
// =========================================

const statusOrder = [

    "reported",

    "investigating",

    "in_progress",

    "resolved"

];


const currentIndex =
    statusOrder.indexOf(
        issue.status
    );


timeline.innerHTML = "";


statusOrder.forEach(
    (status, index) => {

        let className = "";


        if (index < currentIndex) {

            className =
                "completed";

        }


        if (index === currentIndex) {

            className =
                "current";

        }


        const step =
            document.createElement(
                "div"
            );


        step.className =
            `timeline-step ${className}`;


        step.innerHTML = `

            <div class="timeline-indicator"></div>

            <div class="timeline-content">

                <strong>
                    ${statusNames[status]}
                </strong>

                <span>

                    ${
                        index < currentIndex
                            ? "Completed"
                            : index === currentIndex
                                ? "Current status"
                                : "Waiting"

                    }

                </span>

            </div>

        `;


        timeline.appendChild(step);

    }
);


// =========================================
// ACTIVITY
// =========================================

activity.innerHTML = `

    <div class="activity-item">

        <div class="activity-line">

            <span class="activity-dot"></span>

        </div>

        <div class="activity-content">

            <strong>
                Issue reported
            </strong>

            <span>
                ${formatDate(issue.createdAt)}
            </span>

        </div>

    </div>


    ${
        issue.status !== "reported"
        ? `
            <div class="activity-item">

                <div class="activity-line">

                    <span class="activity-dot"></span>

                </div>

                <div class="activity-content">

                    <strong>
                        Issue is being investigated
                    </strong>

                    <span>
                        Campus administration has acknowledged
                        this issue.
                    </span>

                </div>

            </div>
        `
        : ""
    }


    ${
        issue.status === "resolved"
        ? `
            <div class="activity-item">

                <div class="activity-line">

                    <span class="activity-dot"></span>

                </div>

                <div class="activity-content">

                    <strong>
                        Issue resolved
                    </strong>

                    <span>
                        The issue has been marked as resolved.
                    </span>

                </div>

            </div>
        `
        : ""
    }

`;


// =========================================
// COMMUNITY CONFIRMATION
// =========================================

const CURRENT_USER =
    "Akhin Abraham";


const storageKey =
    `campusLensConfirmed_${CURRENT_USER}`;


function getConfirmedIssues() {

    return JSON.parse(

        localStorage.getItem(
            storageKey
        ) || "[]"

    );

}


function updateCommunityUI() {

    const confirmedIssues =
        getConfirmedIssues();


    const confirmed =
        confirmedIssues.includes(
            String(issue.id)
        );


    reportCount.textContent =
        issue.reports || 1;


    if (confirmed) {

        confirmButton.textContent =
            "✓ I've experienced this";

        confirmButton.classList.add(
            "confirmed"
        );

    }

    else {

        confirmButton.textContent =
            "I've experienced this";

        confirmButton.classList.remove(
            "confirmed"
        );

    }

}


confirmButton.addEventListener(
    "click",
    () => {

        let confirmedIssues =
            getConfirmedIssues();


        const id =
            String(issue.id);


        if (
            confirmedIssues.includes(id)
        ) {

            confirmedIssues =
                confirmedIssues.filter(
                    item => item !== id
                );


            issue.reports =
                Math.max(
                    1,
                    (issue.reports || 1) - 1
                );

        }

        else {

            confirmedIssues.push(id);

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


        updateCommunityUI();

    }
);


// =========================================
// ESCAPE HTML
// =========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


// =========================================
// INITIALIZE
// =========================================

updateCommunityUI();