import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../services/house.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  homes: any;

  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    this.houseService.findAll().subscribe((houses) => {
      console.log(houses)
      // @ts-ignore
      this.homes = houses.content;
    })
  }

}
