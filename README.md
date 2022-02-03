# Access Fintech QA engineer Test

Hi 👋 Thanks for checking out Access Fintech's QA Engineer Test.

For this challenge we would like you to create some automated tests for the provided application. This could be Selenium, Cypress or whatever tooling system you like. We currently use Cypress but we're very open for you to use whatever you're comfortable with.

There are 3 sections to the application, a Home, List and Item screen. It's completely up to you whether you focus on one, two or all areas of the app, it all depends how extensive you wish to be. The automation tests which you add should check some of the important functionality of the app.

You should spend between 1 and 3 hours on the test, but we don't expect everything to be complete to perfection. We're more interested in how you approach the problems, and what you would do to improve the app if it was a real application. So please make notes as you go along.

## Getting started

The app is hosted at the following location: https://qa-test.accessfintech.com/.

You can set your tests to run against this URL, or if you want to run the app locally and add tests within the same repository:

1. Clone this repo and cd into the project

```
git clone git@github.com:accessfintech/qa-test.git && cd qa-test
```

2. Install dependencies

```
yarn
```

3. Run application

```
yarn start
```

4. Write tests! :D

## The application

The application uses an example endpoint called `countries` which uses GraphQL for you to work against. It lists countries where you as a user can set each one to be visited or want to visit, a travel checklist of sorts. You may make changes to the application's code if you need to.

Preview of application:
![](./preview.gif)

## Submission

Please send us a link to a GitHub respository containing your automation setup and tests.

If you added the tests to this repo, **please do not fork or open PRs against this repository**. Instead, clone or download the contents of the repo, and push to a repo under your own GitHub account.

Once that is done, email us a link to your finished solution. Feel free to include any notes you have made about what you'd do differently if this were a real application. We'll take a look, and get back to you with any feedback.

Thanks! ✌️
