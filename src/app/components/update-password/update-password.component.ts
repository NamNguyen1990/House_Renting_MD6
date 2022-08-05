import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import firebase from "firebase/compat";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  id: any = localStorage.getItem('ID')

  editForm: FormGroup = new FormGroup({
    oldPassword : new FormControl(),
    password : new FormControl(),
    confirmPassword : new FormControl(),
  })
  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit(): void {

  }

  editPassword(){
    if (this.editForm.value.oldPassword == localStorage.getItem('PASSWORD')){
      if((this.editForm.value.oldPassword!==this.editForm.value.password) && (this.editForm.value.password=== this.editForm.value.confirmPassword)) {
        console.log(this.editForm.value)
        this.userService.updatePassword(this.id, this.editForm.value).subscribe(() => {
          alert('Successful!');
          localStorage.setItem('PASSWORD', this.editForm.value.password);
          this.editForm.reset();
          this.router.navigateByUrl('/');
        }, err => {
          console.log(err)
        });
      }else {
        alert('Error 2')
      }
    }else {
      alert('Error1')
    }
  }

}
