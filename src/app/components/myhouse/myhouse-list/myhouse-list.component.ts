import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../../services/house.service";
import {OwlOptions} from "ngx-owl-carousel-o";
import {House} from "../../../models/house";

@Component({
  selector: 'app-myhouse-list',
  templateUrl: './myhouse-list.component.html',
  styleUrls: ['./myhouse-list.component.css']
})
export class MyhouseListComponent implements OnInit {

  homes!: House[];
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

  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    this.houseService.findHouseByOwnerId(localStorage.getItem('ID')).subscribe((houses: House[]) => {
      this.homes = houses;
    })
  }
}
