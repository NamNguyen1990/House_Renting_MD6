import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {House} from "../models/house";
import {Observable} from "rxjs";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_CA = 'http://localhost:8888/categories'

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<House[]> {
    // @ts-ignore
    return this.httpClient.get(this.API_CA);
  }

  save(category: Category): Observable<any> {
    return this.httpClient.post(this.API_CA, category);
  }


}
