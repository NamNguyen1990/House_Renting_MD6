import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {House} from "../models/house";
import {ResponseBody} from "../models/response-body";

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  API = 'http://localhost:8888/houses'

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<any> {
    return this.httpClient.get<any>(this.API);
  }

  save(house: House): Observable<any> {
    return this.httpClient.post(this.API, house);
  }

   findById(id: any): Observable<House> {
    return this.httpClient.get<House>(this.API + `/${id}`);
  }

  findHouseByOwnerId (owner_id: any): Observable<House[]> {
    return this.httpClient.get<House[]>(this.API + `/find-by-ownerId?owner_id=${owner_id}`)
  }

  update(id: number, house: House): Observable<ResponseBody> {
    return this.httpClient.put<ResponseBody>(`${this.API}` + `/${id}`, house);
  }
  findTop5():Observable<House[]>{
  // @ts-ignore
    return this.httpClient.get(this.API+`/findTop5`)
  }
  findManyThing(address: any , start: any, end: any, bathroom: any, bedroom: any, dateBegin: any, dateEnd: any): Observable<ResponseBody> {
  return this.httpClient.get(this.API + '/searchByAll')
  }
}
