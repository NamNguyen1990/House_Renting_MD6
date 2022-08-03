import { Component, OnInit } from '@angular/core';
import {first} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import { NgToastService } from 'ng-angular-popup';
import {GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('',Validators.minLength(6)),
    password: new FormControl('')
  });
  // @ts-ignore
  returnUrl: string;
  // @ts-ignore
  adminUrl: string;
  error = '';
  loading = false;
  submitted = false;
  user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private toast : NgToastService,
              private readonly _authService: SocialAuthService
              ) {
    console.log(this.authenticationService.currentUserValue);
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.returnUrl = '/users';
    this.adminUrl = '/admin';
    this._authService.authState.subscribe((user) => {
      console.log(user)
      this.user = user;
    })
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

  signOut(): void {
    this._authService.signOut();
  }

  refreshGoogleToken(): void {
    this._authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithGoogle() {
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data:SocialUser ) => {
      console.log('sign in with google', data);
    }).then(() => {
      this.router.navigate(["/"]);
      console.log('sign in with google then', this.user);
    }, (error) => {
      console.log('error', error);
    });
  }

}
