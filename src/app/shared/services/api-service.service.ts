import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from "rxjs";
import {config} from "src/app/constants/config";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api = config.SERVER;
  constructor(protected http: HttpClient, @Inject("path") protected path: string) { }

  getAll(keyword?:string, minPrice?:number, maxPrice?:number, personsNumber?:number, headers?: HttpHeaders, pageNumber?: number): Observable<any> {
    let newUrl: string = config.SERVER + this.path;
    let query: string[] = [];

    if(keyword){
      query.push(`Keyword=${keyword}`);
    }
    if(minPrice){
      query.push(`MinPrice=${minPrice}`);
    }
    if(maxPrice){
      query.push(`MaxPrice=${maxPrice}`);
    }
    if(personsNumber){
      query.push(`MaxPersons=${personsNumber}`);
    }
    if(pageNumber){
      query.push(`Page=${pageNumber}`);
    }

    if(query.length > 0){
      newUrl += `?${query.join('&')}`;
    }

    return this.http.get(newUrl, {headers});
  }

  get(id: number | string): Observable<any> {
    return this.http.get(this.api + this.path + "/" + id);
  }

  create(dataToSend: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(this.api + this.path, dataToSend, {headers});
  }

  update(id: number | string, dataToSend: any): Observable<any>  {
    return this.http.put(this.api + this.path + "/" + id, dataToSend);
  }

  delete(id: number | string, headers?: HttpHeaders): Observable<any>  {

    return this.http.delete(this.api + this.path + "/" + id, {headers});
  }
}
