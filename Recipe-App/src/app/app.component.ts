import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShowRecipesComponent } from '../pages/show-recipes/show-recipes.component';
import { HeaderComponent } from "../pages/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShowRecipesComponent, RouterModule, HeaderComponent],
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
