# What this is about

This project is intended to study the process of automating a web application by writing various automated tests and user scripts.

Based on the project [API.Bible](https://scripture.api.bible/), since it contains a minimum set of everything that can be tested for educational purposes: frontend, api, authorization, etc.

As you may have noticed, **TS/Playwright** was chosen to automate testing of the project.

> All tests and scripts are prepared according to the principle of black box testing, test data and user scripts were obtained empirically and may contain unexpected errors.
> **Be careful, don't take everything seriously and have fun.**

### Test suites with documentation

- [HTTP v1 API](tests/api/README.md) (Pre-ready) / Same in [Postman Collection](https://www.postman.com/mission-geologist-37537957/workspace/54bcd53c-258e-450e-a09d-c103a44d154f/collection/21631263-9d773c14-11ff-4df9-a324-d3bb6a687a11?action=share&source=collection_link&creator=21631263)
- [End2end](tests/e2e/README.md) (Early on)

### Before you start using this on your machine

#### 1. Clone this project

```bash
git clone git@github.com:melinoid/bible_api_playwright.git
```

#### 2. Create .env in project root

...and fill it with these variables

```bash
AT_USERNAME="username"
AT_EMAIL="user_email"
AT_PASSWORD="user_pass"
AT_API_KEY="api_key"
```

Credentials are required to pass tests from an authorized user.

Also, you can get the api key [here](https://scripture.api.bible/admin/applications) after registration/login, in the credentials column.

#### 3. Run tests in docker

If you don`t want to install dependencies into the project locally, you can build an image and then run tests in it. Not suitable for development, but just playing around or running it in a separate environment is enough.

```bash
docker compose up
```

#### Another 3. Prepare the environment

> At the moment the project is configured only for chromium.

```bash
npm i && npx playwright install --with-deps chromium
```

#### Run tests

```bash
npx playwright test
```

If you want to run tests differently, [this documentation](https://playwright.dev/docs/next/running-tests#running-tests) can help you with that.

> Projects to be launched are described in **playwright.config.ts**
