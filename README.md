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

## How to run tests##
``` docker-compose exec backend npm test ```

## API documentation ##
### 1. How to Access
Once the Docker containers are running, navigate to:
[http://localhost:3000/api-docs]

### 2. How to Authenticate (Bearer Token)
Most routes are protected. To access them, follow these steps:

1. **Get a Token**: 
   - Locate the **Authentication** section in Swagger.
   - Open the `POST /api/auth/login` endpoint.
   - Click **"Try it out"** and enter the credentials (e.g., `admin@securesup.fr` / `admin_password`).
   - Click **Execute**. 
   - Copy the `token` string from the JSON response (do not include the quotes).

2. **Authorize Swagger**:
   - Click the green **"Authorize"** button at the top right of the page.
   - In the **Value** field, paste the token you just copied.
   - Click **Authorize**, then **Close**.
   - You can now test protected routes (indicated by a 🔒 icon).

### 3. Testing Endpoint with Parameters
For routes requiring an ID (e.g., `DELETE /api/users/{id}`):
- Click **"Try it out"**.
- Enter the target ID in the specific **id** field that appears in the "Parameters" section.
- Click **Execute**.
## Demo Credentials
| Role | Email | Password | Description |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@securesup.fr` | `admin_password` | Full access to users, schools, and applications. |
| **User** | `student@securesup.fr` | `student_password` | Can view schools and manage their own applications. |

