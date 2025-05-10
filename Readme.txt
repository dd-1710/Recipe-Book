<---------------------------Date: 8-may-2025------------------------>

1) created angular project 

2)created show-recipe component and added data in db

3)Wriiten a get API (get_recipe) by connection to the db

4) Created a service to call get api and while calling api faced CORS issues 
Soltn: import provideHttpClient() and provide it in providers in app.config.ts


<----------------------------Date 09-MAY-2025-------------------------->

[CREATION OF NEW COMPONENT VIEW-RECIPE AND ROUTING OF IT]

5) created another component (view-recipe) inside show-recipe-component & and provided the path in app.route.ts & wrote a small method in show-comp.ts and called it in show-comp.html
and added few more images

<---------------------------Date 10-MAY-2025----------------------------->

[SEARCHING RECIPE FROM SEARCH BAR]

6) Implemented search operation to search recipe

--> in html input element i have used input key and also assigned variable declared in ts file in showrecipe to ngModel and value attribute 

--> while filtering original array should not be disturbed so created a new array variable and assigned all recipe to it

--> for searching use event DOM where event.target is converted into htmlinputelement and from it fetched the value

--> written a if condition to return all recipe if there is no search 

--> to the many array applied filter method in which checked condition useing includes property where the recipe element includes recipe which user is searching 

--> finally looped the duplicate array in html without disturbing the orginal array.