# My brand api

[![codecov](https://codecov.io/gh/ishimweClaude12/action-in-action/graph/badge.svg?token=MP7ABM8RWK)](https://codecov.io/gh/ishimweClaude12/action-in-action)


[![Node.js CI](https://github.com/ishimweClaude12/my-brand-BE/actions/workflows/node.js.yml/badge.svg)](https://github.com/ishimweClaude12/my-brand-BE/actions/workflows/node.js.yml)
# Blog CRUD API

This project is a back-end imprementation of a Blog sharing website. Users are able to sign up and log into their account and get the privillege of liking and commenting on their favorite blogs written by your's.




## API Reference

#### Sign Up

```http
  GET /users/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Logging in

```http
  GET /api/users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Get all Blogs

```http
  GET /api/blogs
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get a single blog

```http
  GET /api/blogs/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


## Authors

- Claude Ishimwe


## 🚀 About Me
I'm a full stack developer...


## Installation

Install my-project with npm

```bash
  git clone https://github.com/ishimweClaude12/my-brand-BE/actions
  
  cd my-project

  to install all dependencies
  npm install 

  to build the local javascript from typescript
  npm run build

  to spin the server, use this cmd
  npm start
```
    
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Running Tests

To run tests, run the following command, the test will show the coverage and the ones that are passing and failing

```bash
  npm  test
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` The port number your servir will run on locally

`ATLAS` Basically a mongodb link to a database, it might be a local database or a cluster hosted on atlas

