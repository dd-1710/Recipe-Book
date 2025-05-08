1) created angular project 

2)created show-recipe component and added data in db

3)Wriiten a get API (get_recipe) by connection to the db

4) Created a service to call get api and while calling api faced CORS issues 
Soltn: import provideHttpClient() and provide it in providers in app.config.ts

