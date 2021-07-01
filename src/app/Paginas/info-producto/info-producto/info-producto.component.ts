import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';
import { Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutingModule } from '../../../app-routing.module';
import { Path } from '../../../config';
import {  Quantity } from '../../../funciones';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/app.validator';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.component.html',
  styleUrls: ['./info-producto.component.scss']
})
export class InfoProductoComponent implements OnInit {

  currentRate = 0;

id:any;
subscriptions:Subscription[]=[];
recursos:any = [];
products:any = [];
getproducts:any = [];
getRecursos:Array<any> = [];
banderaoffer:boolean;
  bandera:boolean;
  namebandera:any;
  pricet: any;
  tachado:boolean;
  nombrequick: any;
  descripcionquick: any;
  Recursosquick: any;
  tachadoquick: boolean;
  pricequick: any;
  banderaquick: boolean;
  banderaofferquick: boolean;
  namebanderaquick: string;
  pricetquick: any;
  cantidadquick: any;
  tagsquick: any;
  tags: any = [];
  caracteristicas: any = [];
  price: any;
  idmodal: any;
  render: Boolean = true;
  quantity:number = 1;
  cantidadsel: number;
  cantidadmax: any;
  pormayor: any;
  pricepormayor: any;
  precioalpormayor: boolean;
  mostrarmayor: boolean;
  ocultarprice: boolean;
  Tienda: any;
  comentarioproduct: any;
  sicomentarios: boolean;
  nocomentarios: boolean;
  textoDeInput: string = null
  registerForm: any;
  promedio_calificacion: any;
  datos: any;



  constructor(
    private ProductosService: ProductosService,
    private ActivatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private fb: FormBuilder,
    private cookie: CookieService,

    private router: Router) {
      this.id= this.ActivatedRoute.snapshot.paramMap.get('id')
     }

  ngOnInit(): void {
    this.reinicio()
    this.Averagecomentarios(

    )

  }

  reinicio(){
    if(this.cookie.get("reloadStore")){
      this.cookie.delete("reloadStore")
      window.location.reload()


    }else{
      console.log("perfecto")
      this.registerForm = this.fb.group(
        {
        antpass: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required],
        confirmPassword: ["",Validators.required]
        },
        {
          validator: ConfirmPasswordValidator("password", "confirmPassword")
        }
      );

      this.cantidadsel = Number(1)

      localStorage.removeItem("list")
      this.ocultarprice = true;
      this.getProductos();
      this.comentarios()

    }
  }

  crearcomentario(){
    console.log(this.currentRate)
    let obj = {
      "IdProducto" : this.id,
      "IdUsuario" : localStorage.getItem("id"),
      "calificacion" : 3,
      "comentario" : this.antpass.value
    }
    // console.log(this.antpass.value);
    this.subscriptions.push(
      this.usuariosService
      .postScoreByID(obj)
      .subscribe((r: any) => {
        console.log(r)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tu comentario a sido guardado',
          showConfirmButton: false,
          timer: 2500

        })
        location.reload();

      })
    )


  }
  get antpass() {
    return this.registerForm.get('antpass');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmpassword() {
    return this.registerForm.get('confirmPassword');
  }

  comentarios(){
    this.subscriptions.push(
      this.usuariosService
      .getScoreByID(this.id)
      .subscribe((r: any) => {

        this.comentarioproduct = r
        if(this.comentarioproduct.length === 0){
          this.nocomentarios = true
          this.sicomentarios = false
          // console.log("no hay comentarios")

        }else{
          // console.log("si hay comentarios")
          this.nocomentarios = false
          this.sicomentarios = true
        }
      })
    )
  }

  Averagecomentarios(){
    this.subscriptions.push(
      this.usuariosService
      .getAverageByID(this.id)
      .subscribe((r: any) => {
        console.log(r)
        this.promedio_calificacion = r

      })
    )
  }

  onchangecant(e){
  this.cantidadsel = e.target.value  }
  incrementar() {
    let valor = document.getElementById("item") as HTMLInputElement;
    let cantida = parseInt(valor.value);
    if (cantida >= 1 && cantida < this.cantidadmax ) cantida++;
    valor.value = cantida.toString();
    this.cantidadsel = Number(valor.value)
    if(this.pormayor === true && this.cantidadsel >= 12){
      this.precioalpormayor = true
      this.ocultarprice = false

    }else{
      this.precioalpormayor = false
      this.ocultarprice = true


    }

  }
  //Funcion del boton - de cantidad
  decrementar() {
    let valor = (document.getElementById("item") as HTMLInputElement);
    let cantida = parseInt(valor.value);
    if (cantida > 1 ) cantida--;
    valor.value = cantida.toString();
    this.cantidadsel = Number(valor.value)
    if(this.pormayor === true && this.cantidadsel >= 12){
      this.precioalpormayor = true
      this.ocultarprice = false

    }else{
      this.precioalpormayor = false
      this.ocultarprice = true

    }
    }

  getProductos(){
     // console.log(id)
  //console.log(t his.id);
  this.subscriptions.push(
    this.ProductosService
    .getDataByID(this.id)
    .subscribe((r: any) => {
      this.recursos = r.Recursos
      this.nombrequick = r.nombre
      this.descripcionquick = r.descripcion
      this.Recursosquick = r.Recursos[0]["url"]
      this.cantidadquick = r.cantidad
      this.tagsquick = r.tags

      if(r.feria === true){
        this.tachadoquick = true;
        this.pricequick = r.valorFeria;
        this.banderaquick = true;
        this.banderaofferquick = true;
        this.namebanderaquick = "En Feria"
        this.pricetquick = r.valor

      }else if(r.oferta === true){
        this.pricequick = r.valorOferta
        this.banderaquick = true;
        this.banderaofferquick = false;
        this.namebanderaquick = "Oferta"
        this.tachadoquick = true;
        this.pricetquick = r.valor


      }else{
        this.pricequick = r.valor
        this.banderaquick = false;
        this.banderaofferquick = false;
        this.namebanderaquick = "productonormal";
        this.tachadoquick = false;
      }
      // console.log(this.product)

    }

    ));



  //console.log(t his.id);
  this.subscriptions.push(
    this.ProductosService
    .getDataByID(this.id)
    .subscribe((r: any) => {
      this.tags = r.tags.split(",")
      this.datos = r.descripcion.split("\n").join("<br />");
        // console.log(this.tags)
      if(r.caracteristicas === "[{\"item\":\"\",\"value\":\"\"}]"){
        this.caracteristicas.push({
          item : "El vendedor no incluyo caracteristicas en este producto",
          value : "-"
        })

      }else{
        this.caracteristicas = JSON.parse(r.caracteristicas)

      }
      this.recursos = r.Recursos
      this.cantidadmax = r.cantidad
      this.pormayor = r.porMayor
      this.Tienda = r.IdTienda
      // console.log(r.porMayor)
      if(r.porMayor){
        this.mostrarmayor = true
        this.pricepormayor = r.valorPorMayor
      }else{
        this.mostrarmayor = false
        this.pricepormayor = this.pricequick
      }
      // console.log("Datos",  this.datos)
      this.products.push({
         "id":r.id,
        "NombreProducto":r.nombre,
        "IdCategoria":r.IdCategoria,
        "price":this.pricequick,
        "cantidad":r.cantidad,
        "pricet":this.pricetquick,
        "Categoria":r.Categoria["nombre"],
        "idCategoria":r.Categoria["id"],
        "Recursos":r.Recursos[0]["url"],
        "IdTienda":r.IdTienda,
        "NombreTienda":r.NombreTienda,
        "tags":this.tags,
        "oferta":r.oferta,
        "feria":r.feria,
        "valorOferta":r.valorOferta,
        "valorFeria":r.valorFeria,
        "valorPorMayor":r.porMayor,
        "pormayor":r.valorPorMayor,
        
      })
      this.getImagen();
      this.productrelated(r.IdTienda)
       

    }

    ));
  }

 

  getImagen(){

    let i;
    for(i in this.recursos){
      this.getRecursos.push({
        "url": this.recursos[i].url})
    }
    // console.log(this.getRecursos)

}
productrelated(id){
  // console.log("iddetienda:", id)
  this.ProductosService
  .getDataByStoreID(id)
  .subscribe(resp =>{
    let i;
    for(i in resp){
      if(resp[i].feria === true){
        this.tachado = true;
        this.price = resp[i].valorFeria;
        this.bandera = true;
        this.banderaoffer= true;
        this.namebandera = "En Feria"
        this.pricet = resp[i].valor

      }else if(resp[i].oferta === true){
        this.price = resp[i].valorOferta
        this.bandera = true;
        this.banderaoffer= false;
        this.namebandera = "Oferta"
        this.tachado = true;
        this.pricet = resp[i].valor


      }else{
        this.price = resp[i].valor
        this.bandera = false;
        this.banderaoffer= false;
        this.namebandera = "productonormal";
        this.tachado = false;



      }
      // recursos
      if(resp[i].Recursos == 0){
        // console.log("entro")
        this.recursos = 'assets/img/front/nofoto.png';

      }else{
        this.recursos = resp[i].Recursos[0]["url"]

      }
      this.getproducts.push({

        "NombreProducto":resp[i].nombre,
        "Recursos": this.recursos,
        "Categoria": resp[i].Categoria.nombre,
        "NombreTienda":resp[i].NombreTienda,
        "bandera":this.bandera,
        "banderaoffer":this.banderaoffer,
        "namebandera":this.namebandera,
        "price":this.price,
        "pricet":this.pricet,
        "oferta":resp[i].oferta,
        "id":resp[i].id,
        "cantidad":resp[i].cantidad,
        "descripcion":resp[i].descripcion,
        "tags":resp[i].tags,

      })
      //  console.log(this.getproducts)
    }

  }
 );

}
refresh(id): void {
  window.location.href = '/Info/' + id
}
modal(id){
  // console.log(id)
  //console.log(t his.id);
  this.subscriptions.push(
    this.ProductosService
    .getDataByID(id)
    .subscribe((r: any) => {
      this.recursos = r.Recursos
      this.nombrequick = r.nombre
      this.descripcionquick = r.descripcion
      this.Recursosquick = r.Recursos[0]["url"]
      this.cantidadquick = r.cantidad
      this.tagsquick = r.tags
      this.idmodal = r.id

      if(r.feria === true){
        this.tachadoquick = true;
        this.pricequick = r.valorFeria;
        this.banderaquick = true;
        this.banderaofferquick = true;
        this.namebanderaquick = "En Feria"
        this.pricetquick = r.valor
        this.idmodal = r.id


      }else if(r.oferta === true){
        this.pricequick = r.valorOferta
        this.banderaquick = true;
        this.banderaofferquick = false;
        this.namebanderaquick = "Oferta"
        this.tachadoquick = true;
        this.pricetquick = r.valor
        this.idmodal = r.id



      }else{
        this.pricequick = r.valor
        this.banderaquick = false;
        this.banderaofferquick = false;
        this.namebanderaquick = "productonormal";
        this.tachadoquick = false;
        this.idmodal = r.id

      }
      // console.log(this.product)

    }


    ));


}
          buyNow(producto){

            /*=============================================
            Preguntamos si existe producto en localStorage
            =============================================*/

            if(localStorage.getItem("details")){

              producto = localStorage.getItem("producto");

            }

            /*=============================================
            Agregar producto al localStorage
            =============================================*/

            let item = {

              product: producto,
              unit: this.cantidadsel,
              url:'checkout'
            }

            localStorage.removeItem("producto");

            this.usuariosService.addShoppingCart(item);

          }

          addLista(producto, unit, idTienda){

           /*=============================================
            Preguntamos si existe producto en localStorage
            =============================================*/

            // if(localStorage.getItem("details")){

            //   producto = localStorage.getItem("producto");

            // }

            /*=============================================
            Agregar producto al localStorage
            =============================================*/

            let items = {

              product: producto,
              unit: this.cantidadsel,
              idTienda:this.Tienda,
              url:'lista'
            }
              // console.log("Lista de compras", items)

            // localStorage.removeItem("producto");

            this.usuariosService.addListShop(items);

          }





}
