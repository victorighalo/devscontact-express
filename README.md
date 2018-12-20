## Devscontact-Express
___
A REST API server implementation built on top Node.js and Express.js with Mongoose.js for MongoDB (MLAB) integration. Access control for selected Routes using Passport.js.

**Details**
The Server provides access to CRUD operations for database of Developers assigned to Categories

### Requirements
___
You need to have NodeJs installed on your machine. The Server was written on Nodejs v8.11.4

### Installing Project
___
1. Yarn 
2. Setup Database in your Env file
3. Make Env file - [example gist](https://gist.github.com/victorighalo/be4e6d2a3739ebbec95c9c46b1319b1b])


## Run Server and Tests
___
1. npm start -- Port 3000 by default
2. npm test

## End Points
___

#### Contacts 
1. URL /contact	
Methods
	1. GET All Contacts (Returns a List) - Open Access without Token
	2. POST (Add a new Contact) - Secured
	3. PUT (Update created contact) - Secured
	4. DELETE (Remove and exist Contact) - Secured
	
2. URL /contact/contactId - Secured
Method - GET

#### Categories 
1. URL /categories	
 Methods
	1. GET All Categories (Returns a List) - Open Access without Token
	2. POST (Add a new Category) - Secured
	3. PUT (Update created contact) - Secured
	4. DELETE (Remove and exist Contact) - Secured
	
2. URL /category/categoryId - Secured
Method - GET - Get a single result


### Authentication
1. URL /auth/register
