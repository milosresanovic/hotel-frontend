import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api-service.service";
import {apis} from "src/app/constants/apis"

@Injectable({
  providedIn: 'root'
})
export class RoomDetailsService extends ApiService{

  constructor(http: HttpClient) { super(http, apis.getAllRooms)}
}
