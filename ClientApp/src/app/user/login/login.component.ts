import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import {FormBuilder, Validators,  FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import { NotificationService } from '../../shared/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private notify: NotificationService) {
  }

  loginForm: FormGroup = this.fb.group({
    UserName: ['', Validators.required],
    Password: ['', Validators.required],
  });

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/profile');
  }
  public onSubmit(): void {
    const payload = {
      UserName: this.loginForm.value.UserName,
      Password: this.loginForm.value.Password,
    };
    this.service.LoginAsUser(payload).subscribe(
      (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/profile');
      },
      error => {
        if (error.status === 400){
          this.notify.showError(error.error.message, "Ошибка!")
        }
        else{
          this.notify.showError(error.error.message, "Ошибка!")
        }
      }
    );
  }
}
