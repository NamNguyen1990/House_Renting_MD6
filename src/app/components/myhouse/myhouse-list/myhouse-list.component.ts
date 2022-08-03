import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../../services/house.service";

@Component({
  selector: 'app-myhouse-list',
  templateUrl: './myhouse-list.component.html',
  styleUrls: ['./myhouse-list.component.css']
})
export class MyhouseListComponent implements OnInit {

  homes: any;

  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    this.houseService.findHouseByOwnerId(localStorage.getItem('ID')).subscribe((houses) => {
      console.log(houses)
      // @ts-ignore
      this.homes = houses;
    })
  }
}
