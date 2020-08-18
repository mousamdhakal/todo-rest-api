# ToDO REST API

This API facilitates working with a complete todo App.
You can see an example of live working site connected to the API [here](https://todo-api-connected.netlify.app).

All the Responses are sent as JSON data.

The api is running live on  `https://rest-api-todo-login.herokuapp.com/api`

## Open Endpoints

These endpoints do not need Authorization.

* Register : `POST /auth`

**Data example** All fields must be sent as `String`.
  Password needs to be at least 8 character including one letter and one number 

```json
{
  "first_name": "something",
  "last_name": "something",
  "email": "something@something.something",
  "password": "something123" 
}
```

* Login : `POST /auth/login`

**Data example** All fields must be sent as `String`.

```json
{
  "email": "something@something.something",
  "password": "something123" 
}
```


## Endpoints that require Authentication

These enpoints require token of authenticated user to be sent in Header in either `authorization`,`x-access-token` or `token`. A Token can be acquired from the login endpoint above.

### Current User related

Endpoint to delete current user and it's todos:

* Delete user : `DELETE /auth`

**Data example** No data needs to be sent, User will be identified from authentication token and deleted accordingly.


### Todo related

Endpoints for performing CRUD operations on todo.

* Get all todos : `GET /todo`
* Add a todo : `POST /todo`

**Data example** 'todo' is sent as `String` and 'completed' as `Boolean`.

```json
{
  "todo": "some task to do",
  "completed": true
}
```
* Update a todo : `PUT /todo`

**Data example** 'todo' and 'id' are sent as `String` and 'completed' as `Boolean`.

```json
{
  "id" : "e6fbc486-2dcb-4ad9-8a24-bd44ee089b2b",
  "todo": "some task to do",
  "completed": true
}
```
* Delete a todo : `DELETE /todo`

**Data example** Send 'id' as a String

```json
{
  "id" : "e6fbc486-2dcb-4ad9-8a24-bd44ee089b2b",
}
```