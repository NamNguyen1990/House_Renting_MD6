import {User} from "./user";
import {Category} from "./category";
import {Image} from "./image";

export interface House {
  id?: string;
  name?: string;
  address?: string;
  bedroom?: string;
  bathroom?: string;
  description?: string;
  price?: string;
  status?: string;
  category?: Category;
  owner?: User;
  avatarHouse?: string;
  images?: Image[];
}
