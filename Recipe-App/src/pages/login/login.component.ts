import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

 
  loginForm: FormGroup;
  signupForm: FormGroup;
  public showSigUp:boolean = false;


  constructor(private fb: FormBuilder,private auth:AuthService,private router:Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  

  login() {
    if (this.loginForm.valid) {
      this.auth.login();
      this.router.navigate(['/recipe'])
    
    }
  }

  showSignup(){
    this.showSigUp = true;
  }


  goToLogin(){
    this.showSigUp = false;
  }

 
}

