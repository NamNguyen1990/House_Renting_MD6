import {House} from "./house";
import {User} from "./user";

export interface Orderr {
  id?: string;
  house: House;
  customer: User;
  startTime?: string;
  endTime?: string;
  total?: string;
  status:number;
  name?:string;
  email?:string;
  phone?:string;
  request?:string;
  adult?:string;
  kis?:string;
}
