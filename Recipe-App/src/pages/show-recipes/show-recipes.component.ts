import { Component, Input, SimpleChanges } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import {FormsModule} from '@angular/forms'
import { BookmarkResponse, recipeData } from './showrecipeData';
import { environment } from '../../environment';
import { ToastrService } from 'ngx-toastr';
import { AfterViewInit } from '@angular/core';
import { catchError, of, Subscription, throwError } from 'rxjs';
import {MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'app-show-recipes',
  standalone: true,
  imports: [CommonModule,FormsModule,MatChipsModule],
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
//phrases:string[] = ["Searh For Dosa","Search For Breakfast","Search For Paneer","Search For Lunch","Search For Cake","Search For Snack","Search For Dinner"]
currentPhraseIndex: number = 0;
letterIndex: number = 0;
suppressToast = false;
public category:string[] = ["Breakfast","Lunch","Snacks","Juices","Smoothies","Beverages","Dinner"];
public selectedCategory:string='';
public recipeSubscription :  Subscription | null = null;
  editingRecipeId: number = 0;





constructor(private recipeservice:RecipeService,private router:Router,private toast:ToastrService){

}

ngOnInit() {
  //this.typeEffect();

  this.recipeservice.recipe$.subscribe((allRecipeResponse: recipeData[]) => {
    this.allRecipeResponse = allRecipeResponse.map(recipe => new recipeData(recipe));
    this.applyRecipeFilters();
  });

  this.recipeservice.getRecipes().subscribe();

  this.recipeservice.searchTerm$.subscribe(term => {
    this.applySearchFilter(term);
  });
}

ngOnDestroy(){
  if(this.recipeSubscription){
    this.recipeSubscription.unsubscribe();
  }
}

onCategorySelect(category:string,event:any){
  console.log("clicked on chip")
  if(event.selected){
    this.selectedCategory = category;
    this.applyRecipeFilters(category)
  }else{
    this.selectedCategory = '';
    this.applyRecipeFilters();
  }
}


// typeEffect(){
//   const phraseItem = this.phrases[this.currentPhraseIndex];
//   if(this.letterIndex < phraseItem.length){
//     this.placeholder += phraseItem[this.letterIndex];
//     this.letterIndex++;
//     setTimeout(()=>this.typeEffect(),100)
//   }else{
//     setTimeout(()=>this.eraseEffect(),2000)
//   }

// }


// eraseEffect(){
//   if(this.letterIndex>0){
//     this.placeholder = this.placeholder.slice(0,-1);
//     this.letterIndex--;
//     setTimeout(()=>this.eraseEffect(),50)
//   }else{
//     this.currentPhraseIndex = (this.currentPhraseIndex+1)%this.phrases.length;
//     setTimeout(() => this.typeEffect(), 500);
//   }
  
// }

 

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

applyRecipeFilters(category?:string) {
  const userId = parseInt(sessionStorage.getItem('userId') ?? '0');
   if(this.recipeSubscription){
    this.recipeSubscription.unsubscribe();
  }
  if (this.showRecipeByUser) {
    this.recipesToShow = this.allRecipeResponse.filter(recipe => recipe.user_id === userId);
   
  } else if (this.showFavRecipes) {
    console.log("FAV RECIPES");
    this.recipesToShow = this.allRecipeResponse.filter(recipe => recipe.is_bookmarked);
    this.recipeservice.showSuccessToast(`Here are your favourite recipes!!`);
  }else if(this.selectedCategory){
   this.recipesToShow = this.allRecipeResponse.filter(recipe=>recipe.category === this.selectedCategory);
   if(this.recipesToShow.length == 0){
    this.recipeservice.showInfoToast('No recipes found for selected category')
   }
  }
   else {
    this.recipesToShow = [...this.allRecipeResponse];
    console.log("SHOW",this.recipesToShow)
     this.recipeservice.showInfoToast('All recipes loaded successfully!');
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
  this.recipeservice.delete(id).subscribe({
    next: () => {
      this.recipeservice.getRecipes().subscribe(() => {
        this.isLoading = false;
        this.recipeservice.showSuccessToast("Recipe Deleted Successfully!!")
      });
    },
    error: () => {
      this.toast.clear();
      this.recipeservice.showErrorToast('Failed to delete recipe.');
      this.isLoading = false;
    }
  });
}


editRecipe(recipe:recipeData){
 this.recipeservice.setRecipeToEdit(recipe);
 this.editingRecipeId = recipe.id
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
