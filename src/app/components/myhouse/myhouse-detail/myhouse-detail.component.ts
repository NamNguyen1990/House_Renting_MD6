import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../../services/house.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ImageService} from "../../../services/image.service";
import {House} from "../../../models/house";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-myhouse-detail',
  templateUrl: './myhouse-detail.component.html',
  styleUrls: ['./myhouse-detail.component.css']
})
export class MyhouseDetailComponent implements OnInit {

  API = 'http://localhost:8888/houses/';

  house!: House;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
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

  constructor(private houseService: HouseService,
              private activatedRouter: ActivatedRoute,
              private httClient: HttpClient) {
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.httClient.get<House>(this.API + param.get('id')).subscribe((data) => {
        this.house = data;
      });
    })
  }

}
