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

  currentView: 'welcome' | 'login' | 'signup' = 'welcome';
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private auth:AuthService,private router:Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get userName() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  switchView(view: 'welcome' | 'login' | 'signup') {
    this.currentView = view;
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.login();
      this.router.navigate(['/recipe'])
      alert('Logged in successfully');
    }
  }

  signup() {
    if (this.signupForm.valid) {
      // signup logic here
      alert('Signed up successfully');
    }
  }
}

