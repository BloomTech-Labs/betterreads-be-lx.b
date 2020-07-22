<a name="top"></a>

# labs-api-starter v0.1.0

- [PingAPI](#PingAPI)
  - [Root path, ping](#Root-path,-ping)
- [ProfileAPI](#ProfileAPI)
  - [Request List of Profiles](#Request-List-of-Profiles)
- [UserAPI](#UserAPI)
  - [Request List of Users](#Request-List-of-Users)
  - [Request User information](#Request-User-information)
- [BookAPI](#BookAPI)
  - [Request List of Books](#Request-List-of-Books)
  - [Request Book Information](#Request-Book-Information)
  - [Create New Book](#Create-New-Book)
  - [Update Book](#Update-Book)
  - [Delete Book](#Delete-Book)
- [UserBookAPI](#UserBookAPI)
  - [Request List of User Books](#Request-List-of-User-Books)
  - [Request User Book Information](#Request-User-Book-Information)
  - [Create New User Book](#Create-New-User-Book)
  - [Update User Book](#Update-User-Book)
  - [Delete User Book](#Delete-User-Book)

---

# <a name='PingAPI'></a> PingAPI

## <a name='Root-path,-ping'></a> Root path, ping

[Back to top](#top)

```
GET /
```

### Examples

Example usage:

```curl
curl -i http://localhost:3000/
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
  "api": "up"
}
```

# <a name='ProfileAPI'></a> ProfileAPI

## <a name='Request-List-of-Profiles'></a> Request List of Profiles

[Back to top](#top)

```
GET /users/
```

### Examples

Example usage:

```curl
curl -i http://localhost:8000/profiles
```

### Success response

#### Success response - `Success 200`

| Name   | Type     | Description                        |
| ------ | -------- | ---------------------------------- |
| id     | `UUID`   | <p>Unique id of the Profile.</p>   |
| name   | `String` | <p>Name of the Profile.</p>        |
| email  | `String` | <p>Email of the Profile.</p>       |
| avatar | `String` | <p>Avatar url for the Profile.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
[
  {
    "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
    "name": "Frank Martinez",
    "email": "frank@example.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg"
  },
  {
    "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
    "name": "Cathy Warmund",
    "email": "cathy@example.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg"
  }
]
```

# <a name='UserAPI'></a> UserAPI

## <a name='Request-List-of-Users'></a> Request List of Users

[Back to top](#top)

```
GET /users/
```

### Examples

Example usage:

```curl
curl -i http://localhost:8000/users
```

### Success response

#### Success response - `Success 200`

| Name   | Type     | Description                     |
| ------ | -------- | ------------------------------- |
| id     | `UUID`   | <p>Unique id of the User.</p>   |
| name   | `String` | <p>Name of the User.</p>        |
| email  | `String` | <p>Email of the User.</p>       |
| avatar | `String` | <p>Avatar url for the User.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
[
  {
    "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
    "name": "Frank Martinez",
    "email": "frank@example.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg"
  },
  {
    "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
    "name": "Cathy Warmund",
    "email": "cathy@example.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg"
  }
]
```

## <a name='Request-User-information'></a> Request User information

[Back to top](#top)

```
GET /user/:id
```

### Parameters - `Parameter`

| Name | Type   | Description             |
| ---- | ------ | ----------------------- |
| id   | `UUID` | <p>Users unique ID.</p> |

### Examples

Example usage:

```curl
curl -i http://localhost:3000/user/013e4ab9-77e0-48de-9efe-4d96542e791f
```

### Success response

#### Success response - `Success 200`

| Name   | Type     | Description                     |
| ------ | -------- | ------------------------------- |
| id     | `UUID`   | <p>Unique id of the User.</p>   |
| name   | `String` | <p>Name of the User.</p>        |
| email  | `String` | <p>Email of the User.</p>       |
| avatar | `String` | <p>Avatar url for the User.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
  "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
  "name": "Frank Martinez",
  "email": "frank@example.com",
  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg"
}
```

### Error response

#### Error response - `Error 4xx`

| Name                  | Type | Description                                  |
| --------------------- | ---- | -------------------------------------------- |
| UserNotFound          |      | <p>404 The id of the User was not found.</p> |
| InvalidAuthentication |      | <p>403 Authentication failed.</p>            |

### Error response example

#### Error response example - `UserNotFound:`

```json
HTTP/1.1 404 Not Found
{
  "error": "UserNotFound"
}
```

#### Error response example - `Forbidden:`

```json
HTTP/1.1 403 Forbidden
{
  "error": "Authorization failed"
}
```

# <a name='BookAPI'></a> BookAPI

## <a name='Request-List-of-Books'></a> Request List of Books

[Back to top](#top)

```
GET /api/books
```

### Examples

Example usage:

```curl
curl -i http://localhost:8000/api/books
```

### Success response

#### Success response - `Success 200`

| Name           | Type      | Description                                    |
| -------------- | --------- | ---------------------------------------------- |
| id             | `Integer` | <p>Unique id of the Book.</p>                  |
| googleId       | `String`  | <p>GoogleId associated with google book.</p>   |
| title          | `String`  | <p>Title of the Book.</p>                      |
| eTag           | `String`  | <p>Etag of the Book.</p>                       |
| authors        | `String`  | <p>Author(s) of the Book.</p>                  |
| publisher      | `String`  | <p>Publisher of the Book.</p>                  |
| publishDate    | `String`  | <p>Publish Date of the Book.</p>               |
| description    | `String`  | <p>Description of the Book.</p>                |
| isbn10         | `String`  | <p>The Isbn10 of the Book.</p>                 |
| isbn13         | `String`  | <p>The Isbn13 of the Book.</p>                 |
| pageCount      | `Integer` | <p>Number of Pages the Book has.</p>           |
| categories     | `String`  | <p>The Categories associated with Book.</p>    |
| maturityRating | `String`  | <p>Maturity Rating of the Book.</p>            |
| thumbnail      | `String`  | <p>The thumbnail of the Book.</p>              |
| smallThumbnail | `String`  | <p>The small thumbnail of the Book.</p>        |
| language       | `String`  | <p>The Language of the Book.</p>               |
| webReaderLink  | `String`  | <p>The Web Read Link associated with Book.</p> |
| textSnippet    | `String`  | <p>Text Snippet of the Book.</p>               |
| bookFormats    | `String`  | <p>The formats of the Book.</p>                |
| retailPrice    | `Integer` | <p>The price of the Book.</p>                  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK

[
    {
        "id": 1,
        "googleId": "asdfdfn123yy",
        "title": "Harry Potter and the whatever...",
        "eTag": null,
        "authors": null,
        "publisher": null,
        "publishDate": null,
        "description": null,
        "isbn10": null,
        "isbn13": null,
        "pageCount": null,
        "categories": null,
        "maturityRating": null,
        "thumbnail": null,
        "smallThumbnail": null,
        "language": null,
        "webReaderLink": null,
        "textSnippet": null,
        "bookFormats": null,
        "retailPrice": null
    },
    {
        "id": 2,
        "googleId": "asdfdfn123yy",
        "title": "Harry Potter and the whatever...",
        "eTag": null,
        "authors": null,
        "publisher": null,
        "publishDate": null,
        "description": null,
        "isbn10": null,
        "isbn13": null,
        "pageCount": null,
        "categories": null,
        "maturityRating": null,
        "thumbnail": null,
        "smallThumbnail": null,
        "language": null,
        "webReaderLink": null,
        "textSnippet": null,
        "bookFormats": null,
        "retailPrice": null
    }
]

```

## <a name='Request-Book-information'></a> Request Book information

[Back to top](#top)

```
GET /api/books/:bookId
```

### Parameters - `Parameter`

| Name | Type      | Description            |
| ---- | --------- | ---------------------- |
| id   | `Integer` | <p>Book unique ID.</p> |

### Examples

Example usage:

```curl
curl -i http://localhost:3000/api/books/1
```

### Success response

#### Success response - `Success 200`

| Name           | Type      | Description                                    |
| -------------- | --------- | ---------------------------------------------- |
| id             | `Integer` | <p>Unique id of the Book.</p>                  |
| googleId       | `String`  | <p>GoogleId associated with google book.</p>   |
| title          | `String`  | <p>Title of the Book.</p>                      |
| eTag           | `String`  | <p>Etag of the Book.</p>                       |
| authors        | `String`  | <p>Author(s) of the Book.</p>                  |
| publisher      | `String`  | <p>Publisher of the Book.</p>                  |
| publishDate    | `String`  | <p>Publish Date of the Book.</p>               |
| description    | `String`  | <p>Description of the Book.</p>                |
| isbn10         | `String`  | <p>The Isbn10 of the Book.</p>                 |
| isbn13         | `String`  | <p>The Isbn13 of the Book.</p>                 |
| pageCount      | `Integer` | <p>Number of Pages the Book has.</p>           |
| categories     | `String`  | <p>The Categories associated with Book.</p>    |
| maturityRating | `String`  | <p>Maturity Rating of the Book.</p>            |
| thumbnail      | `String`  | <p>The thumbnail of the Book.</p>              |
| smallThumbnail | `String`  | <p>The small thumbnail of the Book.</p>        |
| language       | `String`  | <p>The Language of the Book.</p>               |
| webReaderLink  | `String`  | <p>The Web Read Link associated with Book.</p> |
| textSnippet    | `String`  | <p>Text Snippet of the Book.</p>               |
| bookFormats    | `String`  | <p>The formats of the Book.</p>                |
| retailPrice    | `Integer` | <p>The price of the Book.</p>                  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
    "id": 1,
    "googleId": "asdfdfn123yy",
    "title": "Harry Potter and the whatever...",
    "eTag": null,
    "authors": null,
    "publisher": null,
    "publishDate": null,
    "description": null,
    "isbn10": null,
    "isbn13": null,
    "pageCount": null,
    "categories": null,
    "maturityRating": null,
    "thumbnail": null,
    "smallThumbnail": null,
    "language": null,
    "webReaderLink": null,
    "textSnippet": null,
    "bookFormats": null,
    "retailPrice": null
}
```

### Error response

#### Error response - `Error 4xx`

| Name                  | Type | Description                                  |
| --------------------- | ---- | -------------------------------------------- |
| BookNotFound          |      | <p>404 The id of the Book was not found.</p> |
| InvalidAuthentication |      | <p>403 Authentication failed.</p>            |

|

### Error response example

#### Error response example - `BookNotFound:`

```json
HTTP/1.1 404 Not Found
{
  "error": "BookNotFound"
}
```

#### Error response example - `Forbidden:`

```json
HTTP/1.1 403 Forbidden
{
  "error": "Authorization failed"
}
```

## <a name='#Create-New-Book'></a> Create New Book

[Back to top](#top)

```
POST /books
```

Required Body - `Body`

| Name     | Type     | Description       |
| -------- | -------- | ----------------- |
| googleId | `String` | <p>Google Id.</p> |

### Examples

Example usage:

```curl
curl -d "googleId=asdfdfn123yy&title=Harry Potter" -X POST https://localhost:3000/api/books
```

### Success response

#### Success response - `Success 200`

| Name           | Type      | Description                                    |
| -------------- | --------- | ---------------------------------------------- |
| id             | `Integer` | <p>Unique id of the Book.</p>                  |
| googleId       | `String`  | <p>GoogleId associated with google book.</p>   |
| title          | `String`  | <p>Title of the Book.</p>                      |
| eTag           | `String`  | <p>Etag of the Book.</p>                       |
| authors        | `String`  | <p>Author(s) of the Book.</p>                  |
| publisher      | `String`  | <p>Publisher of the Book.</p>                  |
| publishDate    | `String`  | <p>Publish Date of the Book.</p>               |
| description    | `String`  | <p>Description of the Book.</p>                |
| isbn10         | `String`  | <p>The Isbn10 of the Book.</p>                 |
| isbn13         | `String`  | <p>The Isbn13 of the Book.</p>                 |
| pageCount      | `Integer` | <p>Number of Pages the Book has.</p>           |
| categories     | `String`  | <p>The Categories associated with Book.</p>    |
| maturityRating | `String`  | <p>Maturity Rating of the Book.</p>            |
| thumbnail      | `String`  | <p>The thumbnail of the Book.</p>              |
| smallThumbnail | `String`  | <p>The small thumbnail of the Book.</p>        |
| language       | `String`  | <p>The Language of the Book.</p>               |
| webReaderLink  | `String`  | <p>The Web Read Link associated with Book.</p> |
| textSnippet    | `String`  | <p>Text Snippet of the Book.</p>               |
| bookFormats    | `String`  | <p>The formats of the Book.</p>                |
| retailPrice    | `Integer` | <p>The price of the Book.</p>                  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
    "id": 1,
    "googleId": "asdfdfn123yy",
    "title": "Harry Potter and the whatever...",
    "eTag": null,
    "authors": null,
    "publisher": null,
    "publishDate": null,
    "description": null,
    "isbn10": null,
    "isbn13": null,
    "pageCount": null,
    "categories": null,
    "maturityRating": null,
    "thumbnail": null,
    "smallThumbnail": null,
    "language": null,
    "webReaderLink": null,
    "textSnippet": null,
    "bookFormats": null,
    "retailPrice": null
}
```

### Error response

#### Error response - `Error 4xx`

| Name                  | Type | Description                                 |
| --------------------- | ---- | ------------------------------------------- |
| MissingGoogleId       |      | <p>400 missing required googleId field.</p> |
| InvalidAuthentication |      | <p>403 Authentication failed.</p>           |

|

### Error response example

#### Error response example - `BookNotFound:`

```json
HTTP/1.1 400 Bad Request
{
  "error": "MissingGoogleId"
}
```

#### Error response example - `Forbidden:`

```json
HTTP/1.1 403 Forbidden
{
  "error": "Authorization failed"
}
```

## <a name='#Update-Book'></a> Update Book

[Back to top](#top)

```
PUT /api/books/:bookId
```

Required Params - `Params`

| Name   | Type      | Description               |
| ------ | --------- | ------------------------- |
| bookId | `Integer` | <p>The Id of the Book</p> |

Required Body - `Body`

| Name | Type   | Description                                 |
| ---- | ------ | ------------------------------------------- |
| body | `Body` | <p>Must provide a body with any fields.</p> |

### Examples

Example usage:

```curl
curl -d "title=Harry Potter Book One" -X PUT https://localhost:3000/api/books/1
```

### Success response

#### Success response - `Success 200`

| Name           | Type      | Description                                    |
| -------------- | --------- | ---------------------------------------------- |
| id             | `Integer` | <p>Unique id of the Book.</p>                  |
| googleId       | `String`  | <p>GoogleId associated with google book.</p>   |
| title          | `String`  | <p>Title of the Book.</p>                      |
| eTag           | `String`  | <p>Etag of the Book.</p>                       |
| authors        | `String`  | <p>Author(s) of the Book.</p>                  |
| publisher      | `String`  | <p>Publisher of the Book.</p>                  |
| publishDate    | `String`  | <p>Publish Date of the Book.</p>               |
| description    | `String`  | <p>Description of the Book.</p>                |
| isbn10         | `String`  | <p>The Isbn10 of the Book.</p>                 |
| isbn13         | `String`  | <p>The Isbn13 of the Book.</p>                 |
| pageCount      | `Integer` | <p>Number of Pages the Book has.</p>           |
| categories     | `String`  | <p>The Categories associated with Book.</p>    |
| maturityRating | `String`  | <p>Maturity Rating of the Book.</p>            |
| thumbnail      | `String`  | <p>The thumbnail of the Book.</p>              |
| smallThumbnail | `String`  | <p>The small thumbnail of the Book.</p>        |
| language       | `String`  | <p>The Language of the Book.</p>               |
| webReaderLink  | `String`  | <p>The Web Read Link associated with Book.</p> |
| textSnippet    | `String`  | <p>Text Snippet of the Book.</p>               |
| bookFormats    | `String`  | <p>The formats of the Book.</p>                |
| retailPrice    | `Integer` | <p>The price of the Book.</p>                  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
    "id": 1,
    "googleId": "asdfdfn123yy",
    "title": "Harry Butter Book One",
    "eTag": null,
    "authors": null,
    "publisher": null,
    "publishDate": null,
    "description": null,
    "isbn10": null,
    "isbn13": null,
    "pageCount": null,
    "categories": null,
    "maturityRating": null,
    "thumbnail": null,
    "smallThumbnail": null,
    "language": null,
    "webReaderLink": null,
    "textSnippet": null,
    "bookFormats": null,
    "retailPrice": null
}
```

### Error response

#### Error response - `Error 4xx`

| Name                  | Type | Description                       |
| --------------------- | ---- | --------------------------------- |
| BookNotFound          |      | <p>404 Book not found</p>         |
| InvalidAuthentication |      | <p>403 Authentication failed.</p> |

|

### Error response example

#### Error response example - `BookNotFound:`

```json
HTTP/1.1 404 Bad Request
{
  "error": "BookNotFound"
}
```

#### Error response example - `Forbidden:`

```json
HTTP/1.1 403 Forbidden
{
  "error": "Authorization failed"
}
```

## <a name='#Delete-Book'></a> Delete Book

[Back to top](#top)

```
DELETE /books/:bookId
```

Required Params - `Params`

| Name   | Type      | Description                                    |
| ------ | --------- | ---------------------------------------------- |
| bookId | `Integer` | <p>The ID of the userBook you are editing.</p> |

### Examples

Example usage:

```curl
curl -X DELETE https://localhost:3000/books/1
```

### Error response

#### Error response - `Error 4xx`

| Name                  | Type | Description                                  |
| --------------------- | ---- | -------------------------------------------- |
| BookNotFound          |      | <p>404 no book was not found by that ID.</p> |
| InvalidAuthentication |      | <p>403 Authentication failed.</p>            |

|

### Error response example

#### Error response example - `BookNotFound:`

```json
HTTP/1.1 404 Bad Request
{
  "error": "BookNotFound"
}
```

#### Error response example - `Forbidden:`

```json
HTTP/1.1 403 Forbidden
{
  "error": "Authorization failed"
}
```

# <a name='UserBookAPI'></a> BookAPI

## <a name='Request-List-of-User-Books'></a> Request List of User Books

[Back to top](#top)

```
GET /api/user-books
```

### Examples

Example usage:

```curl
curl -i http://localhost:8000/api/user-books
```

### Success response

#### Success response - `Success 200`

| Name            | Type      | Description                                     |
| --------------- | --------- | ----------------------------------------------- |
| id              | `Integer` | <p>Unique id of the Book.</p>                   |
| readingStatusId | `Integer` | <p>The ID of a valid status.</p>                |
| favourite       | `Boolean` | <p>Book is a user favourite, true or false.</p> |
| dateStarted     | `Date`    | <p>Date user started reading book.</p>          |
| DateFinished    | `Date`    | <p>Date user finished reading book.</p>         |
| currentPage     | `Integer` | <p>Current page of book user is on.</p>         |
| profileId       | `String`  | <p>Id of associated profile.</p>                |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK


[
    {
        "id": 1,
        "title": "Harry Potter Book One",
        "authors": "A Real Author",
        "favourite": false,
        "dateStarted": null,
        "dateFinshed": null,
        "currentPage": 25,
        "username": "ImARealUser"
    },
    {
        "id": 2,
        "title": "Harry Potter Book Two",
        "authors": "A Real Author",
        "favourite": false,
        "dateStarted": null,
        "dateFinshed": null,
        "currentPage": null,
        "username": "ImARealUser"
    }
]


```

## <a name='Request-User-Book-information'></a> Request User Book information

[Back to top](#top)

```
GET /user-books/:bookId
```

### Parameters - `Parameter`

| Name | Type      | Description                 |
| ---- | --------- | --------------------------- |
| id   | `Integer` | <p>User Book unique ID.</p> |

### Examples

Example usage:

```curl
curl -i http://localhost:3000/api/user-books/1
```

### Success response

#### Success response - `Success 200`

| Name            | Type      | Description                                     |
| --------------- | --------- | ----------------------------------------------- |
| id              | `Integer` | <p>Unique id of the Book.</p>                   |
| readingStatusId | `Integer` | <p>The ID of a valid status.</p>                |
| favourite       | `Boolean` | <p>Book is a user favourite, true or false.</p> |
| dateStarted     | `Date`    | <p>Date user started reading book.</p>          |
| DateFinished    | `Date`    | <p>Date user finished reading book.</p>         |
| currentPage     | `Integer` | <p>Current page of book user is on.</p>         |
| profileId       | `String`  | <p>Id of associated profile.</p>                |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
    "id": 1,
    "title": "Harry Potter Book One",
    "authors": "A Real Author",
    "favourite": false,
    "dateStarted": null,
    "dateFinshed": null,
    "currentPage": 25,
    "username": "ImARealUser"
}
```

### Error response

#### Error response - `Error 4xx`

| Name                  | Type | Description                                       |
| --------------------- | ---- | ------------------------------------------------- |
| UserBookNotFound      |      | <p>404 The id of the User Book was not found.</p> |
| InvalidAuthentication |      | <p>403 Authentication failed.</p>                 |

|

### Error response example

#### Error response example - `BookNotFound:`

```json
HTTP/1.1 404 Not Found
{
  "error": "UserBookNotFound"
}
```

#### Error response example - `Forbidden:`

```json
HTTP/1.1 403 Forbidden
{
  "error": "Authorization failed"
}
```

```
POST /api/user-books
```

Required Body - `Body`

| Name      | Type      | Description        |
| --------- | --------- | ------------------ |
| bookId    | `Integer` | <p>Book Id.</p>    |
| profileId | `String`  | <p>Profile Id.</p> |

### Examples

Example usage:

```curl
curl -d "bookId=2&profileId=jalsxkh0uaw3g9mokyzg" -X POST https://localhost:3000/api/user-books
```

### Success response

#### Success response - `Success 200`

| Name            | Type      | Description                                     |
| --------------- | --------- | ----------------------------------------------- |
| id              | `Integer` | <p>Unique id of the Book.</p>                   |
| readingStatusId | `Integer` | <p>The ID of a valid status.</p>                |
| favourite       | `Boolean` | <p>Book is a user favourite, true or false.</p> |
| dateStarted     | `Date`    | <p>Date user started reading book.</p>          |
| DateFinished    | `Date`    | <p>Date user finished reading book.</p>         |
| currentPage     | `Integer` | <p>Current page of book user is on.</p>         |
| profileId       | `String`  | <p>Id of associated profile.</p>                |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
    "id": 1,
    "title": "Harry Potter Book One",
    "authors": "A Real Author",
    "favourite": false,
    "dateStarted": null,
    "dateFinshed": null,
    "currentPage": 25,
    "username": "ImARealUser"
}
```

### Error response

#### Error response - `Error 4xx`

| Name                    | Type | Description                                              |
| ----------------------- | ---- | -------------------------------------------------------- |
| MissingBookAndProfileId |      | <p>400 missing required bookId and ProfileId fields.</p> |
| InvalidAuthentication   |      | <p>403 Authentication failed.</p>                        |

|

### Error response example

#### Error response example - `BookNotFound:`

```json
HTTP/1.1 400 Bad Request
{
  "error": "Must include a book id!"
}
```

#### Error response example - `Forbidden:`

```json
HTTP/1.1 403 Forbidden
{
  "error": "Authorization failed"
}
```

## <a name='#Update-User-Book'></a> Update User Book

[Back to top](#top)

```
PUT /user-books/:bookId
```

Required Params - `Params`

| Name   | Type      | Description                                    |
| ------ | --------- | ---------------------------------------------- |
| bookId | `Integer` | <p>The ID of the userBook you are editing.</p> |

Required Body - `Body`

| Name | Type   | Description                                 |
| ---- | ------ | ------------------------------------------- |
| body | `Body` | <p>Must provide a body with any fields.</p> |

### Examples

Example usage:

```curl
curl -d "currentPage=50&dateStarted=2020/07/14" -X PUT https://localhost:3000/user-books/1
```

### Success response

#### Success response - `Success 200`

| Name            | Type      | Description                                     |
| --------------- | --------- | ----------------------------------------------- |
| id              | `Integer` | <p>Unique id of the Book.</p>                   |
| readingStatusId | `Integer` | <p>The ID of a valid status.</p>                |
| favourite       | `Boolean` | <p>Book is a user favourite, true or false.</p> |
| dateStarted     | `Date`    | <p>Date user started reading book.</p>          |
| DateFinished    | `Date`    | <p>Date user finished reading book.</p>         |
| currentPage     | `Integer` | <p>Current page of book user is on.</p>         |
| profileId       | `String`  | <p>Id of associated profile.</p>                |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
[
    {
      "id": 1,
      "title": "Harry Potter Book One",
      "authors": "A Real Author",
      "favourite": false,
      "dateStarted": "2020/07/14",
      "dateFinshed": null,
      "currentPage": 50,
      "username": "ImARealUser"
    }
]
```

### Error response

#### Error response - `Error 4xx`

| Name                  | Type | Description                                    |
| --------------------- | ---- | ---------------------------------------------- |
| UserBookNotFound      |      | <p>404 user book was not found by that ID.</p> |
| InvalidAuthentication |      | <p>403 Authentication failed.</p>              |

|

### Error response example

#### Error response example - `UserBookNotFound:`

```json
HTTP/1.1 404 Bad Request
{
  "error": "UserBookNotFound"
}
```

#### Error response example - `Forbidden:`

```json
HTTP/1.1 403 Forbidden
{
  "error": "Authorization failed"
}
```

## <a name='#Delete-User-Book'></a> Delete User Book

[Back to top](#top)

```
DELETE /user-books/:bookId
```

Required Params - `Params`

| Name   | Type      | Description                                    |
| ------ | --------- | ---------------------------------------------- |
| bookId | `Integer` | <p>The ID of the userBook you are editing.</p> |

### Examples

Example usage:

```curl
curl -X DELETE https://localhost:3000/user-books/3
```

### Error response

#### Error response - `Error 4xx`

| Name                  | Type | Description                                    |
| --------------------- | ---- | ---------------------------------------------- |
| UserBookNotFound      |      | <p>404 user book was not found by that ID.</p> |
| InvalidAuthentication |      | <p>403 Authentication failed.</p>              |

|

### Error response example

#### Error response example - `UserBookNotFound:`

```json
HTTP/1.1 404 Bad Request
{
  "error": "UserBookNotFound"
}
```

#### Error response example - `Forbidden:`

```json
HTTP/1.1 403 Forbidden
{
  "error": "Authorization failed"
}
```
