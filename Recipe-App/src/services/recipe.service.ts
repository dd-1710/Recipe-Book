import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { catchError, Observable, throwError } from 'rxjs';

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

}
