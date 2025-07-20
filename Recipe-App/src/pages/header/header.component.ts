import { Component,EventEmitter,HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

public isLoggedIn:boolean = false;
  username = ''; 
  menuOpen = false;

public placeholder:string = '';
phrases:string[] = ["Searh For Dosa","Search For Cake","Search For Paneer","Search For Soup","Search For Noodles"]
currentPhraseIndex: number = 0;
letterIndex: number = 0;
public filteredRecipe:any[] = [];
public searchRecipeName: string = '';
public recipeList:any[] = []
currentRoute:string = '';


constructor(private auth:AuthService,private router:Router,private service:RecipeService){
 this.router.events.subscribe(()=>{
  this.currentRoute = this.router.url;
 })
}

ngOnInit(){
  this.auth.isLoggedIn$.subscribe(status=>{
    this.isLoggedIn = status;
  })
  this.username = sessionStorage.getItem('userName') || '';
  if(this.isLoggedIn == false){
    this.router.navigate(['/login']);
  } 

  this.typeEffect();

}

typeEffect(){
  const phraseItem = this.phrases[this.currentPhraseIndex];
  if(this.letterIndex < phraseItem.length){
    this.placeholder += phraseItem[this.letterIndex];
    this.letterIndex++;
    setTimeout(()=>this.typeEffect(),100)
  }else{
    setTimeout(()=>this.eraseEffect(),2000)
  }

}


eraseEffect(){
  if(this.letterIndex>0){
    this.placeholder = this.placeholder.slice(0,-1);
    this.letterIndex--;
    setTimeout(()=>this.eraseEffect(),50)
  }else{
    this.currentPhraseIndex = (this.currentPhraseIndex+1)%this.phrases.length;
    setTimeout(() => this.typeEffect(), 500);
  }
  
}

applyFilter() {
  this.service.setSearchTerm(this.searchRecipeName);
}



toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  signOut() {
    sessionStorage.clear();
    this.menuOpen = false;
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
