# P6-Full-Stack-reseau-dev

## Presentation
MDD (Monde de Dév) is an application that aims to help developers looking for work, through matchmaking, by encouraging connections and collaboration between peers with common interests.

## Prerequisites

Before starting, make sure you have the following tools installed on your machine:

    Java Development Kit (JDK) 17 or higher
    Maven
    MariaDB
    Git
    Node and npm
    Angular CLI 14 or higher
## Installation and Running the Project
## 1. Clone the Repository

Clone the GitHub repository to your local machine using the following command:

git clone https://github.com/Ali0908/Developpez-une-application-full-stack-complete.git

cd Developpez-une-application-full-stack-complete.git

## 2. Configure the Database
Installing MariaDB

If MariaDB is not already installed, you can install it by following these steps:

For Linux:

    sudo apt update
    
    sudo apt install mariadb-server
    
    sudo systemctl start mariadb
    
    sudo systemctl enable mariadb

For macOS:

Use Homebrew:

    brew install mariadb
    brew services start mariadb

For Windows:

Download and install MariaDB from the official site.
Database Configuration

Connect to MariaDB:

    mysql -u root -p
Create a new database and user:

    CREATE DATABASE your_database_name;
    CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
    GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_username'@'localhost';
    FLUSH PRIVILEGES;

Configure the database connection settings in the application.properties or application.yml file of the Spring Boot project:

application.properties:

    spring.datasource.url=jdbc:mariadb://localhost:3306/your_database_name
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    spring.jpa.hibernate.ddl-auto=update

application.yml:
spring:
datasource:

        url: jdbc:mariadb://localhost:3306/your_database_name
        username: your_username
        password: your_password
      jpa:
        hibernate:
          ddl-auto: update
### 3. Build, Run and Test the Application

### BackEnd
Use Maven to build, run and test the application:

Install the project dependencies:

    mvn clean install
Run project

    mvn spring-boot:run

### FrontEnd
Use npm to install the project dependencies and run the Angular application:

Install the project dependencies:

    npm install

Run project

    ng serve

### 4. Access the Application
The backend will be running at http://localhost:8080.
the frontend will be running at http://localhost:4200.


