import { Injectable } from '@angular/core';
import {ApiService} from "../../../../shared/services/api-service.service";
import {HttpClient} from "@angular/common/http";
import {Data} from "../../../../shared/constants/data";
import {IEquipment} from "../../interface/i-equipment";

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends ApiService{
  constructor(http: HttpClient) { super(http, Data.Equipments)}

}
