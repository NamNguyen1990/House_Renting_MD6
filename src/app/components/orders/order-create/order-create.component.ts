import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ResponseBody} from "../../../models/response-body";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  orderForm!: FormGroup
  idHome!: string | null
  status: ResponseBody = {code: '', message: '', toast: 'error'};

  constructor
  (
    private fb: FormBuilder
    ,
    private orderService: OrderService
    ,
    private activatedRouter: ActivatedRoute
    ,
    private toast: NgToastService
    ,
    private router: Router
  ) {
  }

  ngOnInit()
    :
    void {
    this.orderForm = this.fb.group({
      startTime: [''],
      endTime: [''],
      name: ['', [Validators.maxLength(30), Validators.required]],
      phone: ['', [Validators.maxLength(10), Validators.minLength(10), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      request: ['', [Validators.maxLength(1000)]],
      adult: ['', [Validators.required]],
      kis: ['', [Validators.required]],
    })
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.idHome = param.get("idHome")
    })
  }

  orderCreate() {
    if (this.orderForm.valid) {
      this.orderService.create(this.orderForm.value, this.idHome, localStorage.getItem("ID")).subscribe((data) => {
        this.status = data;
        if (data.code==='0000'){
          this.toast.success({detail: "Notification", summary: data.message, duration: 3000});
          this.router.navigate(['/orderlist']);
        }else {
          this.toast.error({detail: "Notification", summary: data.message, duration: 3000});
        }

      }, (err) => {
        console.log(err)
        this.status = err;
      })
    } else {
      this.status = {code: 'ffff', message: 'Please enter required fields!'}
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
