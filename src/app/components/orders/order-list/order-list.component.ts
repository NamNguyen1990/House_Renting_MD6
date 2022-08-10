
import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {Orderr} from "../../../models/orderr";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NgToastService} from "ng-angular-popup";
import {ResponseBody} from "../../../models/response-body";


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  id:any;
  oderrs: Orderr[] = [];
  p: number = 1;
  total: number = 0;
  constructor(private orderService : OrderService,
              private modal: NzModalService,
              private toast: NgToastService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.orderService.findAll(localStorage.getItem("ID")).subscribe((data)=>{
    this.oderrs=data.content;
      console.log(data.content)
      this.total = data.total;

  })
  }
  deleteOrder(id:any) {
    console.log(id)
      this.orderService.delete(id).subscribe((data :ResponseBody) => {
        if (data.code==='0000'){
          this.getAllOrders()
          this.toast.success({detail: "Notification", summary: data.message, duration :3000})
        }else {
          this.toast.error({detail: "Notification", summary: data.message, duration :3000})
        }

      }, error => {

      })

  }
  pageChangeEvent(event: number) {
    console.log(event)

    this.p = event;
    this.getAllOrders();
  }

  confirmModal?: NzModalRef; // For testing by now

  showConfirm(id:any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure to delete?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteOrder(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log("cancel")
    });
  }


}
