import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C404Component } from './components/c404/c404.component';
import { HomeComponent } from './components/home/home.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'newUser', component: NewUserComponent },
  { path: '**', component: C404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
