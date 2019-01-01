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
	1. GET All Contacts (Returns a List/Array) - Open Access without Token
		> Response
		>[
    		{
        	"_id": "5c0fbd14f7d2f0361df73507",
        	"firstname": "Samnuel",
        	"lastname": "Victor",
        	"email": "vtest@email.com",
        	"phone": 8062239670,
        	"category": {
            	"_id": "5c07bed0a55cd01aecbc70f8",
            	"name": "Full Stack"
        	},
        	"createdAt": "2018-12-11T13:35:16.160Z",
        	"updatedAt": "2018-12-17T14:48:04.837Z"
    		}
		]
		
	2. POST (Add a new Contact) - Secured
		Header = "x-auth-token" : "token from login"
		>Body
		>
		{
        	"category": "category_id from an already created category",
        	"firstname": "usrfirstname",
        	"lastname": "usrlastname",
        	"email": "test@email.com"",
        	"phone": 87677766
    		}
		
	3. PUT (Update created contact) - Secured
		>Header = "x-auth-token" : "token from login"
		>Body
		>
		{
		"id": "contact id"
        	"category": "category_id from an already created category",
        	"firstname": "usrfirstname",
        	"lastname": "usrlastname",
        	"email": "test@email.com"",
        	"phone": 87677766
    		}
	4. DELETE (Remove and exist Contact) - Secured
		Header = "x-auth-token" : "token from login"
		Body
		>
		{
		"id": "contact id"
    		}
	
2. URL /contact/contactId - Secured
	Method = GET  
	
	Header = "x-auth-token" : "token from login"


#### Categories 
1. URL /categories	
 Methods
	1. GET All Categories (Returns a List/Array) - Open Access without Token
		>Response 
		>[
    		{
        	"_id": "5c07bed0a55cd01aecbc70f8",
        	"name": "Full Stack"
    		}
		]
		
	2. POST (Add a new Category) - Secured 
		Header = "x-auth-token" : "token from login" 
		> Body
		{"name" : "Category name"}
	3. PUT (Update created contact) - Secured 
		Header = "x-auth-token" : "token from login" 
		> Body
		{"id": "category id", "name" : "Category name"}
	4. DELETE (Remove and exist Contact) - Secured
		Header = "x-auth-token" : "token from login" 
		> Body
		{"id": "category id"}
	
2. URL /category/categoryId - Secured  

Method = GET - Get a single result


### Authentication
1. URL /auth/register <br>
	>
	>Params
	>{
	>"email" : "test@email.com",
	>"password" : "password@1",
	>"firstname": "usrfirstname",
	>"lastname" : "usrlastname"
	>}
	
	>>Success Response
	{
		"message": "User registered",
    		"data": {
        	"email": "test@email.com",
        	"firstname": "usrfirstname",
        	"lastname": "usrlastname",
        	"_id": "5c214edbbbb919542273221e",
        	"createdAt": "2018-12-24T21:25:47.794Z"
    			}
	}
	
	>> Error Response
	{
    	"message": "User with email (test@email.com) already exists"
	}

2. URL /auth/login
	>
	>Params
	>{
	>"email" : "test@email.com",
	>"password" : "password@1"
	>}
	
	>>Success Response
	{"token": "token value"}
	
	>> Error Response
	{
    "message": {
        "errors": {
            "email or password": "is invalid"
        	  }
    		}
	}
