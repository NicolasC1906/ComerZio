import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SalesService } from 'src/app/services/sales.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserModel } from '../../../models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm,
          FormGroup,
          FormBuilder,
          FormControl,
          Validator,
          Validators } from '@angular/forms';

import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { Identifiers } from '@angular/compiler';


@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.scss']
})
export class ListaComprasComponent implements OnInit {
  shoppingCart:any = [];
  totalShoppingCart:number = 0;
  idTienda: any;
  carrito:any = [];
  user: UserModel;
  id: string = null;
  users: any = [];
  subscriptions: Subscription[] = [];
  countries: any = null;
  recursos:any = [];
products:any = [];
getproducts:any = [];
getRecursos:Array<any> = [];
banderaoffer:boolean;
  dialCode: string = null;
  render: boolean = true;
  // dtOptions: DataTables.Settings = {};
  renderShopping: boolean = true;
  form: FormGroup;
  productos: any = [];
  telefono: any = [];
  comprador: any = [];
  identificacion: any = [];
  direccion: any = [];
  preferencia: any = [];
  preferencias: any;
  urlMP: any;
  preciototal: number;
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
  quantity:number = 1;
  cantidadsel: number;
  cantidadmax: any;
  pormayor: any;
  pricepormayor: any;
  precioalpormayor: boolean;
  mostrarmayor: boolean;
  ocultarprice: boolean;
  direccionusuario: any;
  getDepartamentos: any = [];
  getCiudades: any = [];
  depaselect: any;
  mostraropciondeciudad: boolean;
  cedula: any;
  ocultar: boolean;

  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private salesService: SalesService,
    private ProductosService: ProductosService,
    private ActivatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void{
      /*=============================================
      Tomamos la data de la lista de compras del LocalStorage
    	=============================================*/
      let idTienda = localStorage.getItem("Tienda").split(",");
      let sinRpetidos = idTienda.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual)
      let load = 0;
      for (const i in sinRpetidos){
        let Json = JSON.parse(localStorage.getItem('items'+sinRpetidos[i]))

        this.shoppingCart.push(
          Json
        )
        console.log(this.shoppingCart)

      }
         // this.shoppingCart.forEach(element =>



           // );




      if(localStorage.getItem('items'+idTienda)){

        let list = JSON.parse(localStorage.getItem('items'+idTienda));
        this.totalShoppingCart = list.length;

        // console.log("CartComponent -> ngOnInit -> list", list)

        /*=============================================
        Recorremos el arreglo del listado
        =============================================*/
        let load = 0;
        for (const i in list){
          this.idTienda = list[i].product['IdTienda'];
          load++;
              this.shoppingCart.push({
              NombreProducto:list[i].product['NombreProducto'], //vista Nombre Producto
              Recursos:list[i].product['Recursos'],
              Categoria:list[i].product['Categoria'],
              NombreTienda:list[i].product['NombreTienda'],
              price:list[i].product['price'], // Vista Precio
              oferta:list[i].product['oferta'],
              id:list[i].product['id'],
              cantidad:list[i].product['cantidad'],
              unit:list[i].unit, // Vista cantidad
            });

            console.log('shoppingCart', this.shoppingCart)
        }
      }
  }


}
