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
  The back end of the application is a microservice that's coded in Java and uses libraries from the Helidon project
  The core of the application is the Main class and the EmployeeService class. The Main class loads the microservice and starts a Netty web server. The EmployeeService class defines the end points for the application and handles requests and responses. The application has only one microservice. But, a typical production application is likely to contain more services.

Note that the application is designed to be stateless. All data should be pushed to the database for persistence. This approach allows you to scale the application easily.

employee-app

The application implements the data access object (DAO) pattern and can be configured for two persistence stores. By default, the application uses a mock database written with in-memory ArrayList classes so you can test the application locally or in a Kubernetes cluster without a database connection. This configuration is selected in the src\main\resources\application.yaml file by setting the drivertype to Array. This guide only covers the ArrayList version of the application without a formal database.

To connect the application to an Oracle database, edit the src\main\resources\application.yaml file, fill the user, password, and hosturl properties and set the drivertype property to Oracle. This application configuration allows you to use an Oracle database as a persistence store. The code for using an Oracle database for persistence is not covered in this guide.

# Authorization
The application uses a separate Spring microservice for authorization based on OAuth.
The user needs to authentiticate using his Github account and only eventually gets redirected to the home page of the application.

Auth0 is a flexible, drop-in solution to add authentication and authorization services to the server-side application.
A new application and client id were registered in Github in order for the process to work.
![Capture](https://user-images.githubusercontent.com/49560400/154705583-e647245f-3b80-4fa3-8fec-77b664aae851.PNG)

# Technologies:
Microservices: Helidon, Sring

