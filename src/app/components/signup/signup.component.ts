import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    // name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    // email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
  });

  constructor(private userService: UserService,
              private toast: NgToastService,
              private router: Router) {
  }
  ngOnInit() {
  }

  register() {
    const user = this.setNewUser();
    this.userService.register(user).subscribe(() => {
      this.toast.success({detail: "Notification", summary: "Sign Up Success", duration :3000})
      this.registerForm.reset();
      this.router.navigate(['/login']);
    }, err => {
      this.toast.error({detail: "Notification", summary: "Registration failed", duration :3000})
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

}
