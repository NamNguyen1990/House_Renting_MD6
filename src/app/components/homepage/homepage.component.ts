import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../services/house.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

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

  homes: any;
  house: any;
  houseId = 1;
  p: number = 1;
  total: number = 0;
  currentId: any;
  constructor(private houseService: HouseService,
              private activatedRouter: ActivatedRoute,
              private httClient: HttpClient) {
  }
  ngOnInit(): void {
    this.currentId=localStorage.getItem("ID")
  this.getAll();
    this.getTop5();

  }
  getAll(){
    // @ts-ignore
    this.houseService.findAll(this.p).subscribe((houses) => {
      // @ts-ignore
      this.homes = houses.content;
      // @ts-ignore
      this.total=houses.total;
    })
    // this.showDetail(this.houseId);
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
  pageChangeEvent(event: number){
    console.log(event)

    this.p = event;
    this.getAll();
  }

  getTop5(){
    this.houseService.findTop5().subscribe((houses)=>{
      console.log(houses)
      // @ts-ignore
      this.homes=houses.content;
    })
  }

}
