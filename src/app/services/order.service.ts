import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../models/order";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  create(order: Order, idHouse: string | null, idCustomer: string | null): Observable<Order> {
    return this.http.post<Order>(environment.apiUrl + "/orders"+`/${idHouse}`+`/${idCustomer}`,order)
  }
}
