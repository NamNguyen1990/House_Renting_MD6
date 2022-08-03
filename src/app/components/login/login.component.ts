import { Component, OnInit } from '@angular/core';
import {first} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import { NgToastService } from 'ng-angular-popup';
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  });
  // @ts-ignore
  returnUrl: string;
  // @ts-ignore
  adminUrl: string;
  error = '';
  loading = false;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private toast : NgToastService) {
    console.log(this.authenticationService.currentUserValue);
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.returnUrl = '/users';
    this.adminUrl = '/admin'
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          localStorage.setItem('ACCESS_TOKEN', data.accessToken);
          localStorage.setItem('ROLE', data.roles[0].authority);
          localStorage.setItem('USERNAME', data.username);
          localStorage.setItem('ID', data.id);
          localStorage.setItem('AVATAR',data.avatar)
          if (data.roles[0].authority == "ROLE_ADMIN") {
            this.toast.success({detail: "Notification", summary: "Logged in successfully", duration :3000})
            this.router.navigate(["/"])
          } else {
            this.toast.success({detail: "Notification", summary: "Logged in successfully", duration :3000})
            this.router.navigate(["/"]);
          }

        },
        error => {
          this.toast.error({detail: "Notification", summary: "Login failed, Please check again", duration :3000})
          this.loading = false;
        });
  }

}
