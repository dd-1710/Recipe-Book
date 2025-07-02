import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { query } from '@angular/animations';
import { recipeData } from '../pages/show-recipes/showrecipeData';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeSubject = new BehaviorSubject<recipeData[]>([]);
  recipe$ = this.recipeSubject.asObservable();

  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  private editRecipeSubject = new BehaviorSubject<recipeData | null>(null);
  editRecipe$ = this.editRecipeSubject.asObservable();

  constructor(private https:HttpClient,private toast:ToastrService) 
  {  
    this.getRecipes().subscribe();

  }

  setRecipeToEdit(recipe: recipeData) {
    this.editRecipeSubject.next(recipe);
  }

 
getRecipes(): Observable<recipeData[]> {
  const userId = sessionStorage.getItem('userId');
  return this.https.get<recipeData[]>(`${environment.apiUrl}get_recipe/${userId}`).pipe(
    catchError(err => {
      console.error("Error Occurred", err);
      return throwError(() => err);
    }),
    // update the BehaviorSubject once we get data
    tap(data => this.recipeSubject.next(data))
  );
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

 setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  
showSuccessToast(message: string) {
  this.toast.success(message, '', this.toastOptions());
}

showInfoToast(message: string) {
  this.toast.info(message, '', this.toastOptions());
}

toastOptions() {
  return {
    positionClass: 'toast-top-center',
    timeOut: 2500,
    closeButton: true,
    progressBar: true,
    toastClass: 'ngx-toastr toast-success custom-toast'
  };
}
showErrorToast(message: string) {
  this.toast.error(message, 'Error', this.toastErrorOptions());
}

toastErrorOptions() {
  return {
    positionClass: 'toast-top-center',
    timeOut: 3000,
    closeButton: true,
    progressBar: true,
    toastClass: 'ngx-toastr toast-error custom-toast'
  };
}


updateRecipe(recipeId: number, formData: FormData) {
  return this.https.put(`${environment.apiUrl}edit_recipe/${recipeId}`, formData);
}




}
