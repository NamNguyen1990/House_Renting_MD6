// noinspection AngularMissingOrInvalidDeclarationInModule

import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../../services/house.service";
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  oderrs:any;
  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.orderService.findAll().subscribe((data)=>{
      console.log(data)
      // @ts-ignore
      this.oderrs=data.content;
    })
  }



}
