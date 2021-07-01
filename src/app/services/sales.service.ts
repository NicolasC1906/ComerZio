import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Api } from '../config';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

	private api:String = Api.url;

  	constructor(private http:HttpClient) { }

	getData(){

		return this.http.get(`${this.api}productos/oferta`);

  }

  getListDeparments(){
    return this.http.get(`${this.api}lista/departamentos`);
  }

  getListCities(id){
      return this.http.get(`${this.api}lista/ciudades/departamento/${id}`);
  }

  preference(preferencia){

    const headers = new HttpHeaders();
    headers.append('Content-Type:','application/json; charset=utf-8');
    return this.http.post(`${this.api}pago/mp/preferencia`, preferencia, { headers : headers })

  }
}
