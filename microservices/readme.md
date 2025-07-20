Flow Diagram Explanation
User Request:

The user sends a request to the auth-service to either log in or create a new account.
Controller Layer (auth.controller.ts):

Login Endpoint: Uses @UseGuards(LocalAuthGuard) to protect the route. It calls the login method in the AuthService to authenticate the user and generate a JWT token.
Create Endpoint: Calls the addUser method in the AuthService to add a new user to the DynamoDB table.
Service Layer (auth.service.ts):

validateUser: Validates the user by checking the username and password against the records in DynamoDB.
addUser: Adds a new user to the DynamoDB table after hashing the password.
login: Generates a JWT token for the authenticated user.
DynamoDB Interaction:

The AuthService interacts with DynamoDB to fetch and store user data using AWS SDK.
JWT Management (jwt.strategy.ts):

Manages JWT token creation and validation using passport-jwt strategy.
Passport Configuration (passport-config.ts):

Configures session management using passport.
Application Bootstrap (main.ts):

Sets up the NestJS application with session and passport initialization.
Detailed Code Explanation
auth.module.ts
Imports: Includes necessary modules like PassportModule and JwtModule for authentication.
Providers: Registers AuthService, LocalStrategy, JwtStrategy, and PassportConfig.
Controllers: Registers AuthController.
auth.service.ts
AWS Configuration: Sets up AWS SDK for DynamoDB interaction.
validateUser: Checks if the user exists and verifies the password.
addUser: Hashes the password and stores the user in DynamoDB.
login: Generates a JWT token for the user.
jwt.strategy.ts
JWT Strategy: Uses passport-jwt to extract and validate JWT tokens from requests.
local-auth.guard.ts
Local Auth Guard: Extends AuthGuard to protect routes using the local strategy.
local.strategy.ts
Local Strategy: Validates user credentials using AuthService.
passport-config.ts
Passport Configuration: Manages session serialization and deserialization.
main.ts
Bootstrap Function: Initializes the NestJS application with session and passport middleware.

[User Request]
      |
      v
[Controller Layer]
  /       \
[Login]  [Create]
  |         |
  v         v
[Service Layer]
  |         |
  v         v
[DynamoDB Interaction]
      |
      v
[JWT Management]
      |
      v
[Passport Configuration]
      |
      v
[Application Bootstrap]


Below is a textual description of the flowchart, which you can use to create a visual diagram using a tool like Lucidchart, Draw.io, or any other diagramming software.

User Request:

The user sends a request to the auth-service to either log in or create a new account.
Controller Layer (auth.controller.ts):

Login Endpoint:
Uses @UseGuards(LocalAuthGuard) to protect the route.
Calls the login method in the AuthService.
Create Endpoint:
Calls the addUser method in the AuthService.
Service Layer (auth.service.ts):

validateUser:
Validates the user by checking the username and password against the records in DynamoDB.
addUser:
Adds a new user to the DynamoDB table after hashing the password.
login:
Generates a JWT token for the authenticated user.
DynamoDB Interaction:

The AuthService interacts with DynamoDB to fetch and store user data using AWS SDK.
JWT Management (jwt.strategy.ts):

Manages JWT token creation and validation using passport-jwt strategy.
Passport Configuration (passport-config.ts):

Configures session management using passport.
Application Bootstrap (main.ts):

Sets up the NestJS application with session and passport initialization.
