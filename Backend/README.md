API Documentation
This document provides an overview of the available endpoints, their descriptions, request parameters, and response formats for a specific API.

POST /login
Description: Authenticate a user using their nickname and password. Returns an authorization token, which is saved in a cookie.

Request Parameters:

nickname (string): User's nickname.
password (string): User's password.
Response:

200 OK: Authentication successful. Returns an authorization token and user information.
401 Unauthorized: Authentication failed. Invalid nickname or password.
POST /signup
Description: Register a new user.

Request Parameters:

nickname (string): New user's nickname.
password (string): New user's password.
Response:

200 OK: Registration successful. Returns an authorization token and user information.
226 IM Used: Nickname already used by another user.
400 Bad Request: Invalid input data.
POST /checkToken
Description: Check the validity of an authorization token.

Request Parameters: None

Response:

200 OK: Token is valid. Returns user information.
401 Unauthorized: Authorization failed. Token is invalid or missing.
GET /getUsers
Description: Get a list of all users (for development purposes).

Request Parameters: None

Response:

200 OK: Request successful. Returns a list of users.
GET /getOneUser
Description: Get information about a specific user by their ID or nickname.

Request Parameters:

id (number, optional): User's ID.
nickname (string, optional): User's nickname.
Response:

200 OK: Request successful. Returns user information.
400 Bad Request: Invalid request. Missing parameters id or nickname.
404 Not Found: User not found.
GET /getPosts
Description: Get a list of all posts.

Request Parameters:

start (number, optional): Starting index for pagination.
max (number, optional): Maximum number of posts to retrieve.
Response:

200 OK: Request successful. Returns a list of posts.
204 No Content: Empty list of posts.
GET /getPostsByUserId
Description: Get a list of posts by a user based on their ID.

Request Parameters:

user_id (number): User's ID.
Response:

200 OK: Request successful. Returns a list of posts by the user.
204 No Content: Empty list of posts.
GET /getPostByPost_id
Description: Get information about a specific post by its ID.

Request Parameters:

post_id (number): Post's ID.
Response:

200 OK: Request successful. Returns post information.
204 No Content: Post not found.
GET /getPostLength
Description: Get the total number of posts.

Request Parameters: None

Response:

200 OK: Request successful. Returns the total count of posts.
POST /createPost
Description: Create a new post.

Request Parameters:

message (string): Text of the post.
Response:

200 OK: Post created successfully. Returns information about the created post.
204 No Content: Failed to create the post.
PUT /updatePost/:post_id
Description: Update information of an existing post.

Request Parameters:

post_id (number): ID of the post to be updated.
message (string, optional): New text of the post (optional).

Response:

200 OK: Post updated successfully. Returns information about the updated post.
204 No Content: Failed to update the post.
DELETE /post/:post_id
Description: Delete an existing post.

Request Parameters:

post_id (number): ID of the post to be deleted.
Response:

200 OK: Post deleted successfully.
204 No Content: Failed to delete the post.
All other routes
Description: Handles all other requests that do not match the defined endpoints.

Response:

404 Not Found: Route not found.
Please note that this documentation provides an overview of the main endpoints, 
their functionality, and request/response details within the given code. 
For comprehensive documentation, it is necessary to provide a detailed description of all request parameters, 
possible errors, and the structure of the data used in requests and responses.
