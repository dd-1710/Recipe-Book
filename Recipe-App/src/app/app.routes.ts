import { Routes } from '@angular/router';

import { showRecipesRoutes } from '../show-recipes/show-recipes-routing';



export const routes: Routes = [

    {
        path:'',redirectTo:'recipe',pathMatch:'full'
    },
    {
        path:'recipe',loadComponent:()=>import('../show-recipes/show-recipes.component').then(m => m.ShowRecipesComponent),
        loadChildren:()=>import('../show-recipes/show-recipes-routing').then(m => m.showRecipesRoutes),
      
    },
    {
        path:'recipe/view/:id', loadComponent:()=>import('../show-recipes/view-recipe/view-recipe.component').then(m => m.ViewRecipeComponent)
    }
];
