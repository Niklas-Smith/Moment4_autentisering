### Backend-baserad webbutveckling <br> Moment4 Autentisering och säkerhet.<br> av: Niklas Smith <br>  student-id : nism2400 <br> Kurs: DT207G

Denna uppgiften gick up på använda en jwt token för att göra att de som inte har behöriet kan komma åt de sidorna.  
Man skulle även kunna hasha lösenord som lagras i databasens tabeller.  
Detta repositories innhåller:  
1. package.json med mina Dependencies bcrypt,body-parser,cors,dotenv,express,jsonwebtoken,router,sqlite3
2. install.js skapar mina tabler.
3.  main.js gör så kan använda mina dependencies, anlsuter till databasen och mina CRUD delete,uppdate,select och insert.
4.  main.js fortsätt här finna även min jwt token och hasehedpassword


tre saker jag har gjort
* Skapat en jwt token som gör att man kan dölja sidor för de som är obhöriga
* Använda sig a bcrype för att hasha lösenord
* Kunna logga in på en sida och få tillbaka en jwt token



mina tabeller för Sqlite3 databas:

| Tabel                    |      fält                                                                              |
|--------------------------|----------------------------------------------------------------------------------------|
| users_accunts            | id:INTEGER, username:VARCHAR(255) , password:VARCHAR(255) , DATETIME:CURRENT_TIMESTAMP |
| cars            | id:INTEGER, carbrand:VARCHAR(255) , carmodel:VARCHAR(255) , price:INTERGER, year:INTERGER , DATETIME:CURRENT_TIMESTAMP |





Hur man använder mitt api:

1. POST /api/register  register en användar. måste skicka med rätt information i object
2. POST /api/login  Logga in med ett register konto. måste skicka med rätt information i object (ditt konto).
3. POST /api/cars  lägg till ny bil. måste skicka med rätt information i object.
4. GET /api/cars hämter ut alla bilar som finns i tabellen cars


exempel på hur object kan se ut och ska har följade fält och uppbyggnad.

register/login:

{   

"username" : "niklas",  
"password" : "password"

} 

lägg till ny bil:

{  

"carbrand" : "toyta",   
"carmodel" : "jarris",   
"price" : 350000,  
"year" : 2024  

} 



