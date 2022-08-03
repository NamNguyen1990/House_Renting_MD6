import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../services/house.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  homes: any;

  house: any;
  houseId = 1;

  constructor(private houseService: HouseService,
              private activatedRouter: ActivatedRoute,
              private httClient: HttpClient) {
  }

  ngOnInit(): void {
    this.houseService.findAll().subscribe((houses) => {
      console.log(houses)
      // @ts-ignore
      this.homes = houses.content;
    })
    this.showDetail(this.houseId);
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
}
