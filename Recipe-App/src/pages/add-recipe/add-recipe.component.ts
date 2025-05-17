import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormControlName,FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {

public recipeForm!:FormGroup;

constructor(private formBuidler:FormBuilder){

}

ngOnInit(){

  this.recipeForm = this.formBuidler.group({
    recipeName: ['',Validators.required],
    description : ['',Validators.required],
    ingredients:this.formBuidler.array(Array.from({length:4},()=>this.createInput())),
  })
  console.log(this.recipeForm.value.recipeName)
}

get ingredient(){
  return this. recipeForm.get('ingredients') as FormArray;
}

createInput(){
  return this.formBuidler.group({
    ingredients:[''],
  })
}

addInput(){
  return this.ingredient.push(this.createInput())
}

}
