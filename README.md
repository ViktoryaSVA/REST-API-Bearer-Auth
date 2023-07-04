## REST-API server with Bearer authorization.

## Installation

```bash
$ npm install
```
## Docker configuration
```bash
$ docker-compose up -d
```

## Running the app

```bash
#migrations
$ npm run migration:generate
$ npm run migration:run

# development
$ npm install
$ npm start

```

## Configure .env file
#### You should create the Postgres db and configure the .env file with this date.
```bash
POSTGRES_USER='some user'

POSTGRES_PASSWORD='some password'

POSTGRES_DB='some db name'

POSTGRES_PORT='some port'

JWT_SECRET='secretKay'
```

## Examples of the .csv files
#### type = 'custom'
```bash
filename,filePath
file1.txt,/path/to/file1.txt
file2.txt,/path/to/file2.txt
file3.txt,/path/to/file3.txt
```
#### type = 'tableType2'
```bash
filename,filePath
filename,tableType
example.csv,tableType1
```
# Examples of requests
# CreateUser
#### First of all, you need to create a user in the database. You can use this endpoint.

### POST

### http://localhost:3000/users/create
``` bash 
{
    "email": "admin4@gmail.com",
    "password": "admin4",
    "username": "admin4"
}
```
# Login
### POST
### http://localhost:3000/login
``` bash 
{
    "password": "admin4",
    "username": "admin4"
}
```

### Example of result
```bash
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluNCIsInBhc3N3b3JkIjoiYWRtaW40IiwiaWF0IjoxNjg4NDc0NTA5LCJleHAiOjE2ODg0NzgxMDl9.m5syEvLhQoQKs350yqxO8rlY9lOctrAQDwXo1n8Fnfo"
}
```

# File upload
### POST
### http://localhost:3000/file-upload
#### If you are using Postman, you must add your access_token from the authorization login in the Bearer Token field. Then you should use the body of the form-data, add the value "file" in the "Key" field and load the .csv file in the "Value" field.
``` bash 
{
    "password": "admin4",
    "username": "admin4"
}
```

### Example output if the type is "custom"
```bash
{
    "message": "File uploaded successfully to the directory",
    "filePath": "/home/viktoriia/REST-API-Test-Task/path/to/custom/test.csv",
    "type": "custom"
}
```
### Example output if the type is "tableType2"
```bash
{
    "message": "File uploaded successfully to the DB",
    "fileId": 14
}
```

