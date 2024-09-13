import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from "@angular/common";
import {AuthService} from "../auth.service";
import {response} from "express";


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor( private authService: AuthService) {
  }
  onSubmit(){
    if (this.signupForm.valid) {
      console.log('Form Data:', this.signupForm.value);
      this.authService.signup(this.signupForm.value).subscribe(
        response => {
          console.log('User signed up successfully:', response);
        },
        error => {
          console.error('Error signing up:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
