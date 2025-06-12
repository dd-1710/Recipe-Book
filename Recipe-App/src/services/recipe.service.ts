import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { query } from '@angular/animations';
import { recipeData } from '../pages/show-recipes/showrecipeData';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeSubject = new BehaviorSubject<recipeData[]>([]);
  recipe$ = this.recipeSubject.asObservable();

  constructor(private https:HttpClient) 
  {  
    this.getRecipes()

  }
 
  
getRecipes(){
  let userId = sessionStorage.getItem('userId')
  this.https.get<recipeData[]>(environment.apiUrl+`get_recipe/${userId}`).pipe(catchError(err=>{
    console.error("Error Occurred",err);
    return throwError(()=>err)
  })).subscribe((data)=>this.recipeSubject.next(data))
}

fetchEachRecipeDetail(id:any):Observable<any>{
  return this.https.get(environment.apiUrl+`viewRecipe/${id}`).pipe(catchError(err=>{
    console.error("Error",err);
    return throwError(()=>err);
  }))
}

addNewRecipe(formData:FormData):Observable<any>{
  return this.https.post(environment.apiUrl+'add_recipe',formData).pipe(catchError(err=>{
    console.error("Error",err);
     return throwError(()=>err);
  }))
}

registerUser(data:object):Observable<any>{
return  this.https.post(environment.apiUrl + "register_user",data).pipe(catchError(err=>{
 console.error("Error",err);
 return throwError(()=>err)
}))
}

login(data:any): Observable<any> {
  const body = { 
    username:data.username, 
    password : data.password };
    console.log("BODY",body);
  return this.https.post(environment.apiUrl + `login`, body).pipe(
    catchError(err => {
      console.error("Error", err);
      return throwError(() => err);
    })
  );
}

delete(recipeId:number){
 
  return this.https.delete(environment.apiUrl + `recipe/${recipeId}`).pipe(catchError(err=>{
    console.error("Error",err);
    return throwError(()=>err);
  }))
}

favRecipe(user_id:number,recipe_id:number):Observable<any>{
  let body ={
    user_id: user_id,
    recipe_id: recipe_id
  }
  return this.https.post(environment.apiUrl + 'favRecipe',body).pipe(catchError(err=>{
    console.error("Error",err);
    return throwError(()=>err)
  }))
}

}
