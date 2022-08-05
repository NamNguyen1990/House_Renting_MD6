import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../../services/house.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-myhouse-detail',
  templateUrl: './myhouse-detail.component.html',
  styleUrls: ['./myhouse-detail.component.css']
})
export class MyhouseDetailComponent implements OnInit {

  API = 'http://localhost:8888/houses/'

  house: any;

  constructor(private houseService: HouseService,
              private activatedRouter: ActivatedRoute,
              private httClient: HttpClient,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.httClient.get(this.API + param.get('id')).subscribe((data) => {
        this.house = data,
        this.showImages(this.house.id);
      })
    })
  }

  images: any[] = []
  showImages(id: any) {
    this.imageService.findByIdHouse(id).subscribe((data) => {
      this.images = data;
    })
  }

}
