import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Orderr} from "../models/orderr";
import {Order} from "../models/order";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  API = 'http://localhost:8888/orders'

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<any> {
    // @ts-ignore

    return this.httpClient.get(this.API);
  }

  save(orderr: Orderr): Observable<any> {
    return this.httpClient.post(this.API, orderr);
  }

  create(order: Order, idHouse: string | null, idCustomer: string | null): Observable<Order> {
    return this.httpClient.post<Order>(this.API+`/${idHouse}`+`/${idCustomer}`,order)
  }

  findById(id: number): Observable<Orderr> {
    return this.httpClient.get<Orderr>(this.API + `/${id}`);
  }

  delete (id: any): Observable<Orderr> {
    return this.httpClient.delete<Orderr>(this.API + `/${id}`);
  }

}
