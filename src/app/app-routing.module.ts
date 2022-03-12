import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { ItemsComponent } from './items/items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { HeroComponent } from './hero/hero.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'alimente', component: CategoryComponent, data: { category: 'Alimente' }, canActivate: [AuthGuard] },
  { path: 'electronice', component: CategoryComponent, data: { category: 'Electronice' }, canActivate: [AuthGuard] },
  { path: 'casa', component: CategoryComponent, data: { category: 'Casa' }, canActivate: [AuthGuard] },
  { path: 'distractie', component: CategoryComponent, data: { category: 'Distractie' }, canActivate: [AuthGuard] },
  { path: 'sport', component: CategoryComponent, data: { category: 'Sport' }, canActivate: [AuthGuard] },
  { path: 'animale', component: CategoryComponent, data: { category: 'Animale' }, canActivate: [AuthGuard] },
  { path: 'altele', component: CategoryComponent, data: { category: 'Altele' }, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
