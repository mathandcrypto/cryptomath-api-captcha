# cryptomath-api-captcha
**Captcha** microservice for generating mathematical problems for captcha and checking answers to them.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

### Build development stage
```bash
docker-compose up --build dev
```

### Build production stage
```bash
docker-compose up --build prod
```
