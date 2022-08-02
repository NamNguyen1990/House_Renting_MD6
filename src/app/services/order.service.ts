import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Orderr} from "../models/orderr";
import {House} from "../models/house";



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  API = 'http://localhost:8888/orders'
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Orderr[]> {
    // @ts-ignore

    return this.httpClient.get(this.API);
  }

  save(orderr: Orderr): Observable<any> {
    return this.httpClient.post(this.API, orderr);
  }

  findById(id: number): Observable<Orderr> {
    return this.httpClient.get<Orderr>(this.API + `/${id}`);
  }

}
