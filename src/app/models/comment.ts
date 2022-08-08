import {House} from "./house";
import {User} from "./user";

export interface Comment {
  id: string,
  house: House,
  user: User,
  description: string,
  rate: string
}
