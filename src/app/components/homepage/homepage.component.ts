import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../services/house.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {OwlOptions} from "ngx-owl-carousel-o";
import {House} from "../../models/house";
import {Message} from "../../models/message";
import {CommentService} from "../../services/comment.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 200,
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<<', '>>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  homes: any;
  house: any;
  houseId = 1;
  p: number = 1;
  total: number = 0;
  currentId: any;
  message: Message[] = [];

  constructor(private houseService: HouseService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.currentId = localStorage.getItem("ID")
    this.getAll();
    // this.getAllMessageByHouse();
  }

  getAll() {
    this.houseService.findAll().subscribe((houses) => {
      this.homes = houses.content;
      this.total = houses.total;
    })
  }

  getHouse(id: number) {
    this.houseId = id;
    this.showDetail(this.houseId);
  }

  showDetail(id: number) {
    this.houseService.findById(this.houseId).subscribe((house) => {
      this.house = house;
    })
  }

  pageChangeEvent(event: number) {
    console.log(event)

    this.p = event;
    this.getAll();
  }

  // checkMessage: any;
  // getAllMessageByHouse() {
  //   this.currentId = localStorage.getItem('ID');
  //   this.messageService.findAllMessageByHouse(this.currentId).subscribe(result => {
  //     this.message = result;
  //     if (this.message.length == 0) {
  //       this.checkMessage = true;
  //     }
  //   }, error => {
  //     console.log(error)
  //   })
  // }
  // delete(id: number) {
  //   this.messageService.deleteMessage(id).subscribe(() => {
  //     this.getAllMessageByHouse();
  //   }, error => {
  //     console.log(error);
  //   })
  // }
}
