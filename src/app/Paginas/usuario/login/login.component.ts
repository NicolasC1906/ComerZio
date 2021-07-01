import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { Sweetalert } from '../../../funciones.js';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token: any;
  expires: any;
  idUser: any;
  subscriptions: Subscription[] = [];
  registeredStore: any = [];
  productsArr: any;
  idStore: any;
  idStore2: any;
  notification: boolean;
  idusuarioempleado: any;

  user: SocialUser;
  loggedIn: boolean;
  isSignedin: boolean;



  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private fb: FormBuilder,
    private authService: SocialAuthService,
    private socialAuthService: SocialAuthService ) {

  }

  ngOnInit(): void {

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = (user != null);
      console.log("User Social",this.user);
    });

   }

   googleSignin(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }


  public loginUser = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    let objLogin = {
      correo: this.email.value,
      contrasena: this.password.value,
      proveedor: 1
    };

    this.subscriptions.push(
      this.usuariosService
      .loginAuth(objLogin)
      .subscribe((r: any) => {
        console.log(r)

        this.idUser = r.usuario["id"];
        localStorage.setItem("id",r.usuario["id"])
        localStorage.setItem("token", r.token);
        localStorage.setItem("expiresIn", r.expiresIn);
        this.token = r.token;
        this.expires = r.expiresIn;
        // console.log("Esto es R",r);

        /*==============================================
                  Dirigir a cuenta
        /*==============================================*/
        window.location.href = '/';



      },(err) => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Datos Incorrectos Email o Contraseña Incorrectos",
          showConfirmButton: false,
          timer: 1500
      });

      })
    )



  }
  get email() {
    return this.loginUser.get('email');
  }

  get password() {
    return this.loginUser.get('password');
  }


  onGoogleLogin(){

  }




  }


