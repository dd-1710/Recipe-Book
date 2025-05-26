import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginForm! : FormGroup;

  constructor(private fb:FormBuilder,private route:Router){

  }

  ngOnInit(){

    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  get userName(){
   return  this.loginForm.get('username')
  }

  get password(){
    return this.loginForm.get('password');
  }

  login(){
    if(this.loginForm.valid){
      console.log("logging")
       this.route.navigate(['/recipe']);
       sessionStorage.setItem('isLoggedIn','True')
    }
  }

}
