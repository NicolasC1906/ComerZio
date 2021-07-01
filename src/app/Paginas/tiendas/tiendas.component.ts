import { Component, OnInit } from '@angular/core';

import { StoriesService } from '../../stories.service';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerService } from "ngx-spinner";
import { TiendasService } from '../../services/tiendas.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss']
})
export class TiendasComponent implements OnInit {

  subscriptions:Subscription[]=[];
  products:any = [];
  productname:any = [];
  recursosar:any = [];
  url:any;
  product:any;
  getproducts:any = [];
  price:any;
  recursos:any;
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
  idmodal: any;
  cp: number = 1;
  filterProductos ='';
  filterTiendas ='';

  categorias:any = [];
  categoriasname:any = [];
  getcategorias:any = [];
  categories = new Array(20).fill(0);
  imagen: any;

  getTiendas:any = [];
  currentRate = 8;

  nombreTienda:any;
  idTienda:any;
  getTiendasByID:any = [];
  idmodalTienda: any;
  id: any;
  getproductsStore:any = [];

  constructor(
    private ProductosService: ProductosService,
    private CategoriasService: CategoriasService,
    private cookie: CookieService,
    private spinner: NgxSpinnerService,
    private Stories:StoriesService,
    private tiendasService: TiendasService,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {

    this.getUrl();
    this.getLocales();
    this.tachado = false;


    }

    getCategoria(item){
      localStorage.removeItem('categoria');
      localStorage.setItem('categoria', JSON.stringify(item));
      var c = localStorage.getItem('categoria');
      this.cookie.set("reload", '1');
    }


  getUrl(){
    localStorage.removeItem('list');
    this.ProductosService
    .getData()
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
          this.recursos = "assets/images/icon-img.png";

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

        // DE MENOR A MAYOR PRECIO this.getproducts.sort((a, b) => a.price - (b.price))
        // DE MAYOR A MENOS PRECIO this.getproducts.sort((a, b) => b.price - (a.price))
        // PRODUCTOS DE LA A ALA Z this.getproducts.sort((a, b) => a.NombreProducto.localeCompare(b.NombreProducto))
        // PRODUCTOS DE LA Z A LA A this.getproducts.sort((a, b) => b.NombreProducto.localeCompare(a.NombreProducto))
        // MENOR A MAYOR CANTIDAD this.getproducts.sort((a, b) => a.cantidad - b.cantidad )
        this.getproducts.sort(() => Math.random() - 0.5)
        // console.log(this.getproducts)

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

  onPageChange(event):void{
    this.spinner.show();
    this.cp = event;

    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 1000);

  }

        priceMayor(){
          this.getproducts.sort((a, b) => b.price - (a.price))
        }
        priceMenor(){
          this.getproducts.sort((a, b) => a.price - (b.price))
        }
        priceA(){
          this.getproducts.sort((a, b) => a.NombreProducto.localeCompare(b.NombreProducto))
        }
        priceZ(){
          this.getproducts.sort((a, b) => b.NombreProducto.localeCompare(a.NombreProducto))
        }
        priceRandom(){
          this.getproducts.sort(() => Math.random() - 0.5)
        }


        // DE MENOR A MAYOR PRECIO this.getproducts.sort((a, b) => a.price - (b.price))
        // DE MAYOR A MENOS PRECIO this.getproducts.sort((a, b) => b.price - (a.price))
        // PRODUCTOS DE LA A ALA Z this.getproducts.sort((a, b) => a.NombreProducto.localeCompare(b.NombreProducto))
        // PRODUCTOS DE LA Z A LA A this.getproducts.sort((a, b) => b.NombreProducto.localeCompare(a.NombreProducto))
        // MENOR A MAYOR CANTIDAD this.getproducts.sort((a, b) => a.cantidad - b.cantidad )
        // RANDOM this.getproducts.sort(() => Math.random() - 0.5)




        getLocales(){
          this.tiendasService
          .getData() 
          .subscribe(resp =>{
            let i;
            for(i in resp){
              this.getTiendas.push({

                "NombreProducto":resp[i].nombre,
                "direccion": resp[i].direccion,
                "descripcion":resp[i].descripcion,
                "calificacion":3,
                "tipoTienda":resp[i].tipoTienda,
                "id":resp[i].id,
                "numeroProductos":resp[i].numeroProductos,
              })
              // console.log(this.getTiendas);

            }

          }
         );


        }


        modalStore(id){
          this.cookie.set("reloadStore", '1');

          this.getproductsStore.splice(0, this.getproductsStore.length);
          this.subscriptions.push(
            this.tiendasService
            .getDataByStoreID(id)
            .subscribe((r: any) => {
              console.log(r)
              let i;
              for(i in r){
                if(r[i].feria === true){
                  this.tachado = true;
                  this.price = r[i].valorFeria;
                  this.bandera = true;
                  this.banderaoffer= true;
                  this.namebandera = "En Feria"
                  this.pricet = r[i].valor

                }else if(r[i].oferta === true){
                  this.price = r[i].valorOferta
                  this.bandera = true;
                  this.banderaoffer= false;
                  this.namebandera = "Oferta"
                  this.tachado = true;
                  this.pricet = r[i].valor


                }else{
                  this.price = r[i].valor
                  this.bandera = false;
                  this.banderaoffer= false;
                  this.namebandera = "productonormal";
                  this.tachado = false;



                }
                // recursos
                if(r[i].Recursos == 0){
                  // console.log("entro")
                  this.recursos = "assets/images/icon-img.png";

                }else{
                  this.recursos = r[i].Recursos[0]["url"]

                }
                this.getproductsStore.push({

                  "NombreProducto":r[i].nombre,
                  "Recursos": this.recursos,
                  "Categoria": r[i].Categoria.nombre,
                  "NombreTienda":r[i].NombreTienda,
                  "bandera":this.bandera,
                  "banderaoffer":this.banderaoffer,
                  "namebandera":this.namebandera,
                  "price":this.price,
                  "pricet":this.pricet,
                  "oferta":r[i].oferta,
                  "id":r[i].id,
                  "cantidad":r[i].cantidad,
                  "descripcion":r[i].descripcion,
                  "tags":r[i].tags,

                })
                this.nombreTienda = r[i].NombreTienda,

                // DE MENOR A MAYOR PRECIO this.getproducts.sort((a, b) => a.price - (b.price))
                // DE MAYOR A MENOS PRECIO this.getproducts.sort((a, b) => b.price - (a.price))
                // PRODUCTOS DE LA A ALA Z this.getproducts.sort((a, b) => a.NombreProducto.localeCompare(b.NombreProducto))
                // PRODUCTOS DE LA Z A LA A this.getproducts.sort((a, b) => b.NombreProducto.localeCompare(a.NombreProducto))
                // MENOR A MAYOR CANTIDAD this.getproducts.sort((a, b) => a.cantidad - b.cantidad )
                this.getproductsStore.sort(() => Math.random() - 0.5)
                // console.log(this.getproducts)

              }



            }


            ));


        }

        paginado(event):void{
          this.spinner.show();
          this.cp = event;

          setTimeout(() => {
            /** spinner ends after 1 seconds */
            this.spinner.hide();
          }, 1000);

        }



}
