import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ResponseBody} from "../../../models/response-body";

@Component({
  selector: 'app-order-by-id-house',
  templateUrl: './order-by-id-house.component.html',
  styleUrls: ['./order-by-id-house.component.css']
})
export class OrderByIdHouseComponent implements OnInit {
  API = 'http://localhost:8888/orders/find-by-house/';
  status: any;
  constructor(private orderService : OrderService,
              private activatedRouter: ActivatedRoute,
              private httClient: HttpClient) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.httClient.get(this.API + param.get('id')).subscribe((data : ResponseBody) => {
        this.status = data
      }, error => {
        this.status = error;
      })
    })
  }

}
