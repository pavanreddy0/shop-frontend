import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';  // Import the AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    // If the token exists, allow access to the route
    if (token) {
      return true;
    } else {
      // If the token does not exist, redirect to the sign-in page
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
