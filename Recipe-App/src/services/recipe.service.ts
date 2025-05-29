import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { catchError, Observable, throwError } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private https:HttpClient) 
  { 

  }
 
  
getRecipes():Observable<any>{
  console.log("api",environment.apiUrl)
 return  this.https.get(environment.apiUrl+'get_recipe').pipe(catchError(err=>{
    console.error("Error Occurred",err);
    return throwError(()=>err)
  }))
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

}
