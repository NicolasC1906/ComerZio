import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { Path } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../../../assets/css/style.css']
})
export class MenuComponent implements OnInit {
  path:String = Path.url;
	categories:Object = null;
	arrayTitleList:Array<any> = [];
	render:Boolean = true;
  idUser:any;
  Loguio:boolean;
  inicio:boolean;
  iniciar:boolean;
  perfil:boolean;
  users:any = [];
  subscriptions:Subscription[]=[];
  id:any;
  nombre: any;
  apellido: any;
  roles: any;
  getFeriasActivas:any = [];
  showFeria: boolean;
  constructor(
    private usuariosService: UsuariosService,
    private ActivatedRoute: ActivatedRoute,
    private ProductosService: ProductosService) { }

    ngOnInit(): void {
      this.getFerias();

      if(localStorage.getItem('token')){
        this.iniciar = false;
        this.perfil = true;
        this.getInfo()

      }else{
        this.iniciar = true;
        this.perfil = false;
      }

      this.idUser = localStorage.getItem('id');

  }

  getInfo(){
    // console.log("entro o no")
    this.id = localStorage.getItem("id")
    this.subscriptions.push(
        this.usuariosService
        .getDataByID(this.id)
        .subscribe((r: any) => {
          this.roles = r.Rol["nombre"]
          this.nombre = r.nombre
          this.apellido = r.apellido

          // console.log(this.rol)
          this.users.push({
            "id":r.id,
            "nombre":r.nombre,
            "apellido":r.apellido,
            "correo":r.correo,
            "dni":r.dni,
            "telefono":r.telefono,
            "direccion":r.direccion,
            "rol":r.Rol["nombre"],
          })
        }

        ));
      }

      getFerias(){
        this.ProductosService
        .getDataFeria()
        .subscribe((resp : any) =>{
             if(resp === 'No existen ferias activas' ){
               this.showFeria = false

             }else{
               this.showFeria = true
             }

             console.log(resp);
          }



       );


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
        localStorage.removeItem('id');

        window.location.href = '/'
      }
    });
    ;
  }

}
