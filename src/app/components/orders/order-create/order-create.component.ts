import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ResponseBody} from "../../../models/response-body";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  orderForm!: FormGroup
  idHome!: string | null
  status: ResponseBody = {code: '' , message: '', toast: 'error'};
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
    name: ['',[Validators.maxLength(30),Validators.required]],
    phone: ['',[Validators.maxLength(10),Validators.minLength(10),Validators.required]],
    email: ['',[Validators.email,Validators.required]],
    request: ['',[Validators.maxLength(1000)]],
    adult: ['',[Validators.required]],
    kis: ['',[Validators.required]],
    // name: [''],
    // phone: [''],
    // email: [''],
    // request: [''],
    // adult: [''],
    // kis: [''],
  })
  this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
    this.idHome = param.get("idHome")
  })
}

orderCreate()
{
  if (this.orderForm.valid){
    this.orderService.create(this.orderForm.value, this.idHome, localStorage.getItem("ID")).subscribe((data) => {
      this.status = data;
      console.log(data)
    }, (err) =>{
      console.log(err)
      this.status = err;
    })
  }else {
    this.status = {code: 'ffff',message: 'Please enter required fields!'}
  }

}

  get name() {
    return this.orderForm.get('name');
  }
  get phone() {
    return this.orderForm.get('phone');
  }
  get email() {
    return this.orderForm.get('email');
  }
  get request() {
    return this.orderForm.get('request');
  }
  get adult() {
    return this.orderForm.get('adult');
  }
  get kis() {
    return this.orderForm.get('kis');
  }
}
