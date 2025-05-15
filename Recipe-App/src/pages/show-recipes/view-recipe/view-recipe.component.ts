import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../../../src/services/recipe.service';
import { viewRecipeJson } from './uniqueRecipeData';
import { uniqueRecipeData } from './uniqueRecipeData';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {
  public singleRecipeData!:uniqueRecipeData;
  public imgUrl = environment.imgUrl;
  public ingredients_list:string[] = [];
  public recipe_procedure:string[]  = []

 
  constructor(private recipeService:RecipeService,private activatedRoute:ActivatedRoute,private sanitizer: DomSanitizer){
    
  }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((paramId)=>{
      const id = Number(paramId.get('id'))
      console.log("PARAMMAP",id);
      if(id){
        this.getEachRecipeDetail(id);
      }else{
        console.error("No id Found");
      }
    })
 
  }

  getEachRecipeDetail(id:number){
      this.recipeService.fetchEachRecipeDetail(id).subscribe((data:viewRecipeJson)=>{
      this.singleRecipeData = new uniqueRecipeData(data);
      this.ingredients_list = this.singleRecipeData.ingredients.split(',');
      this.recipe_procedure = this.singleRecipeData.recipe_procedure.split('\n').map(item=>item.replace(/\d+\.\s*/,''));
      console.log("REC",this.recipe_procedure)
    })
  }
  

}
