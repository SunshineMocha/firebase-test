import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path: 'home', component: MainPageComponent},
  {path: 'user', component: UserPageComponent, canActivate: [authGuard]},
  {path: '', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
