import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api, Register, Login, GetuserData } from '../config';
import { UserModel } from '../../app/models/user.model';
import { Sweetalert } from '../funciones';
import Swal from 'sweetalert2';
import { ProductosService } from '../services/productos.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
// import { auth } from 'firebase/app';

import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private api:string = Api.url;
  private register:string = Register.url;
  private login:string = Login.url;
  private getuserData:string = GetuserData.url;
  NombreProducto: any;
  CantidadProducto: any;
  nombreItems: string;

  constructor(private http:HttpClient,
              private productsService:ProductosService,
              private router: Router,
              public afAuth: AngularFireAuth) { }

    async LoginGoogle(){
      try{
        return
      }
      catch(error){console.log(error)}
    }

/*=============================================
  Registo de usuarios
=============================================*/
      registerAuth(user: UserModel){
  return this.http.post(`${this.register}`, user);
  }
/*=============================================
  Login de usuarios
=============================================*/
  loginAuth(user){
    return this.http.post(`${this.login}`, user);
}
  getDataByID(id){

    return this.http.get(`${this.api}usuario/${id}`);
  }
  getStoreByID(id){
    return this.http.get(`${this.api}tienda/porIdUsuario/${id}`);
  }

  getAverageByID(id){
    return this.http.get(`${this.api}producto/calificacion/${id}`);
  }

  getOrdesByID(id){

    return this.http.get(`${this.api}compras/usuario/${id}`);
  }
  getPedidoByID(id){

    return this.http.get(`${this.api}pedido/${id}`);
  }
  /*=============================================
    Actualizar usuarios
  =============================================*/
  putUserByID(data){
     return this.http.put(`${this.api}usuario/`, data);
  }
  putcontrasena(data){
    return this.http.put(`${this.api}cambio/contrasena/`, data);
  }

  /*=============================================
    Actualizar usuarios
  =============================================*/
  postSoporteByID(data){
    return this.http.post(`${this.api}correo/soporte`, data);
 }

  /*=============================================
    Calificaciones
  =============================================*/
  getPromedioByID(id){

    return this.http.get(`${this.api}producto/calificacion/${id}`);
  }

  getScoreByID(id){

    return this.http.get(`${this.api}producto/calificaciones/${id}`);
  }

  postScoreByID(data){

     return this.http.post(`${this.api}producto/calificacion/`, data);
  }



/*=============================================
  validar IdToken de usuarios
=============================================*/
  authActivate(){

  		return new Promise(resolve=>{

			/*=============================================
	  		Validamos que el token sea real
	  		=============================================*/

	  		if(localStorage.getItem("token")){

                let body = {

                    token: localStorage.getItem('token')
                }


					/*=============================================
	  				Validamos fecha de expiración
	  				=============================================*/

	  				if(localStorage.getItem("expiresIn")){

	  					let expiresIn = Number(localStorage.getItem("expiresIn"));

	  					let expiresDate = new Date();
	  					expiresDate.setTime(expiresIn);

	  					if(expiresDate > new Date()){

	  						resolve(true)

	  					}else{

	  						localStorage.removeItem('token');
        					localStorage.removeItem('expiresIn');
	  						resolve(false)
	  					}

	  				}else{

	  					localStorage.removeItem('token');
    					localStorage.removeItem('expiresIn');
	  					resolve(false)

	  				}


        }
      })
  }

  //COMPRA DIRECTA

    // tslint:disable-next-line: typedef
    addShoppingCart(item){

      if (item.product['cantidad'] === '0'){
        Swal.fire({
          title: 'Error!',
          text: 'No hay disponibilidad!',
          icon: 'error',
          confirmButtonText: 'OK',
        });

      }else{
      let product = {

        'NombreProducto':item.product['NombreProducto'],
        'Recursos': item.product['Recursos'],
        'Categoria': item.product['Categoria'],
        'NombreTienda':item.product['NombreTienda'],
        'price':item.product['price'],
        'oferta': item.product['oferta'],
        'id': item.product['id'],
        'cantidad': item.product['cantidad'],

      }
      if(localStorage.getItem("list")){

        let arrayList = JSON.parse(localStorage.getItem("list"));

        /*=============================================
        Preguntar si el producto se repite
        =============================================*/

        let count = 0;
        let index;

        for(const i in arrayList){

            // tslint:disable-next-line: triple-equals
            if(arrayList[i].product.NombreProducto == item.product.NombreProducto){

                count --
                index = i;

            }else{

                count ++
            }

        }

        /*=============================================
        Validamos si el producto se repite
        =============================================*/

        if(count === arrayList.length){

            arrayList.push(item);

        }else{

            arrayList[index].unit += item["unit"];

        }

        localStorage.setItem("list", JSON.stringify(arrayList));
        Swal.fire({
          title: '',
          text: 'Procesando',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
          },
        }).then((result) => {
           this.router.navigate(['/checkout']);

        });


    }else{

        let arrayList = [];

        arrayList.push(item);

        localStorage.setItem("list", JSON.stringify(arrayList));
        let timerInterval
        Swal.fire({
          title: '',
          text: 'Procesando',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
          },
        }).then((result) => {
           this.router.navigate(['/checkout']);
        });

    }


    }


  }

        /*=============================================
          Añadir a lista de compras
        =============================================*/

        addListShop(items){

          if(localStorage.getItem("Tienda")){
            this.nombreItems = localStorage.getItem("Tienda") + "," + items.idTienda
          }else{
            this.nombreItems =  items.idTienda
          }

          localStorage.setItem("Tienda" , this.nombreItems);

          // console.log("Items", items)
          if(localStorage.getItem("items" + items.idTienda)){

            let arrayList = JSON.parse(localStorage.getItem("items" + items.idTienda));

              /*=============================================
                Preguntar si el producto se repite
               =============================================*/

        let count = 0;
        let index;

        for(const i in arrayList){

            // tslint:disable-next-line: triple-equals
            if(arrayList[i].product.NombreProducto == items.product.NombreProducto){

                count --
                index = i;

            }else{

                count ++
            }

        }

        /*=============================================
        Validamos si el producto se repite
        =============================================*/

        if(count === arrayList.length){

            arrayList.push(items);

        }else{

            arrayList[index].unit += items["unit"];

        }
            localStorage.setItem("items" + items.idTienda, JSON.stringify(arrayList));
                this.NombreProducto = items.product['NombreProducto']
                this.CantidadProducto = items.product['cantidad']
                Swal.fire({
                  icon: 'success',
                  title: 'Agregaste a tu Lista de Compras',
                  html:
                  `<h4>${this.NombreProducto}</h4><br>`,
                  showConfirmButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Ver Lista de Compras',
                  // timer: 2500
                }).then((result) => {
                  this.router.navigate(['/lista']);
               });

          }else{
            let arrayList = [];
                arrayList.push(items);
                localStorage.setItem("items" + items.idTienda, JSON.stringify(arrayList));
                this.NombreProducto = items.product['NombreProducto']
                this.CantidadProducto = items.product['cantidad']
            Swal.fire({
              icon: 'success',
              title: 'Agregaste a tu Lista de Compras',
              html:
                `<h4>${this.NombreProducto}</h4><br>
                <h6>Cantidad:${this.CantidadProducto} </h6>`,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ver Lista de Compras',
              // timer: 2500
            }).then((result) => {
              this.router.navigate(['/lista']);
           });
          }

        }




  logout(){
    Swal.fire({
      title: '¿Estas seguro que desea cerrar sesion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Cerrar Sesion!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('rol');
        localStorage.removeItem('IdRol');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('token');
        localStorage.removeItem('userdata');
        localStorage.removeItem('idUser');
        window.location.href = '/tienda'
      }
    });
    ;
  }




}
