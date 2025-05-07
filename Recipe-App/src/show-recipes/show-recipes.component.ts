import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-recipes',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './show-recipes.component.html',
  styleUrl: './show-recipes.component.css'
})
export class ShowRecipesComponent {
public recipeList:any[] = []
constructor(private recipeservice:RecipeService){

}

ngOnInit(){
  console.log("Show recipe Comp Initialized")
  this.showRecipes();
}

showRecipes(){
  this.recipeservice.getRecipes().subscribe((res)=>{
    this.recipeList = res;
    console.log("The data",this.recipeList)
  })
}
}
