import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import {FormsModule} from '@angular/forms'
import { recipeData } from './showrecipeData';
import { environment } from '../../environment';

@Component({
  selector: 'app-show-recipes',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './show-recipes.component.html',
  styleUrl: './show-recipes.component.scss'
})
export class ShowRecipesComponent {

public recipeList:any[] = []
public imgUrl = environment.imgUrl;
public searchRecipeName:string='';
public filteredRecipe:any[] = [];
public recipesToShow: any[]=[];
public allRecipeResponse:recipeData[] = []


constructor(private recipeservice:RecipeService,private router:Router){

}

ngOnInit(){
  console.log("Show recipe Comp Initialized");
  this.showRecipes();
}

showRecipes(){
  this.recipeservice.getRecipes().subscribe((allRecipeResponse:recipeData[])=>{
    this.allRecipeResponse = allRecipeResponse.map(recipe=>new recipeData(recipe));
    console.log(this.allRecipeResponse,"ALL Recipe")
    this.recipeList = [...this.allRecipeResponse];
    this.recipesToShow = [...this.allRecipeResponse];
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
}
