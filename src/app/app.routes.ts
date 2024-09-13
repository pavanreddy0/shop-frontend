import { Routes } from '@angular/router';
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {AuthGuard} from "./auth.guard";


export const routes: Routes = [
  {
    path: "sign-in",
    component: SigninComponent
  },
  {
    path: "sign-up",
    component: SignupComponent
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [AuthGuard]
  },
];
