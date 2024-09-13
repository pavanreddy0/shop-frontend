import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from "@angular/router";


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, RouterLink
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  signInForm = new  FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.signInForm.valid) {
      // Call the AuthService to sign in the user
      this.authService.signin(this.signInForm.value).subscribe(
        response => {
          console.log('User signed in successfully:', response);
          const token = response.data?.token;

          if (typeof token === "string"){
            this.authService.storeToken(token);
          }
          alert("Login Success full")


          this.router.navigate(["/homepage"]);
          // Handle successful sign-in, e.g., navigate to dashboard
        },
        error => {
          console.error('Error signing in:', error);
          // Handle error, e.g., show error message
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
