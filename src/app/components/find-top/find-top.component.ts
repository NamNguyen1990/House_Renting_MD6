import { Component, OnInit } from '@angular/core';
import {House} from "../../models/house";
import {HouseService} from "../../services/house.service";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-find-top',
  templateUrl: './find-top.component.html',
  styleUrls: ['./find-top.component.css']
})
export class FindTopComponent implements OnInit {
  top5Houses : House[] | any

  constructor(private houseService : HouseService) { }

  ngOnInit(): void {
    this.getTop5()
  }

  getTop5() {
    this.houseService.findTop5().subscribe(data => {
        console.log('data',data)
        this.top5Houses = data;
      },
      error => {
        console.log(error);
      });
  }

  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 200,
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ '<<', '>>' ],
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
  pageChangeEvent(event: number){
    console.log(event)
    this.p = event;
    this.getTop5();
  }

  p: number = 1;
  total: number = 0;
  currentId: any;



}
