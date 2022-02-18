# soa
## 📝 Service Oriented Architecture Project 2021-2022
Employee Articles management system using Spring and Helidon microservices
UBB, master, Software Engineering
Web Application


# Description
Employee Articles Management System is an application based on microservices created in Java with Helidon and Spring.

At the frontend level, it uses a Web Client based on html and javascript.

The system allows the management of articles (viewing, creating, deleting). These operations are using a 3rd party API providing test objects. The microservice needs to be extended to work with a database for a reliable behaviour.
Also, it allows the view of users, operation based on a microservice created with Helidon. The service provides operation entrypoints for a complete management of employees (view, create, delete, update).

The Article entity contains: Id (unique), Title, Text, User Id.
The Employee entity contains: Id (unique), Title, Text, User Id.

Thus, when creating a new article, a POST request is sent to microservice 1 calling the 3rd party API.
In order to deploy the approach solution, we are using docker images for constructing the containers in order to build the microservices and microfrontends and access them on different ports.

# Service oriented architecture patterns
Microservices Pattern - decoupled applications
Available REST Api via Helidon WebServices and Spring Controllers
Loose coupling between consumers and services, and between the services themselves
Run-time environment autonomy - modules are separately deployed and run in docker
Active composition pattern for microservices architecture - given microservice invokes one microservices using synchronous messaging protocols such as REST/HTTP

# Microservices
boot-oauth2-github-master
  - Spring microservice that manages the OAuth log in using Github account
employee-app
  - Helidon microservice that manage CRUD operations on Employee and Article entity;

# Authorization
The application uses a separate Spring microservice for authorization based on OAuth.
The user needs to authentiticate using his Github account and only eventually gets redirected to the home page of the application.

Auth0 is a flexible, drop-in solution to add authentication and authorization services to the server-side application.
A new application and client id were registered in Github in order for the process to work.
