import { Component, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { ShowRecipesComponent } from '../show-recipes/show-recipes.component';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ShowRecipesComponent],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss',
})
export class AddRecipeComponent {


  public recipeForm!: FormGroup;
  imageUrl: any;
  previewImg: string | null = null;
  selectedFile: File | null = null;
  userRecipes: any;


  constructor(private FormBuidler: FormBuilder,private service:RecipeService) {}

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
      serves: ['',Validators.required],
      image: [null,Validators.required]
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
    console.log("THIS",this.selectedFile)
    const reader = new FileReader();
    reader.onload = ()=>{
      this.previewImg = reader.result as string;
    };
    reader.readAsDataURL(file)
   }
  }



  addRecipe(){
    const formData = new FormData()
    const ingredient = this.recipeForm.value.ingredients.map((item:any)=>item.input)
    const procedureSteps = this.recipeForm.value.procedure.map((item:any)=>item.input);
    console.log("ING",ingredient)
    console.log("STEPS",procedureSteps);
    formData.append("recipename",this.recipeForm.value.recipeName);
    formData.append("recipedesc",this.recipeForm.value.description);
    formData.append("cookingtime",this.recipeForm.value.cooktime+' '+'mins');
    formData.append("preptime",this.recipeForm.value.preptime+' '+'mins');
    formData.append("serves",this.recipeForm.value.serves+' '+'servings');
    formData.append("procedure",procedureSteps.join('\n'));
    formData.append("ingredients",ingredient.join(','));
    if(this.selectedFile){
      formData.append("image", this.selectedFile, this.selectedFile.name)
    }
    

    this.service.addNewRecipe(formData).subscribe({
     next:(res)=>{
       this.service.getRecipes();
      console.log("Recipe Added Successfully",res)
      this.service.showSuccessToast(`Recipe ${this.recipeForm.value.recipeName} Added Successfully`)
     },
     error:(err)=>{
     console.error('Failed to add recipe:', err);
     this.service.showErrorToast(`${err.error.message}`);
     }
     
    })
  }
  
}
