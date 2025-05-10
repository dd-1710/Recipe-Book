import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-show-recipes',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './show-recipes.component.html',
  styleUrl: './show-recipes.component.css'
})
export class ShowRecipesComponent {

public recipeList:any[] = []
public imgUrl = "http://localhost:4200/assets/images/";
public searchRecipeName:string='';
public filteredRecipe:any[] = [];
public recipesToShow: any[]=[];

constructor(private recipeservice:RecipeService,private router:Router){

}

ngOnInit(){
  console.log("Show recipe Comp Initialized")
  this.showRecipes();
}

showRecipes(){
  this.recipeservice.getRecipes().subscribe((res)=>{
    this.recipeList = res;
    this.recipesToShow = res;
  })
}


searchRecipe(e:Event){
this.searchRecipeName = (e.target as HTMLInputElement).value;
if(!this.searchRecipeName.trim()){
  this.recipesToShow = this.recipeList;
}else{
 let recipeName = this.recipeList.filter(dish=>dish.recipe_name.toLowerCase().trim().includes(this.searchRecipeName.toLowerCase().trim()))
 this.recipesToShow = recipeName;
 console.log("filteredRecipe",this.recipesToShow);
}
}

viewRecipe(id:number){
  this.router.navigate([`recipe/view/${id}`])
}
}
