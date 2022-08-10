import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import firebase from "firebase/compat";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {ResponseBody} from "../../models/response-body";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  id: any = localStorage.getItem('ID')
  status: ResponseBody = {code: '', message: ''}
  editForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  })

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthenticationService,
              private toast: NgToastService) {
  }

  ngOnInit(): void {

  }

  editPassword() {
    if (this.editForm.valid) {
      this.userService.updatePassword(this.id, this.editForm.value).subscribe((data: ResponseBody) => {
        this.status = data
        if (data.code==='0000'){
          this.toast.success({detail: "Notification", summary: data.message, duration: 3000})
          localStorage.clear()
          this.router.navigateByUrl('/login');
        }else {
          this.toast.error({detail: "Notification", summary: data.message, duration: 3000})
        }
      }, (err: ResponseBody) => {
        this.toast.error({detail: "Notification", summary: err.message, duration: 3000})
      })
    } else {
      this.status = {code: 'ffff', message: 'Please enter required fields!'}
    }
  }

  get oldPassword() {
    return this.editForm.get('oldPassword');
  }

  get password() {
    return this.editForm.get('password');
  }

  get confirmPassword() {
    return this.editForm.get('confirmPassword');
  }

}
