import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss',
})
export class AddRecipeComponent {
  public recipeForm!: FormGroup;

  constructor(private FormBuidler: FormBuilder) {}

  ngOnInit() {
    this.recipeForm = this.FormBuidler.group({
      recipeName: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.FormBuidler.array(
        Array.from({ length: 4 }, () => this.createInput())
      ),
      procedure: this.FormBuidler.array(Array.from({length:5},()=>this.createInput()))
    });
    console.log(this.ingredient.length);
  }

  get ingredient() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get procedure() {
    return this.recipeForm.get('procedure') as FormArray;
  }

  createInput() {
    return this.FormBuidler.group({
      input: [''],
    });
  }

  addInput(input: 'ingredient' | 'procedure') {
    if (input === 'ingredient') {
       this.ingredient.push(this.createInput());
    }
    if ((input === 'procedure')) {
       this.procedure.push(this.createInput());
    }
  }

  deleteInput(i:number,input:'ingredient' | 'procedure'){

    if(input == 'ingredient'){
      console.log("type",input,i)
      this.ingredient.removeAt(i)
    }
    
    if(input == 'procedure'){
      console.log("type",input,i)
      this.procedure.removeAt(i)
    }
    
  }
  
}
