import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Orderr} from "../models/orderr";
import {ResponseBody} from "../models/response-body";



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

  create(order: Orderr, idHouse: string | null, idCustomer: string | null): Observable<ResponseBody> {
    return this.httpClient.post<ResponseBody>(this.API+`/${idHouse}`+`/${idCustomer}`,order)
  }

  findById(id: number): Observable<Orderr> {
    return this.httpClient.get<Orderr>(this.API + `/${id}`);
  }

  delete (id: any): Observable<Orderr> {
    return this.httpClient.delete<Orderr>(this.API + `/${id}`);
  }

}
