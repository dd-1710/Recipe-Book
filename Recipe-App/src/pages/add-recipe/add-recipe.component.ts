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
import { timeout } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import{MatSelectModule} from '@angular/material/select'
import { recipeData } from '../show-recipes/showrecipeData';



@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ShowRecipesComponent,MatFormField,MatLabel,MatSelectModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss',
})
export class AddRecipeComponent {


  public recipeForm!: FormGroup;
  imageUrl: any;
  previewImg: string | null = null;
  selectedFile: File | null = null;
  userRecipes: any;
  public categories:any[] = ["Breakfast","Lunch","Snacks","Beverages","Juices","Smoothies","Dinner"]
  public selectCategoryChip:string='';
  public editRecipe:boolean = false;
  editingRecipeId: number = 0;
  public recipe: recipeData = new recipeData();



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
      image: [null],
      category:['',Validators.required]
    });
    console.log(this.ingredient.length);
    this.service.editRecipe$.subscribe(recipe => {
    if (recipe) {
      this.patchFormWithRecipe(recipe);
      this.editRecipe = true;
      this.editingRecipeId = recipe.id
    }
  });
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

  setFormArray(controlName:'ingredients' | 'procedure',values:string[]){
   const formArray = this.recipeForm.get(controlName) as FormArray;
   formArray.clear();
   values.forEach(val=>formArray.push(this.FormBuidler.group({input:val})))
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



addRecipe() {
 
  if (!this.recipeForm.valid) {
    this.service.showErrorToast('Please fill all the required fields.');
    return; 
  }

  const formData = new FormData();
  const ingredient = this.recipeForm.value.ingredients?.map((item: any) => item.input) || [];
  const procedureSteps = this.recipeForm.value.procedure?.map((item: any) => item.input) || [];

  console.log("INGREDIENTS:", ingredient);
  console.log("STEPS:", procedureSteps);

  formData.append("recipename", this.recipeForm.value.recipeName);
  formData.append("category", this.recipeForm.value.category);
  formData.append("recipedesc", this.recipeForm.value.description);
  formData.append("cookingtime", this.recipeForm.value.cooktime + ' mins');
  formData.append("preptime", this.recipeForm.value.preptime + ' mins');
  formData.append("serves", this.recipeForm.value.serves + ' servings');
  formData.append("procedure", procedureSteps.join('\n'));
  formData.append("ingredients", ingredient.join(','));

  if (this.selectedFile) {
    formData.append("image", this.selectedFile, this.selectedFile.name); 
  }

  this.service.addNewRecipe(formData).subscribe({
    next: (res) => {
      this.service.getRecipes().subscribe();
      console.log("Recipe Added Successfully", res);
      this.service.showSuccessToast(`Recipe ${this.recipeForm.value.recipeName} Added Successfully`);
      
     
      this.recipeForm.reset(); 
    },
    error: (err) => {
      console.error('Failed to add recipe:', err);
      this.service.showErrorToast(`${err.error.message}`);
    }
  });
}

patchFormWithRecipe(recipe: recipeData) {
 
  const extractNumber = (val:string)=>parseInt(val.replace(/\D/,''),10);

  this.recipeForm.patchValue({
    recipeName: recipe.recipe_name,
    description: recipe.recipe_desc,
    category: recipe.category,
    preptime:  extractNumber(recipe.preparation_time),
    cooktime: extractNumber(recipe.cooking_time),
    serves: extractNumber(recipe.serve)
  });


  if (recipe.ingredients) {
    this.setFormArray('ingredients', recipe.ingredients.split(','));
  }

  if (recipe.recipe_procedure) {
    this.setFormArray('procedure', recipe.recipe_procedure.split('\n').map(line=>line.replace(/[\d.]+/g,'')));
  }

  this.previewImg = 'assets/images/' + recipe.img_path;
}


updateRecipe() {
  console.log(this.recipeForm.status);  // INVALID or VALID
console.log(this.recipeForm.errors);  // errors at the form group level (often null)
console.log(this.recipeForm.controls); // to see individual controls

   console.log(this.editingRecipeId)
  if (!this.recipeForm.valid || !this.editingRecipeId) {
    this.service.showErrorToast('Please fill all the required fields.');
    return;
  }

  const formData = new FormData();
  const ingredient = this.recipeForm.value.ingredients?.map((item: any) => item.input) || [];
  const procedureSteps = this.recipeForm.value.procedure?.map((item: any) => item.input) || [];

  formData.append("recipename", this.recipeForm.value.recipeName);
  formData.append("category", this.recipeForm.value.category);
  formData.append("recipedesc", this.recipeForm.value.description);
  formData.append("cookingtime", this.recipeForm.value.cooktime + ' mins');
  formData.append("preptime", this.recipeForm.value.preptime + ' mins');
  formData.append("serves", this.recipeForm.value.serves + ' servings');
  formData.append("procedure", procedureSteps.join('\n'));
  formData.append("ingredients", ingredient.join(','));

  if (this.selectedFile) {
    formData.append("image", this.selectedFile, this.selectedFile.name);
  } else {
    // If image not updated, still send the existing image name
    formData.append("oldImg", this.previewImg?.split('/').pop() || '');
  }

  this.service.updateRecipe(this.editingRecipeId, formData).subscribe({
    next: (res) => {
      this.service.getRecipes().subscribe();
      this.service.showSuccessToast(`Recipe "${this.recipeForm.value.recipeName}" updated successfully!`);
      this.recipeForm.reset();
      this.editRecipe = false;
      this.editingRecipeId = 0;
      this.previewImg = null;
    },
    error: (err) => {
      console.error("Failed to update recipe", err);
      this.service.showErrorToast(err.error.message || "Update failed");
    }
  });
}

}
