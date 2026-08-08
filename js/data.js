/* =========================================
   CAMPUSLENS DATA LAYER
   ========================================= */


const CampusLens = {

    STORAGE_KEY: "campusLensIssues",


    // =========================================
    // GET ALL ISSUES
    // =========================================

    getIssues() {

        const issues = localStorage.getItem(
            this.STORAGE_KEY
        );

        return issues
            ? JSON.parse(issues)
            : [];

    },


    // =========================================
    // SAVE ALL ISSUES
    // =========================================

    saveIssues(issues) {

        localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(issues)
        );

    },


    // =========================================
    // ADD ISSUE
    // =========================================

    addIssue(issue) {

        const issues = this.getIssues();

        issues.unshift(issue);

        this.saveIssues(issues);

        return issue;

    },


    // =========================================
    // GET ISSUE BY ID
    // =========================================

    getIssue(id) {

        const issues = this.getIssues();

        return issues.find(
            issue => String(issue.id) === String(id)
        );

    },


    // =========================================
    // UPDATE ISSUE
    // =========================================

    updateIssue(id, updates) {

        const issues = this.getIssues();

        const index = issues.findIndex(
            issue => String(issue.id) === String(id)
        );

        if (index === -1) {
            return null;
        }

        issues[index] = {
            ...issues[index],
            ...updates
        };

        this.saveIssues(issues);

        return issues[index];

    },


    // =========================================
    // DELETE ISSUE
    // =========================================

    deleteIssue(id) {

        const issues = this.getIssues();

        const filteredIssues = issues.filter(
            issue => String(issue.id) !== String(id)
        );

        this.saveIssues(filteredIssues);

    },


    // =========================================
    // GET USER REPORTS
    // =========================================

    getMyReports(userName) {

        const issues = this.getIssues();

        return issues.filter(
            issue => issue.reportedBy === userName
        );

    },


    // =========================================
    // GET ISSUE COUNT
    // =========================================

    getActiveIssueCount() {

        const issues = this.getIssues();

        return issues.filter(
            issue =>
                issue.status !== "resolved"
        ).length;

    },


    // =========================================
    // INITIALIZE DEMO DATA
    // =========================================

    initialize() {

        const existingIssues =
            localStorage.getItem(this.STORAGE_KEY);


        // Don't overwrite existing data

        if (existingIssues) {
            return;
        }


        const demoIssues = [

            {
                id: 1001,

                category: "wifi",

                location: "block-c",

                specificLocation: "Second floor",

                title: "Wi-Fi outage in Block C",

                description:
                    "The Wi-Fi has been unavailable since morning. Several students are unable to access online resources.",

                severity: "high",

                status: "investigating",

                reports: 18,

                reportedBy: "Student",

                createdAt:
                    new Date(
                        Date.now() - 60 * 60 * 1000
                    ).toISOString()
            },


            {
                id: 1002,

                category: "ac",

                location: "block-a",

                specificLocation: "Room 204",

                title: "AC not working",

                description:
                    "The air conditioner has stopped working and the classroom is getting very hot.",

                severity: "medium",

                status: "reported",

                reports: 9,

                reportedBy: "Student",

                createdAt:
                    new Date(
                        Date.now() - 2 * 60 * 60 * 1000
                    ).toISOString()
            },


            {
                id: 1003,

                category: "water",

                location: "block-b",

                specificLocation: "Ground floor",

                title: "Water dispenser not working",

                description:
                    "The water dispenser near the entrance is not dispensing water.",

                severity: "medium",

                status: "reported",

                reports: 7,

                reportedBy: "Student",

                createdAt:
                    new Date(
                        Date.now() - 4 * 60 * 60 * 1000
                    ).toISOString()
            },


            {
                id: 1004,

                category: "cleanliness",

                location: "cafeteria",

                specificLocation: "Main seating area",

                title: "Cafeteria cleanliness issue",

                description:
                    "The main seating area has not been cleaned properly.",

                severity: "low",

                status: "reported",

                reports: 4,

                reportedBy: "Student",

                createdAt:
                    new Date(
                        Date.now() - 6 * 60 * 60 * 1000
                    ).toISOString()
            },


            {
                id: 1005,

                category: "infrastructure",

                location: "block-a",

                specificLocation: "Room 102",

                title: "Classroom AC issue resolved",

                description:
                    "The classroom AC was not functioning properly.",

                severity: "medium",

                status: "resolved",

                reports: 6,

                reportedBy: "Student",

                createdAt:
                    new Date(
                        Date.now() - 24 * 60 * 60 * 1000
                    ).toISOString()
            }

        ];


        this.saveIssues(demoIssues);

    }

};


// Initialize CampusLens data

CampusLens.initialize();