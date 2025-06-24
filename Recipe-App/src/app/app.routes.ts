import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:'',redirectTo:'login',pathMatch:'full'
    },
    {
      path:'login',loadComponent:()=>import('../pages/login/login.component').then(m=>m.LoginComponent)
    },
    {
        path:'recipe',loadComponent:()=>import('../pages/show-recipes/show-recipes.component').then(m => m.ShowRecipesComponent),
        loadChildren:()=>import('../pages/show-recipes/show-recipes-routing').then(m => m.showRecipesRoutes),
      
    },
    {
        path:'recipe/view/:id', loadComponent:()=>import('../pages/show-recipes/view-recipe/view-recipe.component').then(m => m.ViewRecipeComponent)
    },

    {
        path:'add-recipe',loadComponent:()=>import('../pages/add-recipe/add-recipe.component').then(m=>m.AddRecipeComponent),
    },
    {
        path:'favourite',loadComponent:()=>import('../pages/favourite-recipes/favourite-recipes.component').then(m=>m.FavouriteRecipesComponent)
    }
];
