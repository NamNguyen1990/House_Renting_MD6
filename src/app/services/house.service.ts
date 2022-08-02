import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {House} from "../models/house";

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  API = 'http://localhost:8888/houses'

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<House[]> {
    // @ts-ignore
    return this.httpClient.get(this.API);
  }

  save(house: House): Observable<any> {
    return this.httpClient.post(this.API, house);
  }

  findById(id: number): Observable<House> {
    return this.httpClient.get<House>(this.API + `/${id}`);
  }

}
