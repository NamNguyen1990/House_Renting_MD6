import { Component, OnInit } from '@angular/core';
import {House} from "../../models/house";
import {HouseService} from "../../services/house.service";

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
        console.log(data)
        this.top5Houses = data;
      },
      error => {
        console.log(error);
      });
  }


}
