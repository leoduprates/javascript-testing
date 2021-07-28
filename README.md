# Javascript Testing

Project developed in Javascript with Unit, Integration and E2E tests with Jest, Supertest, Axios, Puppeteer, Sinon and MongoDB.

- [x] Backend Demo. 
- [x] Frontend Demo. 
- [x] Unit Tests.
- [ ] Integration Tests.
- [ ] Backend Tests.
- [ ] Frontend Tests.
- [ ] Performance Tests.
- [ ] Secueiry Tests.  


## Test

### Arrange, Act & Assert (AAA)

The tests were structured with 3 well-separated sections, Arrange, Act and Assert (AAA).

* Arrange: Setup all dependencies of the test scenario. This can include instantiating constructors, database records, stub or mock objects, and any other dependencies.
* Act: Execute the test.
* Assert: Ensure the result was as expected.

### BDD

Using declarative ways of writing code allows learning to be fast and cohesive. This helps to organize the tests and more easily understand possible issues. Because of this, [Jest](https://jestjs.io/) was chosen to provide among other functionality the structures for the BDD.

### Test Doubles

* Mocks: Replace a real object by providing autonomous responses to method calls.
* Stubs: Modify a function and delegate control over its behavior.
* Spies: Spy can modify the behaviour of the original object, manipulating method call parameters and/or results.


### White-Box Testing

* Unit Test: It's a way to test the smallest piece of code that can be logically isolated on a system.
* Integration Test: It is a form of testing in which software modules are logically integrated and tested as a group.

### Black-Box Testing

* Backend Test: Tests the server-side and database of an application.
* Frontend Test: Tests the client side of the application, verifying GUI functionality and usability.

## Design Patterns

This project uses the design patterns from [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

## Environment

### Env

Project configurations are saved in an .env file separate from the code. This is based on The [Twelve-Factor App](https://12factor.net/) methodology.

Create a .env file in the root directory of your project. 

Add environment-specific variables on new lines in the form of NAME=VALUE. 

For example:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017
MONGO_USER=dbuser
MONGO_PASSWORD=dbpassword
MONGO_NAME=cards
```

### MongoDB Container

This project use the Mongo Database. To start the database use the docker-compose script to run the containers with MongoDB and Mongo Express.

```
$ docker-compose up
```

### Build Project

```
$ npm install
```

### Run Application

```
$ npm start
```

### Run Tests

```
$ npm test
```

### Run Test Coverage

```
$ npm coverage
```

## Links
* [Martin Fowler](https://martinfowler.com/)
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [Twelve-Factor App](https://12factor.net/)
* [Get NodeJS](https://nodejs.org/en/download/)
* [Get Visual Studio Code](https://code.visualstudio.com/download)
* [Get Docker](https://docs.docker.com/get-docker/)
* [Get Docker Compose](https://docs.docker.com/compose/install/)
