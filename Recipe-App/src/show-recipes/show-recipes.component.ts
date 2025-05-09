import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';

@Component({
  selector: 'app-show-recipes',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './show-recipes.component.html',
  styleUrl: './show-recipes.component.css'
})
export class ShowRecipesComponent {

public recipeList:any[] = []
public imgUrl = "http://localhost:4200/assets/images/"

constructor(private recipeservice:RecipeService,private router:Router){

}

ngOnInit(){
  console.log("Show recipe Comp Initialized")
  this.showRecipes();
}

showRecipes(){
  this.recipeservice.getRecipes().subscribe((res)=>{
    this.recipeList = res;

    console.log("The data",this.recipeList)
    console.log(this.imgUrl + this.recipeList[0].imag_path)
  })
}

viewRecipe(id:number){
  this.router.navigate([`recipe/view/${id}`])
}
}
