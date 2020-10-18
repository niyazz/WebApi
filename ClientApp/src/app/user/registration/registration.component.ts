import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import {FormBuilder, Validators,  FormGroup } from '@angular/forms';
import { NotificationService } from '../../shared/notify.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private notify: NotificationService)
  { }

  registrAdminForm: FormGroup = this.fb.group({
    FirstName: ['', Validators.required],
    LastName: [''],
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Password: ['', [Validators.required, Validators.minLength(4)]],
  });

  ngOnInit(): void {
    this.registrAdminForm.reset();
  }

public onSubmit(): void {
  const payload = {
    FirstName: this.registrAdminForm.value.FirstName,
    LastName: this.registrAdminForm.value.LastName,
    UserName: this.registrAdminForm.value.UserName,
    Email: this.registrAdminForm.value.Email,
    Password: this.registrAdminForm.value.Password,
  };
  this.service.RegisterAdmin(payload).subscribe(
      (res: any) => {
        if (res.succeeded){
          this.registrAdminForm.reset();
          this.notify.showSuccess("Регистрация прошла успешно", "Готово!")
        }
        else{
          this.notify.showError("Регистрация не удалась", "Ошибка!")
        }
      },
      error => {
        this.notify.showError(error.error.message, "Ошибка!")
      }
    );
}
}
