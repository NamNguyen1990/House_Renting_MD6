import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {ResponseBody} from "../../models/response-body";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  editForm: FormGroup = new FormGroup({
    phone : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    email : new FormControl('',[Validators.email,Validators.required]),
    address : new FormControl('',[Validators.required,Validators.maxLength(50)]),
    fullName : new FormControl('',[Validators.required,Validators.maxLength(35)]),
    avatar : new FormControl(),
  })
  status : ResponseBody = {code:'', message: ''}
   id = localStorage.getItem('ID');
  user : User | any;

  constructor(private userService : UserService,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              private storage: AngularFireStorage,
              private toast: NgToastService) { }

  getUser(){
    this.userService.getUserProfile(this.id).subscribe((data) =>{
      this.user = data
    })
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('ID')
    this.userService.getUserProfile(this.id).subscribe(data => {
        this.editForm.patchValue({
          phone : data.phone,
          email : data.email,
          address : data.address,
          fullName : data.fullName,
          avatar : data.avatar,
        })
      this.avatar = data.avatar
        console.log(data)
      },
      error => {
        console.log(error);
      });
  }
  editUser() {
    this.user = {
      username: '',
      password: '',
      confirmPassword: '',
      phone : this.editForm.value.phone,
      email : this.editForm.value.email,
      address : this.editForm.value.address,
      fullName : this.editForm.value.fullName,
      avatar : this.avatar,
      enabled : '',
    }

    if (this.editForm.valid){
      this.userService.updateUserProfile(this.id, this.user).subscribe((data) => {
        this.status = data
        if (data.code==='0000'){
          localStorage.setItem('AVATAR',this.user.avatar)
          this.router.navigate(['/']);
          this.toast.success({detail: "Notification", summary: data.message, duration :3000})
        }else {
          this.toast.error({detail: "Notification", summary: "Changed failed", duration :3000})
        }

      }, error => {
        console.log(error)
      })
    }else {
      this.status = {code: '#f8d7da', message: 'Please enter required fields!'}
    }
  }
  avatar: any;
  title = 'firebase';
  selectedFile:any;
  downloadURL: any;


  onFileSelected(event:any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          // this.toast.success({detail: "Notification", summary: "Please wait a moment", duration :2000})
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url:any) => {
            if (url) {
              this.avatar = url;
              this.toast.info({detail:"Notification", summary: "Please wait a moment", duration:3000});
            }
            console.log(this.avatar);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  get phone() {
    return this.editForm.get('phone');
  }

  get email() {
    return this.editForm.get('email');
  }

  get address() {
    return this.editForm.get('address');
  }

  get fullName() {
    return this.editForm.get('fullName');
  }


}
