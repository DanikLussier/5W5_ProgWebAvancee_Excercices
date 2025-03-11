import { canactivateGuard } from './canactivate.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { DogComponent } from './dog/dog.component';
import { catOrDogGuard } from './cat-or-dog.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cat', component: CatComponent, canActivate: [canactivateGuard, catOrDogGuard] },
  { path: 'dog', component: DogComponent, canActivate: [canactivateGuard] },
  { path: 'home', component: HomeComponent, canActivate: [canactivateGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
