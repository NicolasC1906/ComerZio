import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SalesService } from 'src/app/services/sales.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserModel } from '../../models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm,
          FormGroup,
          FormBuilder,
          FormControl,
          Validator,
          Validators } from '@angular/forms';

import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Identifiers } from '@angular/compiler';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


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
  shoppingCart: any[] = [];
  render: boolean = true;
  totalShoppingCart: number = 0;
  total: string = `<h5><strong class="totalHeader"><div class="spinner-border"></div></strong></h5>`;
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



  constructor(private router: Router,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private salesService: SalesService,
    private ProductosService: ProductosService,
    private ActivatedRoute: ActivatedRoute,) {
    this.user = new UserModel();
    this.buildForm();
  }

  ngOnInit(): void {
    let list = localStorage.getItem('list');
    list = JSON.parse(list);
    this.cantidadsel = list[0]['unit']

    this.mostraropciondeciudad = false
    this.getDeparta();
    this.ocultarprice = true;
    /*==========================================
      Validar si el existe usuario autenticado
    ==========================================*/
    if (localStorage.getItem("id")) {
      this.id = localStorage.getItem("id")
      this.getInfo();
    } else {
      localStorage.removeItem("expiresIn")
      localStorage.removeItem("id")
      localStorage.removeItem("token")
      window.location.href = '/login'

    }
    /*==========================================
      Traer lista del carrito de compras
    ==========================================*/

    if (localStorage.getItem('list')) {


      let list = localStorage.getItem('list');
      list = JSON.parse(list);
      //  console.log("Checkout", list);
      if (list.length == 0) {
        this.router.navigateByUrl("/checkout");
        return;
      }

      if(list[0]['product']['feria'] === true){
        this.tachado = true;
        this.price = list[0]['product']['valorFeria'];
        this.bandera = true;
        this.banderaoffer= true;
        this.namebandera = "En Feria"

      }else if(list[0]['product']['oferta'] === true){
        this.price = list[0]['product']['valorOferta']
        this.bandera = true;
        this.banderaoffer= false;
        this.namebandera = "Oferta"
        this.tachado = true;


      }else{
        this.price = list[0]['product']['price']
        this.bandera = false;
        this.banderaoffer= false;
        this.namebandera = "productonormal";
        this.tachado = false;



      }

      if(list[0]['product']['valorPorMayor']){
        this.pormayor = true
        this.mostrarmayor = true
        this.pricepormayor =list[0]['product']['pormayor']
        if(this.pormayor === true && this.cantidadsel >= 12){
          this.preciototal = list[0]['product']['pormayor']*this.cantidadsel
          this.precioalpormayor = true
          this.ocultarprice = false

        }else{
          this.precioalpormayor = false
          this.ocultarprice = true


        }

      }else{
        this.pormayor = false
        this.mostrarmayor = false


        this.pricepormayor = this.pricequick

      }

      /*=============================================
        Recorremos el arreglo del listado
        =============================================*/
        this.preciototal = list[0]['product']['price']*this.cantidadsel
        this.cantidadmax = list[0]['product']['cantidad']
        this.shoppingCart.push({
        NombreProducto:list[0]['product']['NombreProducto'],
        Recursos: list[0]['product']['Recursos'],
        Categoria: list[0]['product']['Categoria'],
        NombreTienda: list[0]['product']['NombreTienda'],
        price:  list[0]['product']['price'],
        pricet: list[0]['product']['pricet'],
        id: list[0]['product']['id'],
        cantidad: list[0]['product']['cantidad'],
        unit: list[0]['unit'],
        total:this.preciototal
      });

      // console.log('shoppingCart', this.shoppingCart)


    } else {
      this.router.navigateByUrl("/checkout");
      return;
    }
  }


  onchangecant(e){
    this.cantidadsel = e.target.value  }
    incrementar() {

      let valor = document.getElementById("item") as HTMLInputElement;
      let cantida = parseInt(valor.value);
      if (cantida >= 1 && cantida < this.cantidadmax ) cantida++;
      valor.value = cantida.toString();
      this.cantidadsel = Number(valor.value)
      let list = localStorage.getItem('list');
      list = JSON.parse(list);
      this.preciototal = this.price*this.cantidadsel
      // console.log(this.preciototal)


      if(this.pormayor === true && this.cantidadsel >= 12){
        this.preciototal = list[0]['product']['pormayor']*this.cantidadsel
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
      let list = localStorage.getItem('list');
      list = JSON.parse(list);
      this.preciototal = this.price*this.cantidadsel
      console.log(this.preciototal)
      if(this.pormayor === true && this.cantidadsel >= 12){
        this.preciototal = list[0]['product']['pormayor']*this.cantidadsel
        this.precioalpormayor = true
        this.ocultarprice = false


      }else{
        this.precioalpormayor = false
        this.ocultarprice = true


      }
      // console.log(this.cantidadsel)
      }



  getInfo() {
    // console.log(this.id);
    this.subscriptions.push(
      this.usuariosService
        .getDataByID(this.id)
        .subscribe((r: any) => {
          this.user.nombre = r.nombre;
          this.user.apellido = r.apellido;
          this.user.correo = r.correo;
          this.user.direccion = r.direccion;
          this.user.telefono = r.telefono;
          this.user.createdAt = r.createdAt
          this.direccionusuario = r.direccion;
          this.cedula = r.dni
          }));
  } onSubmit(f: NgForm) { };

  save(event: Event) {
    event.preventDefault();
    const value = this.form.value;
     console.log(value);
    // console.log(this.user)

    this.identificacion.push({
      'tipo': 'CC',
      'numero': this.cedula

    });
    this.telefono.push({
      'codigoArea': "",
      'numero': this.user.telefono
    })
    this.direccion.push({
      'direccion': value.add1,
      'codigoPostal': value.zip
    });

    this.comprador.push({
      'nombre': this.user.nombre,
      'apellido': this.user.apellido,
      'correo': this.user.correo,
      'fechaCreacion': this.user.createdAt,
      'telefono': this.telefono[0],
      'identificacion': this.identificacion[0],
      'direccion': this.direccion[0],

    });
    console.log("Comprador", this.comprador);

    let list = localStorage.getItem('list');
    list = JSON.parse(list);
     console.log(list[0]['product']['id']);
    if (list.length == 0) {
      this.router.navigateByUrl("/cart");
      return;
    }
    /*=============================================
      Recorremos el arreglo del listado
     =============================================*/


      this.productos.push({
        'id': list[0]['product']['id'],
        'cantidad': this.cantidadsel

      });
      // console.log(list['id']),



    this.preferencia.push({
      'idTienda': list[0]['product']['IdTienda'],
      'esMovil': true,
      'productos': this.productos,
      'comprador': this.comprador[0],
    });
    // console.log(this.preferencia[0])


    this.salesService
      .preference(this.preferencia[0])
      .subscribe((r: any) => {

        this.urlMP = r.init_point;
        // console.log(this.urlMP);
        let timerInterval

        Swal.fire({
          title: 'Procesando Compra',
          html: 'Redirigiendo a Mercado Pago',
          timer: 2000,
          timerProgressBar: true,
          willOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {

            }, 100)
          },
          onClose: () => {
            window.open(this.urlMP);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            // console.log(this.urlMP);
            // localStorage.removeItem('list');
          }
        })


      })//no borrar
  }

/*=============================================
        Formulario
  =============================================*/
  private buildForm() {
    this.form = this.formBuilder.group({
      add1: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      typeid: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.maxLength(200)]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      cupon: ['', [Validators.required]],
    });
  }

  getDeparta(){
    this.salesService
    .getListDeparments()
    .subscribe(resp =>{
      let i;
      for(i in resp){
        this.getDepartamentos.push({

          "NombreProducto":resp[i].nombre,
          "id":resp[i].id,
        })
      }
      this.getDepartamentos.sort((a, b) => a.NombreProducto.localeCompare(b.NombreProducto))
    }
   );
  }
  onchangedepa(e){
    this.mostraropciondeciudad = false
    this.depaselect = e.target.value
    // console.log(this.depaselect)
    this.getCity(this.depaselect)
    this.mostraropciondeciudad = true   }


  getCity(id){
    this.salesService
    .getListCities(id)
    .subscribe(resp =>{
      // console.log("Ciudades",resp)
      let i;
      for(i in resp){
        this.getCiudades.push({

          "NombreProducto":resp[i].nombre,
          "id":resp[i].id,
        })
      }
    }
   );
  }

}
