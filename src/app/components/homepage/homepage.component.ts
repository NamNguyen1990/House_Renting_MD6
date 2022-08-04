import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../services/house.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  homes: any;
  p: number = 1;
  total: number = 0;
  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
  this.getAll()

  }
  getAll(){
    // @ts-ignore
    this.houseService.findAll(this.p).subscribe((houses) => {
      console.log(houses)
      // @ts-ignore
      this.homes = houses.content;
      // @ts-ignore
      this.total=houses.total;
    })
  }
  pageChangeEvent(event: number){
    console.log(event)

    this.p = event;
    this.getAll();
  }
}
