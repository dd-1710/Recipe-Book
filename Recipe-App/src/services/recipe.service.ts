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
 return  this.https.get(environment.apiUrl+'/api/get_recipe').pipe(catchError(err=>{
    console.error("Error Occurred",err);
    return throwError(()=>err)
  }))
}

fetchEachRecipeDetail(id:any):Observable<any>{
  return this.https.get(environment.apiUrl+`/api/viewRecipe/${id}`).pipe(catchError(err=>{
    console.error("Error",err);
    return throwError(()=>err);
  }))
}


}
