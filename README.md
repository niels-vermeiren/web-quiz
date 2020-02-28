# Learnangular
After reading the book 'Angular Development With Typescript', I decided to put all I had learned into practice.
I wanted to create a project that incorporated a lot of different features from Angular.

## The project
The application is pretty simple: a user can create questions of different types in the management area. Afterwards, he can question himself (and others) by going to the 'Quiz'
section of the website. After taking the quiz, the user knows whether he has passed or failed the test.

I used json-server and json-server-auth as a fake API for the project. Here is a list of some of the Angular features I incorporated:

- Reactive forms
- Different lazy loaded (child) modules
- Communication parent/child component (input, output, EventEmitter)
- RxJs
- Interceptors
- Custom pipes
- Guards (CanActivate, CanDeactivate)
- Jasmine tests, mocking of HttpClient
- TSLint passes
- Sample e2e test with protractor
- Typescript features (rest, spread, destructuring, ...)
- ...

## Development server

In order to run the fake rest API, type the following command in the root folder: 
`sudo json-server --watch server/db.json -m ./node_modules/json-server-auth`.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
