import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import {UserService} from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './user/login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { TodoItemComponent } from './todo-page/todo-item/todo-item.component';
import { TodoService } from './shared/todo.service';
import { TodoCreatorComponent } from './todo-page/todo-creator/todo-creator.component';
import { TempoPageComponent } from './tempo-page/tempo-page.component';
import { TempoDayComponent } from './tempo-page/tempo-day/tempo-day.component';
import { TempoRecordComponent } from './tempo-page/tempo-day/tempo-record/tempo-record.component';
import { TempoDayHeaderComponent } from './tempo-page/tempo-day-header/tempo-day-header.component';
import { FormsModule } from '@angular/forms';
import { StatisticCardComponent } from './statistic-card/statistic-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    UserProfileComponent,
    SidebarComponent,
    TodoPageComponent,
    TodoItemComponent,
    TodoCreatorComponent,
    TempoPageComponent,
    TempoDayComponent,
    TempoRecordComponent,
    TempoDayHeaderComponent,
    StatisticCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),   
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
