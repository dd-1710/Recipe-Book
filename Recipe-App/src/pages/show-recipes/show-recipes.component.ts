import { Component, Input } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import {FormsModule} from '@angular/forms'
import { BookmarkResponse, recipeData } from './showrecipeData';
import { environment } from '../../environment';

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
isBookmarked = false;





constructor(private recipeservice:RecipeService,private router:Router){

}

ngOnInit(){
  console.log("Show recipe Comp Initialized");
  this.showRecipes();
}


showRecipes(){
  const userId = sessionStorage.getItem('userId');
  const parsedInt = parseInt(userId?? '0')
  console.log("userID",userId);
  this.recipeservice.recipe$.subscribe((allRecipeResponse:recipeData[])=>{
    this.allRecipeResponse = allRecipeResponse.map(recipe=>new recipeData(recipe));
    console.log(this.allRecipeResponse,"ALL Recipe")
    
    if(this.showRecipeByUser){
      console.log("recipes created by user")
      this.recipesToShow = this.allRecipeResponse.filter(recipe=>recipe.user_id === parsedInt)
    }else if(this.showFavRecipes){
      console.log("user fav recipes");
      this.recipesToShow = this.allRecipeResponse.filter(recipe => recipe.is_bookmarked)
    }
    else{
      this.recipesToShow = [...this.allRecipeResponse];
    }
  })
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

deleteRecipe(id:number){
  this.recipeservice.delete(id).subscribe((res)=>{
    let data;
    data = res;
    this.recipeservice.getRecipes();
  })
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
