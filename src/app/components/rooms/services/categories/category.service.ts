import { Injectable } from '@angular/core';
import {ApiService} from "../../../../shared/services/api-service.service";
import {ICategory} from "../../interface/i-category";
import {HttpClient} from "@angular/common/http";
import { Data } from 'src/app/shared/constants/data';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService{
  constructor(http: HttpClient) { super(http, Data.Categories)}

}
