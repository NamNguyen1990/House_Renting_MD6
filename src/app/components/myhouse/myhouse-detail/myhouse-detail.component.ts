import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../../services/house.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpClient} from "@angular/common/http";

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
              private httClient: HttpClient) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.httClient.get(this.API + param.get('id')).subscribe((data) => {
        this.house = data
      })
    })
  }

}
