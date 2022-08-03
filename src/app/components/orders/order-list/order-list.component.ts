// noinspection AngularMissingOrInvalidDeclarationInModule

import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../../services/house.service";
import {OrderService} from "../../../services/order.service";
import {Orderr} from "../../../models/orderr";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  oderrs: Orderr[] = [];
  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.orderService.findAll().subscribe((data)=>{
      console.log(data.content)
      this.oderrs=data.content;
      console.log("order lít cpn ",this.oderrs)
    })
  }



}
