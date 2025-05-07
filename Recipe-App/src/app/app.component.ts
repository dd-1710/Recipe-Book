import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShowRecipesComponent } from '../show-recipes/show-recipes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShowRecipesComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 


public showData:boolean=false;
  
  constructor(){
  }

  ngOnInit(){
  
 
  }




  


 
}
