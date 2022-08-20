import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Orderr} from "../models/orderr";
import {ResponseBody} from "../models/response-body";
import {Time} from "../models/time";
import {FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  API = 'http://localhost:8888/orders'

  constructor(private httpClient: HttpClient) {
  }

  findAll(id: string | null): Observable<any> {
    return this.httpClient.get(this.API + `/find1?customer_id=${id}`);
  }

  save(orderr: Orderr): Observable<any> {
    return this.httpClient.post(this.API, orderr);
  }

  create(order: Orderr, idHouse: string | null, idCustomer: string | null): Observable<ResponseBody> {
    return this.httpClient.post<ResponseBody>(this.API + `/${idHouse}` + `/${idCustomer}`, order)
  }

  findById(id: number): Observable<Orderr> {
    return this.httpClient.get<Orderr>(this.API + `/${id}`);
  }

  delete(id: any): Observable<ResponseBody> {
    return this.httpClient.delete<ResponseBody>(this.API + `/${id}`);
  }

  updateStatus(): Observable<Object> {
    return this.httpClient.get(this.API + `/update-order`);
  }

  findByMonthAndYear(id: string | null, time: Time): Observable<ResponseBody>{
    return this.httpClient.post<ResponseBody>(this.API + `/total/${id}`, time)
  }

}
