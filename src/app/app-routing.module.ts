import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: { title: "Home" } },
  { path: 'home', component: HomePageComponent, data: { title: "Home" } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'createChallenge', component: CreateChallengeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
