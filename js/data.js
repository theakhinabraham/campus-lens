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
    // INITIALIZE DATA
    // =========================================

    initialize() {

        const existingIssues =
            localStorage.getItem(this.STORAGE_KEY);


        // Don't overwrite existing data

        if (existingIssues) {
            return;
        }

        this.saveIssues([]);

    }

};


// Initialize CampusLens data

CampusLens.initialize();