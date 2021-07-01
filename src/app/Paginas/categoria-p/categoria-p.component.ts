import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Subject, Subscription } from 'rxjs';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-categoria-p',
  templateUrl: './categoria-p.component.html',
  styleUrls: ['./categoria-p.component.scss']
})
export class CategoriaPComponent implements OnInit {
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
  id: string;
  filterProductos ='';

  constructor(private ProductosService: ProductosService,
              private spinner: NgxSpinnerService,
              private ActivatedRoute: ActivatedRoute,
              private cookie: CookieService
              ) {
                this.id= this.ActivatedRoute.snapshot.paramMap.get('id')

              }

  ngOnInit(): void {
    this.reinicio()

  }
  reinicio(){
    if(this.cookie.get("reload")){
      this.cookie.delete("reload")
      window.location.reload()


    }else{
      console.log("perfecto")
      this.getUrl();

    }
  }
  getProducts() {
    this.subscriptions.push(
      this.ProductosService.getData().subscribe((r) =>{
      this.products=r;
      // console.log(r);
        })
      );
  }

   /// Traer Productos
   getUrl(){
    localStorage.removeItem('list');
    this.ProductosService
    .getData()
    .subscribe(resp =>{
      let i;
      for(i in resp){
        if(resp[i].feria === true){
          this.price = resp[i].valorFeria;
          this.bandera = true;
          this.banderaoffer= true;
          this.namebandera = "En Feria"

        }else if(resp[i].oferta === true){
          this.price = resp[i].valorOferta
          this.bandera = true;
          this.banderaoffer= false;
          this.namebandera = "Oferta"

        }else{
          this.price = resp[i].valor
          this.bandera = false;
          this.banderaoffer= false;
          this.namebandera = "productonormal";


        }
        // recursos
        if(resp[i].Recursos == 0){
          // console.log("entro")
          this.recursos = 'assets/img/front/nofoto.png';

        }else{
          this.recursos = resp[i].Recursos[0]["url"]

        }
        var c =  JSON.parse(localStorage.getItem('categoria'));
        // console.log(c['nombre']);

        if (c['nombre'] == resp[i].Categoria.nombre ) {
          this.getproducts.push({

            "NombreProducto":resp[i].nombre,
            "Recursos": this.recursos,
            "Categoria": resp[i].Categoria.nombre,
            "NombreTienda":resp[i].NombreTienda,
            "bandera":this.bandera,
            "banderaoffer":this.banderaoffer,
            "namebandera":this.namebandera,
            "price":this.price,
            "oferta":resp[i].oferta,
            "id":resp[i].id,
          })
          // console.log(this.getproducts)

        }

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


}
