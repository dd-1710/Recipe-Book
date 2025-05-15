import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormControlName,FormGroup } from '@angular/forms';
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
    recipeName: ''
  })

  console.log(this.recipeForm.value.recipeName)

}

}
