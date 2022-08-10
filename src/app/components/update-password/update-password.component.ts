import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import firebase from "firebase/compat";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NgToastService} from "ng-angular-popup";

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
              private authService: AuthenticationService,
              private modal: NzModalService,
              private toast: NgToastService) { }

  ngOnInit(): void {

  }

  editPassword(){
    if (this.editForm.value.oldPassword == localStorage.getItem('PASSWORD')){
      if((this.editForm.value.oldPassword!==this.editForm.value.password) && (this.editForm.value.password=== this.editForm.value.confirmPassword)) {
        console.log(this.editForm.value)
        this.userService.updatePassword(this.id, this.editForm.value).subscribe(() => {
          this.toast.success({detail:"Notification",summary: "Change password successfully", duration: 3000, position: "br"});
          localStorage.setItem('PASSWORD', this.editForm.value.password);
          this.editForm.reset();
          this.router.navigateByUrl('/');
        }, err => {
          this.toast.error({detail:"Notification",summary: "Change password failed", duration: 3000, position: "br"});
        });
      }else {
        this.toast.error({detail:"Notification",summary: "New passwords do not match. Please check again", duration: 3000, position: "br"});
      }
    }else {
      this.toast.error({detail:"Notification",summary: "The old password is incorrect, please check again", duration: 3000, position: "br"});
    }
  }

  confirmModal?: NzModalRef; // For testing by now

  showConfirmPassword(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to save this change?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => this.editPassword(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

}
