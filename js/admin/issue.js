/* =========================================
   CAMPUSLENS ADMIN ISSUE DETAIL
   ========================================= */


const issueDetailHeader =
    document.getElementById(
        "issueDetailHeader"
    );

const issueDescription =
    document.getElementById(
        "issueDescription"
    );

const issueLocation =
    document.getElementById(
        "issueLocation"
    );

const issueInformation =
    document.getElementById(
        "issueInformation"
    );

const impactNumber =
    document.getElementById(
        "impactNumber"
    );

const updateStatusButton =
    document.getElementById(
        "updateStatusButton"
    );

const statusUpdateMessage =
    document.getElementById(
        "statusUpdateMessage"
    );

const statusInputs =
    document.querySelectorAll(
        'input[name="issueStatus"]'
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
// GET ISSUE ID
// =========================================

const params =
    new URLSearchParams(
        window.location.search
    );


const issueId =
    params.get("id");


// =========================================
// GET ISSUE
// =========================================

function getIssue() {

    return CampusLens.getIssue(issueId);

}


// =========================================
// RENDER ISSUE
// =========================================

function renderIssue(
    issue
) {

    if (!issue) {

        issueDetailHeader.innerHTML = `

            <h2>
                Issue not found
            </h2>

            <p>
                This issue may have been removed.
            </p>

        `;

        updateStatusButton.disabled =
            true;

        return;

    }


    // =====================================
    // HEADER
    // =====================================

    issueDetailHeader.innerHTML = `

        <div class="issue-detail-header-top">

            <div>

                <h2>
                    ${escapeHTML(
                        issue.title
                    )}
                </h2>


                <div class="issue-detail-header-meta">

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


                    <span>

                        Reported
                        ${formatDate(
                            issue.createdAt
                        )}

                    </span>

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

        </div>

    `;


    // =====================================
    // DESCRIPTION
    // =====================================

    issueDescription.textContent =
        issue.description ||
        "No description provided.";


    // =====================================
    // LOCATION
    // =====================================

    issueLocation.innerHTML = `

        <span>
            ⌖
        </span>

        <strong>
            ${
                locationNames[
                    issue.location
                ]
                || issue.location
            }
        </strong>

    `;


    // =====================================
    // INFORMATION
    // =====================================

    issueInformation.innerHTML = `

        <div class="issue-information-item">

            <div class="issue-information-label">
                Category
            </div>

            <div class="issue-information-value">

                ${
                    categoryNames[
                        issue.category
                    ]
                    || issue.category
                }

            </div>

        </div>


        <div class="issue-information-item">

            <div class="issue-information-label">
                Severity
            </div>

            <div class="issue-information-value">

                ${
                    capitalize(
                        issue.severity
                    )
                }

            </div>

        </div>


        <div class="issue-information-item">

            <div class="issue-information-label">
                Submitted
            </div>

            <div class="issue-information-value">

                ${
                    formatDate(
                        issue.createdAt
                    )
                }

            </div>

        </div>


        <div class="issue-information-item">

            <div class="issue-information-label">
                Issue ID
            </div>

            <div class="issue-information-value">

                ${
                    issue.id
                }

            </div>

        </div>

    `;


    // =====================================
    // IMPACT
    // =====================================

    impactNumber.textContent =
        issue.reports || 1;


    // =====================================
    // CURRENT STATUS
    // =====================================

    statusInputs.forEach(
        input => {

            input.checked =
                input.value === issue.status;

        }
    );

}


// =========================================
// UPDATE STATUS
// =========================================

updateStatusButton.addEventListener(
    "click",
    () => {

        const selectedStatus =
            document.querySelector(
                'input[name="issueStatus"]:checked'
            );


        if (!selectedStatus) {

            return;

        }


        const newStatus =
            selectedStatus.value;


        const updated =
            CampusLens.updateIssue(
                issueId,
                {
                    status: newStatus
                }
            );


        if (!updated) {

            return;

        }


        renderIssue(
            updated
        );


        statusUpdateMessage.textContent =
            `Issue updated to ${
                statusNames[newStatus]
            }.`;

        statusUpdateMessage.classList.add(
            "visible"
        );


        setTimeout(
            () => {

                statusUpdateMessage.classList.remove(
                    "visible"
                );

            },
            2500
        );

    }
);


// =========================================
// HELPERS
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

const issue =
    getIssue();


renderIssue(
    issue
);