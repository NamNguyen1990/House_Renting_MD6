import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ResponseBody} from "../../../models/response-body";
import {Orderr} from "../../../models/orderr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Time} from "../../../models/time";

@Component({
  selector: 'app-order-by-id-house',
  templateUrl: './order-by-id-house.component.html',
  styleUrls: ['./order-by-id-house.component.css']
})
export class OrderByIdHouseComponent implements OnInit {
  API = 'http://209.97.167.87:8888/orders/find-by-house1/';
  status: any;
  classExpression: string = '';
  total: number = 0;
  searchForm!: FormGroup
  p: number = 1;
  total1: number = 0;
  constructor(private orderService: OrderService,
              private activatedRouter: ActivatedRoute,
              private httClient: HttpClient,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      year: [''],
      month: [''],
    });
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.httClient.get(this.API + param.get('id')).subscribe((data: ResponseBody) => {
        this.status = data.data.content
        this.total1= data.data.total
        for (let i = 0; i < data.data.content.length; i++) {
          if (data.data.content[i].status != 1) {
            this.total += data.data.content[i].total
          }
        }
      }, error => {
        this.status = error;
      })
    })
  }

  bgColor(item: Orderr) {
    if (item.status == 1) {
      return 'avaiable';
    } else if (item.status == 2) {
      return 'renting';
    } else {
      return 'hered';
    }
  }
  searchByMonthAndYear(){
    console.log(this.searchForm.value)
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.orderService.findByMonthAndYear(param.get("id"),this.searchForm.value).subscribe((data: ResponseBody) => {
        this.status = data;

        this.total=0;
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

  pageChangeEvent(event: number) {
    console.log(event)

    this.p = event;
    this.ngOnInit();
    this.total = 0;
  }

}
