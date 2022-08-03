
import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {Orderr} from "../../../models/orderr";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  id:any;
  orderr: any;
  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
  this.getAllOrderByCustomerId();
  }

  getAllOrderByCustomerId(){
  this.orderService.findAllOrderByCustomerId(localStorage.getItem('ID')).subscribe((order) => {
    console.log(order)
    // @ts-ignore
    this.orderr = order;
  })
  }
  deleteOrder(id:any) {
    console.log(id)
    if (confirm("are you sure?")){
      this.orderService.delete(id).subscribe(() => {
        alert(" Complete!! ?")
        this.getAllOrderByCustomerId()
      }, error => {
        alert("Can't cancel ! Only cancel the rental 1 day before the start date")
        console.log(error)
      })
    }
  }



}
