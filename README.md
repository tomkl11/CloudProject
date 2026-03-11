# SecureSup
## Project Description

This project is a Full-Stack Web Application designed to manage school admissions and student registrations.
- Theme: Education & Administrative Management.
- Key Features: User authentication, school directory management, and an administrative dashboard for role management and student tracking.
- Security Focus: Built as a security-oriented project to demonstrate vulnerabilities (SQL Injection, Business Logic Flaws) and their respective remediations.

## Prerequisites
Before running the application, ensure you have the following installed:
- Docker & Docker Compose
- Node.js (v18+ if running locally)
- PostgreSQL (if running without Docker)

## How to Run the App with Docker
**1. Clone the repository:**
```
git clone https://github.com/tomkl11/SecureSup.git
cd SecureSup
```

**2. Environment Variables:**

Create a ```.env``` file in the root directory and add:
``` JWT_SECRET=your_super_secret_key ```

**3. Launch the containers:**
``` docker-compose up --build ```
- The Frontend will be available at ```http://localhost```
- The Backend API will be available at ```http://localhost:3000```
- The Database will be availble at ```http://localhost:3306```



