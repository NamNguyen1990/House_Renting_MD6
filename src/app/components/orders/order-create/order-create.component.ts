import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  orderForm!: FormGroup
  idHome!: string | null
  status!: string | null
    constructor
(
  private fb: FormBuilder
,
  private orderService: OrderService
,
  private activatedRouter: ActivatedRoute
) {
}

ngOnInit()
:
void {
  this.orderForm = this.fb.group({
    startTime: [''],
    endTime: [''],
    name: [''],
    phone: [''],
    email: [''],
    request: [''],
    adult: [''],
    kis: [''],
  })
  this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
    this.idHome = param.get("idHome")
  })
}

orderCreate()
{
  this.orderService.create(this.orderForm.value, this.idHome, localStorage.getItem("ID")).subscribe((data) => {
    console.log(data)
  })




}
}
