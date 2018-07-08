# USA-Charts

A project to visualize the following data:

1. Type of jobs within each state.
2. Composition of the population of all US states.

### Installation

I am running USA-Charts with 
    1. Node v8.9.4
    2. Docker version 18.03.1-ce, build 9ee9f40,
    3. yarn v1.3.2. 
Please install these before proceeding.

The following will run usa-charts in production mode on your local system on '0.0.0.0:4000'
```sh
$ git clone https://github.com/anshulchanchlani/usa-charts.git
$ cd usa-charts
$ docker build . --tag=usa-charts
$ docker run -it -d -p 4000:4000 --name=usa-charts usa-charts
$ Open 0.0.0.0:4000 in your browser
```
To run tests, navigate to root directory and run 
```sh
$ yarn test


#Issues

On running yarn test, you might find 'Cannot find module 'react' from Charts.test.js', please run 'yarn add global react' and run tests again.
