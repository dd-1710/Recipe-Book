import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RecipeService } from '../../services/recipe.service';

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
  public successMg:string = ''
  public erroMsg:string = '';


  constructor(private fb: FormBuilder,private auth:AuthService,private router:Router,private recipeService:RecipeService) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  ngOnInit(){
    
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }  


  login(){
     const userDetails = {
      'username':this.loginForm.controls['username'].value,
      'password':this.loginForm.controls['password'].value
     }
     console.log("userdets",userDetails);
     this.recipeService.login(userDetails).subscribe({
      next:(res)=>{
        this.successMg = res.Success;
        this.erroMsg = ''
        setTimeout(()=>{
          this.router.navigate(['/recipe']);
        },500);
        this.auth.login();
        let token = res.token;
        localStorage.setItem('jwtToken',token);
        const userId = res.userId;
        console.log("userId",userId);
        if(userId){
          sessionStorage.setItem("userId",userId);
        }
      },
      error: (err)=>{
       this.erroMsg = err.error?.Error || "Something went wrong";
       this.successMg = '';
      }
     })
  }

  showSignup(){
    this.showSigUp = true;
  }

  registerNewUser(){
    let date = new Date();
    let userData = 
      {
      'username':this.signupForm.controls['username'].value,
      'password':this.signupForm.controls['password'].value,
      'createdat':date.toISOString().slice(0,19).replace('T',' ')
      };
    this.recipeService.registerUser(userData).subscribe({
      next: (res)=>{
        this.successMg = res.Success;
        this.erroMsg = '';
        setTimeout(()=>{
          this.showSigUp = false;
        },500)
      },
      error: (err)=>{
        this.erroMsg = err.error?.Error || "Something went wrong";
         this.successMg = '';
      }
    })
  }

 
}

