import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import firebase from "firebase/compat";
import User = firebase.User;
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  id: any = localStorage.getItem('ID')
  user: User | any
  editForm: FormGroup = new FormGroup({
    oldPassword : new FormControl(),
    newPassword : new FormControl(),
    confirmPassword : new FormControl(),
  })
  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit(): void {

  }
  getUser(){
    this.user = {
      password: this.editForm.value.password,
      confirmPassword: this.editForm.value.confirmPassword,
    }
  }


  editPass() {
    if (this.editForm.value.oldPassword==localStorage.getItem('PASSWORD')){
      console.log(localStorage.getItem('PASSWORD'))
      if ((this.editForm.value.oldPassword !== this.editForm.value.newPassword) &&(this.editForm.value.newPassword === this.editForm.value.confirmPassword )){
        console.log(this.editForm.value.newPassword)
        this.userService.updatePassword(this.id, this.user).subscribe(() => {
          alert('Đổi mật khẩu thành công');
          this.editForm.reset();
        }, err => {
          console.log(err)
        });
      }else {
        alert('Lỗi trong')
      }
    }else {
      alert('Error ngoài')
    }

  }
}
