import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Path } from '../../../config';
import { CategoriasService } from '../../../services/categorias.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerService } from "ngx-spinner";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  subscriptions:Subscription[]=[];
  categorias:any = [];
  categoriasname:any = [];
  recursosar:any = [];
  url:any;
  product:any = [];
  getcategorias:any = [];
  categories = new Array(20).fill(0);
  imagen: any;
  cp: number = 1;


  constructor(private CategoriasService: CategoriasService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cookie: CookieService) { }

    ngOnInit(): void {
      this.getInfo();

    }

    getInfo(){
        //console.log(this.id);
      this.subscriptions.push(
      this.CategoriasService
      .getData()
      .subscribe((r: any) => {
        let i
        for(i in r){
          if(r[i].imagen === null){
            this.imagen = "assets/images/icon-img.png"

          }else{
            this.imagen = r[i].imagen


          }
        this.getcategorias.push({
          "id":r[i].id,
          "nombre":r[i].nombre,
          "imagen": this.imagen,
        })
        // console.log(this.getcategorias);
      }
    }
      ));
    }

    getCategoria(item){
      localStorage.removeItem('categoria');
      localStorage.setItem('categoria', JSON.stringify(item));
      var c = localStorage.getItem('categoria');
      this.cookie.set("reload", '1');
      this.router.navigate(['/categoriasP', item.id])
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
