import { Component, Input } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import {FormsModule} from '@angular/forms'
import { BookmarkResponse, recipeData } from './showrecipeData';
import { environment } from '../../environment';
import { ToastrService } from 'ngx-toastr';
import { AfterViewInit } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-show-recipes',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './show-recipes.component.html',
  styleUrl: './show-recipes.component.scss'
})
export class ShowRecipesComponent {

@Input() showRecipeByUser:boolean = false;
@Input() showFavRecipes:boolean = false;

public recipeList:any[] = []
public imgUrl = environment.imgUrl;
public searchRecipeName:string='';
public filteredRecipe:any[] = [];
public recipesToShow: any[]=[];
public allRecipeResponse:recipeData[] = []
public placeholder:string = '';
isBookmarked = false;
phrases:string[] = ["Searh For Dosa","Search For Breakfast","Search For Paneer","Search For Lunch","Search For Cake","Search For Snack","Search For Dinner"]
currentPhraseIndex: number = 0;
letterIndex: number = 0;
suppressToast = false;





constructor(private recipeservice:RecipeService,private router:Router,private toast:ToastrService){

}

ngOnInit(){
  console.log("Show recipe Comp Initialized");
  this.typeEffect();
   this.recipeservice.searchTerm$.subscribe(term => {
    this.applySearchFilter(term);
  });
}

ngAfterViewInit(){
   this.showRecipes();
 
}

typeEffect(){
  const phraseItem = this.phrases[this.currentPhraseIndex];
  if(this.letterIndex < phraseItem.length){
    this.placeholder += phraseItem[this.letterIndex];
    this.letterIndex++;
    setTimeout(()=>this.typeEffect(),100)
  }else{
    setTimeout(()=>this.eraseEffect(),2000)
  }

}


eraseEffect(){
  if(this.letterIndex>0){
    this.placeholder = this.placeholder.slice(0,-1);
    this.letterIndex--;
    setTimeout(()=>this.eraseEffect(),50)
  }else{
    this.currentPhraseIndex = (this.currentPhraseIndex+1)%this.phrases.length;
    setTimeout(() => this.typeEffect(), 500);
  }
  
}


showRecipes(){
  const userId = sessionStorage.getItem('userId');
  const parsedInt = parseInt(userId?? '0');
  const username = sessionStorage.getItem('userName')
  console.log("userID",userId);
  this.recipeservice.recipe$.pipe(catchError(err=>{
  this.recipeservice.showErrorToast('Failed to load recipes.');
    return throwError(() => err);

  })).subscribe((allRecipeResponse:recipeData[])=>{
    this.allRecipeResponse = allRecipeResponse.map(recipe=>new recipeData(recipe));
    console.log(this.allRecipeResponse,"ALL Recipe")
  if (!this.suppressToast) {  
    if(this.showRecipeByUser){
      console.log("recipes created by user")
      this.recipesToShow = this.allRecipeResponse.filter(recipe=>recipe.user_id === parsedInt)
      if(this.recipesToShow.length > 0){
           this.recipeservice.showSuccessToast(`Showing your uploaded recipes!!`);
      }else{
        this.recipeservice.showInfoToast(`You haven't added any recipes yet`)
      }
    }else if(this.showFavRecipes){
      console.log("user fav recipes");
      this.recipesToShow = this.allRecipeResponse.filter(recipe => recipe.is_bookmarked)
      console.log("FAVVVVVVV",this.recipesToShow)
       this.recipeservice.showSuccessToast(`Here are your favorite recipes!!`);
      
    }
    else{
      this.recipesToShow = [...this.allRecipeResponse];
      this.recipeservice.showInfoToast('All recipes loaded successfully!');
    }
  }})
}

applySearchFilter(term: string) {
  if (!term.trim()) {
    this.recipesToShow = [...this.allRecipeResponse];
  } else {
    const lowerTerm = term.toLowerCase();
    this.recipesToShow = this.allRecipeResponse.filter(recipe =>
      recipe.recipe_name.toLowerCase().includes(lowerTerm)
    );
  }
}



searchRecipe(e:Event){
this.searchRecipeName = (e.target as HTMLInputElement).value;
if(!this.searchRecipeName.trim()){
  this.recipesToShow = this.recipeList;
}else{
 let recipeName = this.recipeList.filter(dish=>dish.recipe_name.toLowerCase().trim().includes(this.searchRecipeName.toLowerCase().trim()));
 this.recipesToShow = recipeName;
 console.log("filteredRecipe",this.recipesToShow);
}
}


viewRecipe(id:number){
  this.router.navigate([`recipe/view/${id}`]);
}

public isLoading = false;

deleteRecipe(id: number) {
  this.isLoading = true;
  this.suppressToast = true;

  this.recipeservice.delete(id).subscribe({
    next: () => {
      this.recipeservice.getRecipes(); // emits updated data
      setTimeout(() => {
        this.showRecipes(); // wait for observable to emit
        this.isLoading = false;
      }, 100); // small delay lets subject emit updated value
    },
    error: (err) => {
      this.recipeservice.showErrorToast('Failed to delete recipe.');
      this.isLoading = false;
    }
  });
}



addToFav(recipeId:number){
 const userId = Number(sessionStorage.getItem('userId'));


  this.recipeservice.favRecipe(userId,recipeId).subscribe({
    next:(res:BookmarkResponse)=>{
    const recipe = this.recipesToShow.find((item)=>item.id == recipeId);
    if(recipe){
      recipe.is_bookmarked = res.bookmarked;
      this.recipeservice.getRecipes();
    }

    console.log(res)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

rateRecipe(recipe:any,rating:number){
  if(recipe.rating == rating){
     recipe.rating = rating-1;
  }
  else{
    recipe.rating = rating;
  }
}


}
