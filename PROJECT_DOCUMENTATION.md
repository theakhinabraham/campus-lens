# CampusLens Project Documentation

Prepared by: Akhin Abraham

## 1. Project Overview

CampusLens is a web-based campus intelligence platform designed to help students and administrators better understand, report, and resolve everyday issues on campus. The system allows students to submit issues such as Wi-Fi problems, cleanliness concerns, infrastructure faults, water issues, lighting problems, accessibility concerns, and other campus-related problems.

The main goal of CampusLens is to turn scattered student feedback into a clear, structured, and actionable system. Instead of relying on isolated complaints or informal communication, the application helps create a visible and organized view of campus conditions.

CampusLens is especially useful for:
- Students who want to report problems easily
- Administrators who need to monitor recurring issues
- Campus management teams who want to prioritize action based on patterns and severity

## 2. Project Purpose

The project was developed to solve a common problem in educational institutions: student concerns are often fragmented, difficult to track, and not visible to decision-makers in a meaningful way. CampusLens provides a centralized platform where issues can be submitted, reviewed, categorized, and monitored.

By collecting and organizing reports, the system supports better decision-making and improves communication between students and campus administration.

## 3. Key Features

### Student Features
- Student dashboard with campus health overview
- Ability to report new campus issues
- View active issues around campus
- Confirm issues that the student is experiencing
- Track the status of submitted reports
- View personal reports in a dedicated section
- Access campus-related insights and issue summaries

### Admin Features
- Admin dashboard for monitoring campus conditions
- View and manage reported issues
- Review issue severity and status
- Analyze campus health by location
- Identify priority issues needing attention
- Monitor issue trends and problem hotspots

### General Features
- Responsive design for desktop and mobile use
- User profile support
- Local persistence of issue data
- Visual indicators for campus health and issue severity
- Simple and intuitive interface for non-technical users

## 4. Functional Workflow

The typical workflow of CampusLens is as follows:
1. A student notices an issue on campus.
2. The student submits a report through the application.
3. The issue is stored in the system and categorized.
4. Other students can confirm whether they are facing the same issue.
5. Administrators can review the issue and decide on the appropriate response.
6. The issue can be tracked until it is resolved or closed.

## 5. Technology Used

CampusLens is a lightweight web application built using front-end web technologies.

### Frontend Technologies
- HTML5
- CSS3
- Vanilla JavaScript

### Data Storage
- Browser LocalStorage
- JSON-based mock data structure

### Project Structure
- Static web pages for student and admin modules
- Reusable JavaScript modules for app logic and data handling

### Development Tools
- Visual Studio Code
- Git and GitHub
- Browser-based testing and local development

## 6. Project Structure

The project contains the following main folders and files:

- index.html – Landing page
- student/ – Student-related pages such as dashboard, issues, reports, and issue submission
- admin/ – Admin-related pages such as dashboard, analytics, and issue management
- css/ – Styling files for the application
- js/ – JavaScript logic for the student and admin experience
- data/ – Sample JSON data used by the project
- assets/ – Images, icons, and other media files

## 7. Installation and Setup Instructions

CampusLens is a static web application, so installation is simple.

### Option 1: Open Directly in a Browser
1. Download or clone the repository to your local machine.
2. Open the project folder.
3. Open the file index.html in your preferred web browser.

### Option 2: Run a Local Web Server
For a more reliable local experience, you can run a simple HTTP server.

If Python is installed, use:

```bash
python3 -m http.server 8000
```

Then open the following address in your browser:

```text
http://localhost:8000
```

### Notes
- Because the application uses browser LocalStorage, data will be saved in the browser on the device where it is used.
- If the browser storage is cleared, the saved reports may be removed.

## 8. Usage Instructions

### For Students
1. Open the student dashboard.
2. Navigate to the report form.
3. Submit a campus issue with details such as category, location, description, and severity.
4. View the issue in the issues list and track it in the reports section.

### For Administrators
1. Open the admin dashboard.
2. Review active issues and campus health metrics.
3. Identify priority issues and monitor their progress.
4. Use analytics and dashboard views to support campus decision-making.

## 9. Current Application Highlights

The current version of CampusLens includes:
- A modern campus overview experience
- Student-side issue reporting and tracking
- Admin-side analytics and monitoring
- A responsive layout for better usability
- Local persistence for issues and profile-related information

## 10. Advantages of the Project

- Simple and easy to understand
- No complex backend setup required
- Fast to run locally
- Suitable for prototyping and academic presentation
- Clear focus on student feedback and campus improvement

## 11. Limitations

As a prototype or lightweight web application, CampusLens has some limitations:
- It does not currently use a backend database
- Data is stored locally in the browser rather than on a remote server
- It is designed primarily for demonstration and prototype use
- Advanced authentication and multi-user synchronization are not included in the current version

## 12. Future Enhancements

Possible future improvements include:
- Integration with a real backend and database
- User authentication for students and admins
- Cloud-based data storage
- Advanced analytics and charts
- Real-time notifications
- Admin issue assignment and workflow management
- Multi-campus support

## 13. Conclusion

CampusLens is a practical and user-friendly solution for collecting, organizing, and understanding campus issues. It brings together student feedback and administrative insight in a simple digital platform that can help improve the overall campus experience.

The project demonstrates how web technology can be used to create a meaningful tool for communication, issue tracking, and campus improvement.
