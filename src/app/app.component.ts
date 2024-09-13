import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {
    // this.checkAuthentication();
  }
  title = 'shop-spring';

  checkAuthentication() {
    const token = this.authService.getToken();
    // this.router.navigate(['/homepage']);
    if (!token) {
      // If there's no token, redirect to the sign-in page
      this.router.navigate(['/sign-in']);
    } else {
      // Token exists, navigate to the home page
      this.router.navigate(['/homepage']);
    }
  }
}
