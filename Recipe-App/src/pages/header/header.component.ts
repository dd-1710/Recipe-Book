import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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

constructor(private auth:AuthService){

}

ngOnInit(){
  this.auth.isLoggedIn$.subscribe(status=>{
    this.isLoggedIn = status;
  })
}
}
