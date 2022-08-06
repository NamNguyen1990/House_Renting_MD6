import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {House} from "../models/house";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  API = 'http://localhost:8888/comments'
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Comment[]> {
    // @ts-ignore
    return this.httpClient.get(this.API);
  }
  save(comment: Comment): Observable<any> {
    return this.httpClient.post(this.API, comment);
  }
  findAllByCommentId(id: any):Observable<any>{
    return this.httpClient.get(this.API + `/${id}`);
  }

}
