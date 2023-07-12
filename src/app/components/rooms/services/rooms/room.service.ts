import { Injectable } from '@angular/core';
import {ApiService} from "../../../../shared/services/api-service.service";
import {HttpClient} from "@angular/common/http";
import {Data} from "../../../../shared/constants/data";
import {IRoom} from "../../interface/i-room";
import {apis} from "src/app/constants/apis"

@Injectable({
  providedIn: 'root'
})
export class RoomService extends ApiService{
  constructor(http: HttpClient) { super(http, apis.getAllRooms)}

}
