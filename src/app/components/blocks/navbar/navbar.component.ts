import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Message} from "../../../models/message";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  img: any;
  isLogin = false;
  USERNAME = "";
  userId = "";
  avatar = "";
  message: Message[] = [];
  currentId: any
  constructor(private router: Router,
              private messageService: MessageService) {
  }


  ngOnInit(): void {
    this.img = localStorage.getItem('AVATAR');
    this.isLogin = localStorage.getItem('USERNAME') == null ? false : true;
    // @ts-ignore
    this.USERNAME = localStorage.getItem('USERNAME');
    // @ts-ignore
    this.userId = localStorage.getItem('ID');
    this.getAllMessageByUser();
  }

  logOut(){
    localStorage.clear();
    this.isLogin = false;
    this.router.navigate(['/login']);
  }


  getAllMessageByUser() {
    this.currentId = localStorage.getItem('ID');
    this.messageService.findAllMessageByUser(this.currentId).subscribe(result => {
      this.message = result;
    }, error => {
      console.log(error)
    })
  }

  delete(id: any) {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.getAllMessageByUser();
    }, error => {
      console.log(error);
    })
  }
}
