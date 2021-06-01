# DHBW T3100 - React Application
React application to test for security vulnerabilities. The application is split in two parts, differentiated by the security-testing type. The security-testing types include static application security testing (sast) and dynamic application security testing (dast).

## General

### Security-Testing
GitLab is being used as CI/CD tool. Everything related to GitLab including pipelines can be found within the corresponding on their website:

https://gitlab.com/TimoStroehlein/dhbw-t3100-react-application

### Installation
Start all containers.
```bash
docker-compose up -d
```
Wait until all containers started up. After that, the following sites are accessible:

* http://localhost:3030/ (Frontend)
* http://localhost:8090/ (Backend)
* http://localhost:8091/ (Mongo Express)

### Docs
This folder contains Postman collections to perform HTTP requests. The requests are split for both SAST and DAST.

## SAST
Two types of vulnerabilities are implemented within the application:

* Code Injection (NoSQL Injection)
* Path Traversal

The Code Injection site contains a button to add the predefined data, which needs to be used on the first use of the application, or when the database gets destroyed. After that, the vulnerability can be tested.

The Path Traversal vulnerability does not require any particular setup. The vulnerability can be tested directly. 

The testing results can be seen on SonarCloud and Snyk:

https://sonarcloud.io/dashboard?id=dhbw-t3100-react-application
https://app.snyk.io/org/timostroehlein (access request required)

## DAST
