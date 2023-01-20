import { AuthService } from './../../_core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  showError : boolean;

  constructor(private formBuilder : FormBuilder, private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]], 
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  login(): void
  {
    if(this.loginForm.invalid) return;
    const payLoad = { email: this.email.value, password: this.password.value };
    this.authService.login(payLoad).subscribe({
      next: (response) => {
        window.localStorage["token"]=response.token;
        this.router.navigate(["/dashboard"]);
      },
      error: () => {
        this.showError=true;
      }
    });
  }

  get email(): FormControl{
    return this.loginForm.get("email") as FormControl;
  }
  get password(): FormControl{
    return this.loginForm.get("email") as FormControl;
  }

}
