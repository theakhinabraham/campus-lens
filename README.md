# CampusLens

### A clearer view of campus life.

CampusLens is a web-based campus intelligence platform that helps colleges understand, prioritize, and resolve everyday campus problems through student-generated reports and real-time insights.

Instead of treating student feedback as isolated complaints, CampusLens turns collective student experiences into actionable data for campus administration.

---

## 🎯 The Problem

College campuses deal with hundreds of small problems every day:

* 📶 Wi-Fi outages
* 🪑 Broken furniture
* ❄️ Faulty classroom ACs
* 💡 Lighting problems
* 🚰 Water and sanitation issues
* 🧹 Cleanliness problems
* 🍽️ Cafeteria overcrowding
* ♿ Accessibility issues
* 🏫 Infrastructure problems

Students often have no clear way to report these problems, track their progress, or know whether other students are experiencing the same issue.

For administrators, feedback is often fragmented across forms, messages, emails, and verbal complaints.

**The result:** problems are difficult to identify, prioritize, and track.

---

## 💡 The Solution

**CampusLens** creates a centralized feedback and intelligence layer for the campus.

Students can report problems, confirm issues reported by others, and verify whether resolved problems are actually fixed.

Administrators receive a visual dashboard that transforms these reports into actionable insights.

### The core loop

```text
Student experiences a problem
          ↓
Student reports it
          ↓
Other students confirm it
          ↓
CampusLens identifies patterns
          ↓
Administration prioritizes the issue
          ↓
Issue is resolved
          ↓
Students verify the resolution
```

CampusLens doesn't just collect complaints.

> **It turns the collective experience of students into actionable information for improving the campus.**

---

## ✨ Key Features

### 👨‍🎓 Student Portal

* View overall campus health
* Report campus problems
* Browse existing issues
* Confirm issues they're experiencing
* View issue status and progress
* Track personal reports
* Verify resolved issues
* Explore campus problem hotspots

### 👨‍💼 Administration Dashboard

* Monitor campus health
* View and manage reported issues
* Identify high-priority problems
* Analyze issue trends
* View issue hotspots on a campus map
* Track resolution progress
* Monitor student verification
* Analyze problems by category and location

### 🧠 Campus Intelligence

CampusLens converts raw reports into useful insights such as:

* **Campus Pulse Score**
* Issue priority
* Problem hotspots
* Issue trends
* Affected student estimates
* Resolution performance

---

## 🗺️ Campus Pulse Score

Each campus location can receive a health score based on factors such as:

* Number of active issues
* Issue severity
* Number of affected students
* Time since the issue was reported
* Recent issue trends
* Student resolution verification

Example:

```text
Block A       91 🟢
Library       84 🟢
Cafeteria     67 🟡
Block C       38 🔴
```

This allows administrators to quickly identify areas that need attention.

---

## 🔄 Issue Lifecycle

Every issue moves through a transparent lifecycle:

```text
Reported
   ↓
Acknowledged
   ↓
In Progress
   ↓
Resolved
   ↓
Student Verified
```

The final verification step ensures that an issue isn't considered successfully resolved simply because an administrator marked it as complete.

---

## 🏗️ Tech Stack

CampusLens is intentionally being built using lightweight web technologies.

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Data & Storage

* JSON-based prototype data
* Browser LocalStorage

### Visualization

* JavaScript-based data visualization

### Development

* Git
* GitHub

No frontend framework is being used for the core application.

---

## 📁 Project Structure

```text
campus-lens/
│
├── index.html
│
├── student/
│   ├── dashboard.html
│   ├── campus.html
│   ├── issues.html
│   ├── report.html
│   ├── issue.html
│   └── reports.html
│
├── admin/
│   ├── dashboard.html
│   ├── issues.html
│   ├── issue.html
│   ├── campus.html
│   └── analytics.html
│
├── css/
│   ├── main.css
│   ├── components.css
│   ├── pages.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── data.js
│   ├── storage.js
│   │
│   ├── student/
│   │   ├── dashboard.js
│   │   ├── campus.js
│   │   ├── issues.js
│   │   ├── report.js
│   │   ├── issue.js
│   │   └── reports.js
│   │
│   └── admin/
│       ├── dashboard.js
│       ├── issues.js
│       ├── issue.js
│       ├── campus.js
│       └── analytics.js
│
├── data/
│   ├── buildings.json
│   ├── issues.json
│   └── users.json
│
├── assets/
│   ├── images/
│   │   ├── campus/
│   │   ├── issues/
│   │   └── avatars/
│   │
│   └── icons/
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/campus-lens.git
```

### 2. Open the project

Navigate into the project directory:

```bash
cd campus-lens
```

### 3. Run the application

Because CampusLens is a frontend web application, it can be opened using a local development server.

For example, using VS Code's Live Server extension:

```text
Open index.html → Run with Live Server
```

---

## 🧪 Project Status

CampusLens is currently being developed as a **hackathon prototype**.

### Current progress

* [x] Ideation
* [x] Problem definition
* [x] Solution definition
* [x] Feature planning
* [x] Project architecture
* [x] UI/UX design
* [x] Design system
* [x] Student dashboard
* [x] Issue reporting
* [x] Issue management
* [x] Campus map
* [x] Admin dashboard
* [x] Analytics
* [x] LocalStorage integration
* [ ] Responsive design
* [ ] Testing
* [ ] Hackathon demo

---

## 🔮 Future Scope

CampusLens can eventually evolve beyond a prototype into a real campus platform.

Potential future improvements include:

* Real-time backend
* College authentication
* Student identity verification
* Push notifications
* Real-time issue updates
* Image storage
* GPS-based campus mapping
* AI-powered issue categorization
* Automatic duplicate issue detection
* Predictive maintenance
* Integration with college management systems
* Multi-campus support
* Advanced administrative analytics

---

## 🏆 Hackathon Vision

CampusLens is built around a simple idea:

> **A better campus starts with understanding what students experience every day.**

Instead of waiting for problems to become major issues, CampusLens helps institutions identify patterns early, prioritize what matters most, and close the feedback loop with students.

---

## 📄 License

This project is currently developed as a hackathon project.

License details will be added as the project evolves.
