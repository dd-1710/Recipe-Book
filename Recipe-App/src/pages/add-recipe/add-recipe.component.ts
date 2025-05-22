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
  imageUrl: any;
  previewImg: string | null = null;
  selectedFile: File | null = null;


  constructor(private FormBuidler: FormBuilder) {}

  ngOnInit() {
    this.recipeForm = this.FormBuidler.group({
      recipeName: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.FormBuidler.array(
        Array.from({ length: 3 }, () => this.createInput())
      ),
      procedure: this.FormBuidler.array(Array.from({length:3},()=>this.createInput())),
      preptime : ['',Validators.required],
      cooktime: ['',Validators.required],
      serves: ['',Validators.required]
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

  onImageSelected(e:any){
   const file = e.target.files[0]
   if(file){
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = ()=>{
      this.previewImg = reader.result as string;
    };
    reader.readAsDataURL(file)
   }
  }
  
}
