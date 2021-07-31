<p>
    <img alt="Javascript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
    <img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white"/>
    <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
    <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
    <img alt="Jest" src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"/>
    <a href="https://linkedin.com/in/leonardo-duprates">
        <img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
    </a>
</p>

[![CI](https://github.com/leoduprates/javascript-testing/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/leoduprates/javascript-testing/actions/workflows/ci.yml)

# Javascript Testing

White-box, black-box and non-functional test demonstration in an Express.js-based application with MVC pattern (Model-View-Controller).

## Project Architecture

```shell
javascript-testing/
├── src
│   ├── assets
│   ├── controllers
│   ├── database
│   ├── models
│   ├── routes
│   ├── server
│   └── views
├── tests
│   ├── e2e
│   │   └── backend
│   │   └── frontend
│   ├── integration
│   ├── performance
│   ├── security
│   └── unit

```
## Continuous Integration and Delivery

It was used on [GitHub Actions](https://github.com/features/actions) to build the CI\CD pipeline.

```shell
┌─────Build─────┐┌──────────────────────────────────Test───────────────────────────────────┐

═══⦿══════════⦿══════════⦿══════════⦿══════════⦿══════════⦿═══════════⦿═══════════⦿═══ 
  Pull       Build       Unit    Integration   Backend    Frontend   Performance   Security
```

## Built With

- [x] Backend: Javascript, [Express.js](https://expressjs.com/), [Mongoose](https://github.com/Automattic/mongoose) and [MongoDB](https://www.mongodb.com/).
- [x] Frontend: [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS) and [EJS](https://ejs.co/).
- [x] Unit Testing: [Jest](https://github.com/facebook/jest), [Proxyquire](https://github.com/thlorenz/proxyquire) and [Sinon](https://github.com/sinonjs/sinon).
- [x] Integration Testing: [Jest](https://github.com/facebook/jest), [Supertest](https://github.com/visionmedia/supertest) and [MongoDB In-Memory Server](https://github.com/nodkz/mongodb-memory-server).
- [x] API Testing: [Jest](https://github.com/facebook/jest) and [Axios](https://github.com/axios/axios).
- [x] GUI Testing: [Jest](https://github.com/facebook/jest), [Puppeteer](https://github.com/puppeteer/puppeteer) and [Faker.js](https://github.com/Marak/Faker.js).
- [ ] Performance Testing: [Artillery](https://github.com/artilleryio/artillery).
- [ ] Security Testing.

## Getting Started

1. Create a .env file in the root directory of your project. 

    ```
    PORT=3000
    MONGO_URI=mongodb://localhost:27017
    MONGO_USER=dbuser
    MONGO_PASSWORD=dbpassword
    MONGO_NAME=cards
    ```

2. Start MongoDB Container

    ```shell
    $ docker-compose up
    ```

3. Install Dependencies

    ```shell
    $ npm install
    ```

4. Run the Application

    ```shell
    $ npm start
    ```

5. Run Tests

    ```shell
    $ npm test
    ```

6. Run Test Coverage

    ```shell
    $ npm run coverage
    ```

## Best Practices

### Design Patterns

This project uses the design patterns from [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

### F.I.R.S.T Principles

* Fast
* Independent
* Repeatable
* Self-Validating
* Timely

### Arrange, Act & Assert (AAA)

The tests were structured with 3 well-separated sections, Arrange, Act and Assert (AAA).

* Arrange: Setup all dependencies of the test scenario. This can include instantiating constructors, database records, stub or mock objects, and any other dependencies.
* Act: Execute the test.
* Assert: Ensure the result was as expected.

### BDD

Using declarative ways of writing code allows learning to be fast and cohesive. This helps to organize the tests and more easily understand possible issues. Because of this, [Jest](https://jestjs.io/) was chosen to provide among other functionality the structures for the BDD.

### Doubles

* Mocks: Replace a real object by providing autonomous responses to method calls.
* Stubs: Modify a function and delegate control over its behavior.
* Spies: Spy can modify the behaviour of the original object, manipulating method call parameters and/or results.

## Test

### White-Box Testing

* Unit Test: It's a way to test the smallest piece of code that can be logically isolated on a system.
* Integration Test: It is a form of testing in which software modules are logically integrated and tested as a group.

### Black-Box Testing

* Backend Test: Tests the server-side and database of an application.
* Frontend Test: Tests the client side of the application, verifying GUI functionality and usability.

## Links
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [Martin Fowler](https://martinfowler.com/)
* [MongoDB](https://www.mongodb.com/)
* [NodeJS](https://nodejs.org/en/download/)
* [Shields.io](https://github.com/Ileriayo/markdown-badges)
* [Twelve-Factor App](https://12factor.net/)
* [Visual Studio Code](https://code.visualstudio.com/download)
