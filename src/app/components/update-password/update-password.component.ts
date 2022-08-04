import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import firebase from "firebase/compat";
import User = firebase.User;
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  id: any = localStorage.getItem('ID')
  user: User | any
  editForm: FormGroup = new FormGroup({
    password : new FormControl(),
    confirmPassword : new FormControl(),
  })
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile(this.id).subscribe(data => {
        this.editForm.patchValue({
          password : data.password,
          confirmPassword: data.confirmPassword,
        })
        console.log(data)
      },
      error => {
        console.log(error);
      });
  }
  getUser(){
    this.userService.getUserProfile(this.id).subscribe((data) =>{
      this.user = data
    })
  }
  editUser() {
    this.user = {
      username: this.editForm.value.username,
      password: this.editForm.value.password,
      confirmPassword: this.editForm.value.confirmPassword,

    }
    this.userService.updatePassword(this.id, this.user).subscribe(() => {
      console.log('id',this.id)
      this.router.navigate(["/"])
      alert("Successful !!")
    }, error => {
      console.log(error)
    })
  }
}
