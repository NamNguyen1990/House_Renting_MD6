import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {NgToastService} from 'ng-angular-popup';
import {ResponseBody} from "../../models/response-body";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  status: ResponseBody = {code: '0000', message: 'Hãy điền đầy đủ thông tin vào biểu mẫu'};
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('khoaitay', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    password: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    // name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    // email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('0346543215', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
  });

  constructor(private userService: UserService,
              private toast: NgToastService,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    const user = this.setNewUser();
    this.userService.register(user).subscribe((data: ResponseBody) => {
      if (data.message) {
        this.status = data;
        this.toast.error({detail: "Notification", summary: data.message, duration: 3000, position: 'bottom'});
      } else {
        this.status = data;
        this.toast.success({detail: "Notification", summary: data.message, duration: 3000});
        this.registerForm.reset();
        this.router.navigate(['/login']);
      }

    }, (err) => {
      console.log(err);
      this.status = err.message;
      this.toast.error({detail: "Notification", summary: "Registration failed", duration: 3000})
    });
  }

  private setNewUser() {
    const user: User = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      // email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
    };
    return user;
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

}
