# Javascript Testing

Project developed in Javascript with Unit, Integration and E2E tests with Jest, Supertest, Axios, Puppeteer, Sinon and MongoDB.

## Test

### Arrange, Act & Assert (AAA)

The tests were structured with 3 well-separated sections, Arrange, Act and Assert (AAA).

* Arrange: Setup all dependencies of the test scenario. This can include instantiating constructors, database records, stub or mock objects, and any other dependencies.
* Act: Execute the test.
* Assert: Ensure the result was as expected.

### BDD

Using declarative ways of writing code allows learning to be fast and cohesive. This helps to organize the tests and more easily understand possible issues. Because of this, [Jest](https://jestjs.io/) was chosen to provide among other functionality the structures for the BDD.

### Doubles

* Mocks:
* Stubs:
* Spies:

### White-Box Testing

* Unit Test: 
* Component Test:
* Integration Test:

### Black-Box Testing

* Backend Test:
* Frontend Test:

## Design Patterns

This project uses the design patterns from [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

## Environment

### Env

Project configurations are saved in an .env file separate from the code. This is based on The [Twelve-Factor App](https://12factor.net/) methodology.

Create a .env file in the root directory of your project. 

Add environment-specific variables on new lines in the form of NAME=VALUE. 

For example:

```toml
PORT=3000
MONGO_URI=mongodb://localhost:27017
MONGO_USER=dbuser
MONGO_PASSWORD=dbpassword
MONGO_NAME=cards
```

### MongoDB Container

This project use the Mongo Database. To start the database use the docker-compose script to run the containers with MongoDB and Mongo Express.

```docker
$ docker-compose up
```

## Links
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [Twelve-Factor App](https://12factor.net/)
* [Get NodeJS](https://nodejs.org/en/download/)
* [Get Visual Studio Code](https://code.visualstudio.com/download)
* [Get Docker](https://docs.docker.com/get-docker/)
* [Get Docker Compose](https://docs.docker.com/compose/install/)
