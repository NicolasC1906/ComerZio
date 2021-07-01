import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { Sweetalert } from '../../../funciones.js'
import { from } from 'rxjs';
import _ from 'lodash';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {


  user: UserModel;

  constructor( private usuariosService: UsuariosService) {

      this.user = new UserModel();

   }

  ngOnInit(): void {
          // Disable form submissions if there are invalid fields
      (function() {
        'use strict';
        window.addEventListener('load', function() {
          // Get the forms we want to add validation styles to
          var forms = document.getElementsByClassName('needs-validation');
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
      })();

  }
  onSubmit(f: NgForm ){
    if(f.invalid){
      return;
    }

    this.user.IdRol =  3;
    this.user.proveedor =  '1';
    this.usuariosService.registerAuth(this.user)
    .subscribe(resp=>{
      console.log("resp", resp);
      Swal.fire({
        icon: 'success',
          title: 'Usuario Registrado',
          text: 'Usuario Registrado Correctamente',
    }

    )
    })




  }


}

