import { ICategory} from "./i-category";
import {IEquipment} from "./i-equipment";

export interface IRoom {
  id: number,
  name: string,
  description: string,
  capacity: number,
  size: number,
  image: string,
  category_id: number,
  equipments: number[],
  price: number,
  comments: {
    user: string,
    comment: string,
    user_image: string,
    date: {
      day: number,
      month: string,
      year: number
    }
    starNumber: number
  }[],
}
