import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user/user.component';
import {RegistrationComponent} from './user/registration/registration.component';
import {LoginComponent} from './user/login/login.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AuthGuard} from './auth/auth.guard';
import {TodoPageComponent} from './todo-page/todo-page.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TempoPageComponent} from './tempo-page/tempo-page.component'

const routes: Routes = [
  {path: '', redirectTo: 'user/login', pathMatch: 'full'},
  { path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent},
      { path: 'login', component: LoginComponent}
    ]
  },
  {
    path: '',
    component: SidebarComponent,
    children: [     
      { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
      { path: 'todopage', component: TodoPageComponent, canActivate: [AuthGuard]},
      { path: 'tempopage', component: TempoPageComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
