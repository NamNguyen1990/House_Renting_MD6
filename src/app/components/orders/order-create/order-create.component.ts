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

  constructor(private fb: FormBuilder,
              private orderService: OrderService,
              private activatedRouter: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      startTime: [''],
      endTime: ['']
    })
  }

  orderCreate() {
    this.activatedRouter.paramMap.subscribe((para: ParamMap) => {
      this.orderService.create(this.orderForm.value, para.get('idHome'), localStorage.getItem("ID"))
    })

  }
}
