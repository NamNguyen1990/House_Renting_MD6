import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  API = 'http://localhost:8888/messages'

  constructor(private httpClient: HttpClient) { }

  saveMessage (message: Message): Observable<any> {
    return this.httpClient.post(this.API, message);
  }

  findAllMessageByUser(id: any): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.API + `/findByUser/${id}`);
  }

  deleteMessage(id: number): Observable<Message> {
    return this.httpClient.delete<Message>(this.API + `/${id}`);
  }
}
