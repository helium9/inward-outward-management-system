
#  INWARD AND OUTWARD MANAGEMENT SYSTEM


A brief description of what this project does and who it's for

##  Introduction:-
The Inward and Outward Management System is a comprehensive software solution designed to optimize and centralize the inward and outward processes within the Finance and Accounting Department of IIT INDORE. This system caters to three primary user domains: Administration of the Dept., Finance & Accounting (FA) Employees, and Claimants.

## Purpose:-

The prime objective of the Inward and Outward Management System is to streamline and enhance communication for claimants regarding the status of their Finance Reimbursement claims submitted to the Finance Department. This system aims to professionalize the process, providing claimants with efficient and transparent updates on the progress of their claims.

## Scope:-

- The product is explicitly confined to the Software Domain, serving as a web application for customized usage within the Finance and Accounting Department.
- Once a Claimant submits a Reimbursement Claim, the claim circulates among F/A employees in order of their designation hierarchy.
- The Web application extends the ability to maintain the database of the claims and update its status.

## References:-

The product is being developed for the customized usage of the Finance and Accounting (F/A) Department of IIT INDORE. The details specified in the description field solely refer to the requirements of the F/A department.

## General Description:-

The inward and outward management system serves as a dynamic and efficient tool to enhance the workflow within the Finance and Accounting department, promoting transparency and accountability in the processing of reimbursement claims.

## Technical Stack:-

- Frontend: Next.js, TypeScript
- Backend: Prisma, PostgreSQL
- UI Framework: [UI Shedcn]






## Installation

Clone the repository:

```bash
  git clone https://github.com/helium9/inward-outward-management-system.git
  cd client
```

Install the dependencies:

```bash
npm i
```
Create the database
```bash
npx prisma migrate dev --name init
npx prisma generate
```




    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

 `DATABASE_URL` 

 To run this project, you will need to add the following environment variables to your .env.local file

`NEXTAUTH_SECRET`
`GOOGLE_SECRET` 
`GOOGLE_ID` 
`password` 

## Run the application:
```bash
npm run dev
```






## Usage


- Access the application through your web browser at the provided URL.
- Different user roles will have different access levels and functionalities based on their designation hierarchy.
- Claimants can submit reimbursement claims and track their status.
- Finance officers can review and update claim statuses.
- Notifications will be sent to claimants upon status updates.
