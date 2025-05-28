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
    this.registerNewUser()
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

  registerNewUser(){
    let date = new Date();
    let userData = 
      {
      'username':this.signupForm.controls['username'].value,
      'password':this.signupForm.controls['password'].value,
      'createdat':date.toISOString().slice(0,19).replace('T',' ')
      };
    this.recipeService.registerUser(userData).subscribe(res=>{
      if(res.Success){
        this.successMg = res.Success;
        setTimeout(()=>{
          //  this.showSigUp = false;
        },2000)
      }

    

    })
  }

 
}

