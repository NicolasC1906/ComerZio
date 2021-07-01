import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerService } from "ngx-spinner";
import { timer } from 'rxjs';


@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.scss']
})
export class TendenciasComponent implements OnInit {

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
  categorias: any = [];
  categoriassin: any = [];
  unicos: any = [];
  categoriaseleccionada: boolean;
  categoriaamostrar: any = [];
  todas: boolean;
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;
  ventas: any;

  constructor(
    private ProductosService: ProductosService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.todas = true
    this.Destacados();
    this.Vendidos();
    this.tachado = false;

  }


  Destacados(){
    localStorage.removeItem('list');
    this.ProductosService
    .getDestacados()
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

        this.categorias.push(
          resp[i].Categoria.nombre
        )

        this.unicos = this.categorias.filter((valor, indice) => {
          return this.categorias.indexOf(valor) === indice;
        }
        );

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


  Vendidos(){
    localStorage.removeItem('list');
    this.ProductosService
    .getBestSellers()
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

        this.categorias.push(
          resp[i].Categoria.nombre
        )

        this.unicos = this.categorias.filter((valor, indice) => {
          return this.categorias.indexOf(valor) === indice;
        }
        );

        this.ventas.push({

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
        this.ventas.sort(() => Math.random() - 0.5)
        // console.log(this.getproducts)

      }


    }

   );
  }


  mostrartodo(){
    this.categoriaseleccionada = false
    this.todas = true

  }
  refresh(id): void {
    window.location.href = '/Info/' + id
  }
  reemplazarDuplicados(value, index, self) {
    return (self.indexOf(value) === index)?value:'';
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
          this.categoriaamostrar.sort((a, b) => b.price - (a.price))

        }
        priceMenor(){
          this.getproducts.sort((a, b) => a.price - (b.price))
          this.categoriaamostrar.sort((a, b) => a.price - (b.price))

        }
        priceA(){
          this.getproducts.sort((a, b) => a.NombreProducto.localeCompare(b.NombreProducto))
          this.categoriaamostrar.sort((a, b) => a.NombreProducto.localeCompare(b.NombreProducto))

        }
        priceZ(){
          this.getproducts.sort((a, b) => b.NombreProducto.localeCompare(a.NombreProducto))
          this.categoriaamostrar.sort((a, b) => b.NombreProducto.localeCompare(a.NombreProducto))

        }
        priceRandom(){
          this.getproducts.sort(() => Math.random() - 0.5)
          this.categoriaamostrar.sort(() => Math.random() - 0.5)

        }


        // DE MENOR A MAYOR PRECIO this.getproducts.sort((a, b) => a.price - (b.price))
        // DE MAYOR A MENOS PRECIO this.getproducts.sort((a, b) => b.price - (a.price))
        // PRODUCTOS DE LA A ALA Z this.getproducts.sort((a, b) => a.NombreProducto.localeCompare(b.NombreProducto))
        // PRODUCTOS DE LA Z A LA A this.getproducts.sort((a, b) => b.NombreProducto.localeCompare(a.NombreProducto))
        // MENOR A MAYOR CANTIDAD this.getproducts.sort((a, b) => a.cantidad - b.cantidad )
        // RANDOM this.getproducts.sort(() => Math.random() - 0.5)


}
