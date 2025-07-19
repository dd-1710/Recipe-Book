import { Component } from '@angular/core';
import { ShowRecipesComponent } from '../show-recipes/show-recipes.component';

@Component({
  selector: 'app-favourite-recipes',
  standalone: true,
  imports: [ShowRecipesComponent],
  templateUrl: './favourite-recipes.component.html',
  styleUrl: './favourite-recipes.component.css'
})
export class FavouriteRecipesComponent {

}
