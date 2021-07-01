import { Component, OnInit } from '@angular/core';
import {Chart} from 'node_modules/chart.js'
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { ConfirmPasswordValidator } from '../../../app.validator';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  currentRate = 0;

  registerForm: FormGroup;
  submitted: boolean = false;

  passwordForm: FormGroup;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  fieldTextTypeAnt: boolean;

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
  pedidos:any = [];
  ordenes:any = [];
  fecha:any = [];
  alerta : boolean;
  tabla: boolean;
  badgepedido: boolean;
  correo: any;
  telefono: any;
  direccion: any;
  createdAt: any;
  direccionusuario: any;
  cedula: any;
  userperfil: FormGroup;
  rolid: any;
  nameperfil: any;
  surnameperfil:any;
  emailperfil:any;
  idperfil:any;
  tellperfil:any;
  addressperfil:any;
  quejas: FormGroup;
  showcomentario: boolean;

  constructor(private usuariosService: UsuariosService,
    private ActivatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private cookie: CookieService) { }

  ngOnInit() {

    this.userperfil = this.fb.group({
      nombreperfil: ["", [Validators.required, Validators.email]],
      apellidoperfil: ["", Validators.required],
      correoperfil: ["",Validators.required],
      dniperfil: ["", Validators.required],
      direccionperfil: ["", Validators.required],
      telefonoperfil: ["", Validators.required],
    })

    this.quejas = this.fb.group({
      reclamo: ["", [Validators.required, Validators.email]],
    })
    this.passwordMach();
    // this.initRegForm();

    this.getOrdesInfo();
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
  enviarqueja(){
    let obj = {
      IdUsuario: this.id,
      nombreUsuario: this.nombre,
      mensaje: this.reclamo.value
    }
    this.subscriptions.push(
      this.usuariosService
      .postSoporteByID(obj)
      .subscribe((r:any)=>{
        console.log(r)
        if(r === 'correo enviado'){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Correo correctamente',
            showConfirmButton: false,
            timer: 1500
          })

        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Correo No enviado',
            showConfirmButton: false,
            timer: 1500
          })

      }})
    )
  }
  actualizarperfil(){

    if(this.nombreperfil.value.length === 0){
        this.nameperfil = this.nombre
    }else{
      this.nameperfil = this.nombreperfil.value
    }

    if(this.apellidoperfil.value.length === 0){
      this.surnameperfil = this.apellido
    }else{
    this.surnameperfil = this.apellidoperfil.value
    }

    if(this.correoperfil.value.length === 0){
      this.emailperfil = this.correo
    }else{
    this.emailperfil = this.correoperfil.value
    }


    if(this.identificacionperfil.value.length === 0){
      this.idperfil = this.cedula
    }else{
    this.idperfil = JSON.stringify(this.identificacionperfil.value)
    }


    if(this.telefonoperfil.value.length === 0){
      this.tellperfil = this.telefono
    }else{
    this.tellperfil = this.telefonoperfil.value
    }


    if(this.direccionperfil.value.length === 0){
      this.addressperfil = this.direccion
    }else{
    this.addressperfil = this.direccionperfil.value
    }

    if(this.addressperfil === null){
      this.addressperfil = ''
    }



    let obj = {
      id: this.idUser,
      nombre: this.nameperfil,
      apellido: this.surnameperfil,
      correo: this.emailperfil,
      dni: this.idperfil,
      telefono: this.tellperfil,
      direccion: this.addressperfil,
      IdRol: this.rolid

    }
    console.log(obj)

    this.subscriptions.push(
      this.usuariosService
      .putUserByID(obj)
      .subscribe((r:any) =>{
        console.log(r)
        if(r.code === 200){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Datos actualizados correctamente',
            showConfirmButton: false,
            timer: 1500
          })

        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Datos NO actualizados correctamente',
            showConfirmButton: false,
            timer: 1500
          })

        }
      })
    )
  }

  actualizarcontrasena(){
    console.log('submit')
  }

  passwordMach(){
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
  }
  onSubmit() {
    this.submitted = true;
    this.cambiarcontrasena()
  }

  cambiarcontrasena(){
    let obj = {
      correo : this.correo,
      antigua : this.antpass.value,
      nueva : this.password.value,
      confirmacion : this.confirmpassword.value
    }
    console.log(obj)

    if(this.password.value === this.confirmpassword.value){

      this.subscriptions.push(
        this.usuariosService
        .putcontrasena(obj)
        .subscribe((r : any) => {
          console.log(r)
          if(r.message === "Constraseña antigua incorrecta"){
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'Contraseña antigua incorrecta',
              showConfirmButton: false,
              timer: 1500
            })
          }else if(r.message === "Contraseña cambiada "){

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Contraseña actualizada correctamente',
              showConfirmButton: false,
              timer: 1500
            })

          }
        })
      )
    }else{
      // console.log("no son iguales")
    }

  }


  // initRegForm() {
  //   this.passwordForm = this.fb.group({
  //     antpass: ["", [Validators.required, Validators.email]],
  //     password: ["", Validators.required],
  //     confirmpassword: ["", Validators.required]
  //   });
  // }

  toggleFieldTextTypeAnt() {
    this.fieldTextTypeAnt = !this.fieldTextTypeAnt;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  getInfo(){
    // console.log("entro o no")
    this.id = localStorage.getItem("id")
    this.subscriptions.push(
        this.usuariosService
        .getDataByID(this.id)
        .subscribe((r: any) => {
          this.nombre = r.nombre
          this.apellido = r.apellido
          this.correo = r.correo;
          this.direccion = r.direccion;
          this.telefono = r.telefono;
          this.createdAt = r.createdAt
          this.direccionusuario = r.direccion;
          this.cedula = r.dni
          this.roles = r.Rol["nombre"]
          this.rolid = r.Rol["id"]
          //  console.log(r)
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

      getOrdesInfo(){
        //console.log(this.id)
        this.id = localStorage.getItem("id")
        //console.log(this.id);
        this.subscriptions.push(
        this.usuariosService
        .getOrdesByID(this.id)
        .subscribe((r: any) => {
        if (r.length === 0){
          this.alerta = true;
          this.tabla = false;
          // console.log("no tiene pedidos")
        }else{
          this.alerta = false;
          this.tabla = true;
          for(const i in r){
            if(r[i].estadoEnvio === null){
              this.fecha = "Procesando"
              this.badgepedido = false

            }else{
              this.badgepedido = true
              this.fecha = r[i].estadoEnvio
            }
            if(r[i].estadoEnvio === "Enviado"){
              this.showcomentario = true

            }else{
              this.showcomentario = false
            }
            this.pedidos.push({
              "idorder":r[i].id,
              "ValorTotal":r[i].valorTotal,
              "estadoEnvio":this.fecha,
              "fecha": r[i].createdAt,
              "badgePedido" : this.badgepedido,
              "IdProducto": r[i].Detalle[0]['IdProducto'],
              "showcomentario": this.showcomentario,
            })

            console.log(this.pedidos)
          }

        }


        }



        ));
      }


      crearcomentario(id){
        console.log(this.currentRate)
        let obj = {
          "IdProducto" : id,
          "IdUsuario" : localStorage.getItem("id"),
          "calificacion" : this.currentRate,
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

      viewpedido(id){
        this.subscriptions.push(
          this.usuariosService
          .getPedidoByID(id)
          .subscribe((r: any) => {


            let pedido
            if(r.estadoEnvio === null && r.estado === 'approved'){

              // this.pedidos.push({
              //   "fechaCreado":r.createdAt,
              //   "estado":r.estado,
              //   "valorTotal":r.valorTotal,
              //   "idPago":r.idPago,
              //   "fechapago": r.DetallesPago[0].fecha_aprobado,
              //   // "nombreTienda": r.Tienda[0].nombre,
              //   "transportadora": r.EstadosEnvio[2].transportadora,
              //   "fechaEnviado": r.EstadosEnvio[2].createdAt,
              //   "numeroGuia": r.EstadosEnvio[2].numeroGuia,
              //   "fotoGuia": r.EstadosEnvio[2].fotoGuia,
              //   "comentarios": r.EstadosEnvio[2].comentarios,
              //   "idMp": r.DetallesPago[0].idMp,
              //   "monto_total_pagado": r.DetallesPago[0].monto_total_pagado,
              //   "detalle_estado": r.DetallesPago[0].detalle_estado,

              // })
              pedido = "Procesando"
              Swal.fire({
                title:"Pedido #" + id,
                width: '1000px',
                html: `
                <div class="containerTimeLine">
                  <div class="timeline">
                    <ul>
                    <li>
                    <div class="timeline-content">
                      <h3 class="date">${r.DetallesPago[0].fecha_aprobado}</h3>
                      <h1>Procesado</h1>
                      <dl>
                          <dt>Información General</dt>
                              <dd>Estado: ${r.estado}</dd>
                              <dd>Total: ${r.valorTotal}</dd>
                              <dd>Referencia de Pago: ${r.idPago}</dd>
                          <dt>Información Pago</dt>
                              <dd>Referencia Mercado Pago: ${r.DetallesPago[0].idMp}</dd>
                              <dd>Monto: ${r.DetallesPago[0].monto_total_pagado}</dd>
                              <dd>Estado: ${r.DetallesPago[0].detalle_estado}</dd>
                      </dl>
                    </div>
                  </li>
                    </ul>
                  </div>
                </div>
                `,
            });
            }else if(r.estadoEnvio === 'Enviado'){
              this.ordenes.push({
                "fechaCreado":r.createdAt,
                "estado":r.estado,
                "valorTotal":r.valorTotal,
                "idPago":r.idPago,
                "fechapago": r.DetallesPago[0].fecha_aprobado,
                // "nombreTienda": r.Tienda[0].nombre,
                "transportadora": r.EstadosEnvio[1].transportadora,
                "fechaEnviado": r.EstadosEnvio[1].createdAt,
                "numeroGuia": r.EstadosEnvio[1].numeroGuia,
                "fotoGuia": r.EstadosEnvio[1].fotoGuia,
                "comentarios": r.EstadosEnvio[1].comentarios,
                "idMp": r.DetallesPago[0].idMp,
                "monto_total_pagado": r.DetallesPago[0].monto_total_pagado,
                "detalle_estado": r.DetallesPago[0].detalle_estado,
                "badgepedido" : this.badgepedido


              })
              pedido = "Enviado"
              Swal.fire({
                title:"Pedido #" + id,
                width: '1000px',
                html: `
                <div class="containerTimeLine">
                  <div class="timeline">
                    <ul>
                      <li>
                        <div class="timeline-content">
                          <h3 class="date">${r.EstadosEnvio[1].createdAt} </h3>
                          <h1>${pedido}</h1>
                          <dl>
                              <dt>Información Envio</dt>
                                  <dd>transportadora: ${r.EstadosEnvio[1].transportadora}</dd>
                                  <dd>Numero de Guia: ${r.EstadosEnvio[1].numeroGuia}</dd>
                                  <dd>Comentarios: ${r.EstadosEnvio[1].comentarios}</dd>
                          </dl>
                        </div>
                        <div>
                        <a type="button" class="nohovera btn btn-danger" href="${r.EstadosEnvio[1].fotoGuia}" value="Guia" target="_blank" class="button">Ver Guia</a>
                      </div>

                      </li>
                      <li>
                        <div class="timeline-content">
                          <h3 class="date">${r.DetallesPago[0].fecha_aprobado}</h3>
                          <h1>Procesado</h1>
                          <dl>
                              <dt>Información General</dt>
                                  <dd>Estado: ${r.estado}</dd>
                                  <dd>Total: ${r.valorTotal}</dd>
                                  <dd>Referencia de Pago: ${r.idPago}</dd>
                              <dt>Información Pago</dt>
                                  <dd>Referencia Mercado Pago: ${r.DetallesPago[0].idMp}</dd>
                                  <dd>Monto: ${r.DetallesPago[0].monto_total_pagado}</dd>
                                  <dd>Estado: ${r.DetallesPago[0].detalle_estado}</dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                `,
            });

            }else if(r.estadoEnvio === 'Recibido'){
              pedido = "Finalizado"
              this.pedidos.push({
                "estado":r.estado,
                "valorTotal":r.valorTotal,
                "uuid":r.uuid,
                "idPago":r.idPago,

              })

            }else if(r.estado === "pending"){
              Swal.fire({
                title:"Pedido #" + id + " Cancelado",
                text: "Pedido cancelado sin datos de pago confirmado",
                icon: 'warning',
              });

            }
            console.log("Esto es R",r);



            console.log(this.pedidos);
          }

          ));


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

  get antpass() {
    return this.registerForm.get('antpass');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmpassword() {
    return this.registerForm.get('confirmPassword');
  }

  get nombreperfil() {
    return this.userperfil.get('nombreperfil');
  }
  get apellidoperfil() {
    return this.userperfil.get('apellidoperfil');
  }
  get correoperfil() {
    return this.userperfil.get('correoperfil');
  }

  get identificacionperfil() {
    return this.userperfil.get('dniperfil');
  }
  get telefonoperfil() {
    return this.userperfil.get('telefonoperfil');
  }
  get direccionperfil() {
    return this.userperfil.get('direccionperfil');
  }
  get reclamo() {
    return this.quejas.get('reclamo');
  }

}
