# soa
## 📝 Service Oriented Architecture Project 2021-2022
Employee Articles management system using Spring and Helidon microservices
UBB, master, Software Engineering
Web Application


# Description
Employee Articles Management System is an application based on microservices created in Java with Helidon and Spring.
The application has 3 main parts:
  - An authentication microservice back end (based on Spring Boot)
  - A management microservice back end (written in Java using Helidon)
  - A web service client (written in HTML, CSS and JavaScript)
The two parts demonstrate how a front end interacts with a microservices back end.

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

![2](https://user-images.githubusercontent.com/49560400/154707481-980bff57-a089-485f-94f6-9eedcbc36285.PNG)
The application implements the data access object (DAO) pattern and can be configured for two persistence stores. By default, the application uses a mock database written with in-memory ArrayList classes so you can test the application locally or in a Kubernetes cluster without a database connection. This configuration is selected in the src\main\resources\application.yaml file by setting the drivertype to Array. This guide only covers the ArrayList version of the application without a formal database.

To connect the application to an Oracle database, edit the src\main\resources\application.yaml file, fill the user, password, and hosturl properties and set the drivertype property to Oracle. This application configuration allows you to use an Oracle database as a persistence store. The code for using an Oracle database for persistence is not covered in this guide.

# Authorization
The application uses a separate Spring microservice for authorization based on OAuth.
The user needs to authentiticate using his Github account and only eventually gets redirected to the home page of the application.

Auth0 is a flexible, drop-in solution to add authentication and authorization services to the server-side application.
A new application and client id were registered in Github in order for the process to work.
![Capture](https://user-images.githubusercontent.com/49560400/154705583-e647245f-3b80-4fa3-8fec-77b664aae851.PNG)

# Technologies
Microservices: Helidon, Sring
WebClient: HTML, Javascript

# Docker
For Microservices go to
--> employee-app and run:
docker build -t employee-app .  
docker run --rm -p 8081:8081 employee-app:latest
--> boot-oauth2-github-master and run:
docker build --tag=authentication-server:latest .
docker run -p8811:8811 authentication-server:latest

# Access application via Browser or Postman
localhost:8811

# UML Class diagrams

![3](https://user-images.githubusercontent.com/49560400/154715578-5ac32e62-8deb-4255-b0d6-befb81f90c9f.PNG)
![4](https://user-images.githubusercontent.com/49560400/154715586-2f879dde-377d-4e5c-a59d-a1f32d2a12cb.PNG)

# C4 Model

![5](https://user-images.githubusercontent.com/49560400/154715598-37a12e31-f3fe-4b0b-ac38-4bf5d46af4c7.PNG)

# Conclusion
The web server is build in Java using Helidon and Spring and it exposes REST services.

The client you use to access the microservice is coded using HTML, CSS, and JavaScript.

The application is written using a combination of BootStrap and jQuery. The application client is included with the source of the Java back end. When the application is built, the application directory is copied to the /public directory and is available to load from your browser at http://hostname:8081/public/index.html.

We used independent docker containers along with docker images in order to deploy the solution on localhost.


## 👤 Author

Mara Corina-Ioana
/ *mara_corina_ioana@yahoo.com*
