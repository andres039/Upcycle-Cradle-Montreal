
#  Trash_panda Backend

## Setup

*  From the command line `cd` into the backend directory                                                                                                                    
* Install dependencies with `npm install`

## Creating and seeding the Database
 
This project uses PostgreSQL to manage the database, make sure it is already in you machine or [install it](https://www.postgresql.org/download/)                                             
               
1. Create a database with the command `CREATE DATABASE trash_panda;`
2. Create tables with the command `\i schema\schema.sql;`
3. Seed the tables with initial information with the command `\i seeds\seeds.sql;`
4. Copy the `.env.example` file to`.env.development` and fill in the necessary PostgreSQL configuration. For the `TOKEN_KEY` section you can make up your own provisional string inside quotation marks. This is only to initialize the token.

## Run The Server

Simply start the server with `npm start`

## API 
   
 
## Users
                   
`GET /api/users`

Response 
```json                                                                                                                       
[
  {
    "id":1,
     "username":"Homer Simpson",
     "email":"homer@nuclearplant.com",
     "password":"$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa"
  } 
]         
```       
`POST /register`
                                                                                                                     
Body:
```json
[
  {
	"username": `string`,
	"email": `string`,
            “password”: `string`
     }

]
 ```
`POST /login`

Body: 
```json
[
  {
      "email": `string`,
      "password": `string`		
  }
]
```
***

##Pins

`GET /api/pins`

Response
```json
 [               
  {
   "id":85,
   "title":"a",
   "description":"a",
   "picture":"a",
   "condition":"New",
   "latitude":45.4877,
   "longitude":-73.5636,
   "date":"2022-01-25T05:00:00.000Z",
   "creator_id":2,
   "claimer_id":null
   }
]

```
`PUT /api/pins/:id` 
   
Body: 
```json 
{
  "current_user_id": `Integer`,
  "pinID": `Integer`
}
```
`DELETE /api/pins/:id`                                 