import { Component,HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

public isLoggedIn:boolean = false;
  username = 'john'; // You should get this from AuthService or localStorage
  menuOpen = false;

constructor(private auth:AuthService,private router:Router){

}

ngOnInit(){
  this.auth.isLoggedIn$.subscribe(status=>{
    this.isLoggedIn = status;
  })
  this.username = localStorage.getItem('username') || '';
  if(this.isLoggedIn == false){
    this.router.navigate(['/login']);
  } 
}



toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  signOut() {
    sessionStorage.clear();
    this.menuOpen = false;
    this.router.navigate(['/login']);
  }
}
