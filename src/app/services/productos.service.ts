import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../config';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

	private api:String = Api.url;

	constructor(private http:HttpClient ) { }

	getData(){

		return this.http.get(`${this.api}activa/productos`);

	}

	getDataByID(id){

		return this.http.get(`${this.api}producto/${id}`);

  }
  getDataByStoreID(id){

		return this.http.get(`${this.api}productos/tienda/${id}`);

  }

  

  getDataFeria(){

		return this.http.get(`${this.api}feriaActiva`);

  }

  getDataByFeriaID(id){

		return this.http.get(`${this.api}productos/feria/${id}`);

  }
  getBestSellers(){

		return this.http.get(`${this.api}activa/productos/masvendidos`);

  }

  getOffers(){

		return this.http.get(`${this.api}activa/productos/oferta`);

  }

  getDestacados(){

		return this.http.get(`${this.api}activa/productos/vistos`);

  }

  refresh(){
    window.location.reload();
}


}
