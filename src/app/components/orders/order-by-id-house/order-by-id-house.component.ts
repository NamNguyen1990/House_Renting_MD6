import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ResponseBody} from "../../../models/response-body";
import {Orderr} from "../../../models/orderr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-order-by-id-house',
  templateUrl: './order-by-id-house.component.html',
  styleUrls: ['./order-by-id-house.component.css']
})
export class OrderByIdHouseComponent implements OnInit {
  API = 'http://localhost:8888/orders/find-by-house/';
  status: any;
  classExpression: string = '';
  total: number = 0;
  searchForm!: FormGroup
  constructor(private orderService: OrderService,
              private activatedRouter: ActivatedRoute,
              private httClient: HttpClient,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      year: [''],
      month: [''],
    })
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.httClient.get(this.API + param.get('id')).subscribe((data: ResponseBody) => {
        this.status = data;
        console.log(data)
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].status != 1) {
            this.total += data.data[i].total
          }
        }
      }, error => {
        this.status = error;
      })
    })
  }

  bgColor(item: Orderr) {
    if (item.status == 1) {
      return 'item item-avaiable';
    } else if (item.status == 2) {
      return 'item item-renting';
    } else {
      return 'item item-hered';
    }
  }
  searchByMonthAndYear(){
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.orderService.findByMonthAndYear(param.get("id"),this.searchForm).subscribe((data: ResponseBody) => {
        this.status = data;
        console.log(data)
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].status != 1) {
            this.total += data.data[i].total
          }
        }
      }, error => {
        this.status = error;
      })
    })
  }

}
