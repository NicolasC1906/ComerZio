import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../../../stories.service';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';
import { Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerService } from "ngx-spinner";
import { timer } from 'rxjs';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.scss']
})
export class FeriasComponent implements OnInit {

  defaults: any;
  video: any;
  thisTimeline: any;
  start = 0;
  storyTime: any;
  storySpinner: any;
  options: any;
  arguments : any;
  getFeriasActivas:any = [];
  getFairTiendas:any = [];

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
  storiestiendas: any;
  idFeria: any;

  constructor(
    private ProductosService: ProductosService,
    private spinner: NgxSpinnerService,
    private Stories:StoriesService) {
    Stories.carga(["/instagram"]);
   }

  ngOnInit(): void {

    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date('01/01/' + (this.now.getFullYear() + 1) +' 00:00');
    });

    this.getFerias();
    this.tachado = false;


    }

    showDate(){
      let distance = this.end - this.now;
      this.day = Math.floor(distance / this._day);
      this.hours = Math.floor((distance % this._day) / this._hour);
      this.minutes = Math.floor((distance % this._hour) / this._minute);
      this.seconds = Math.floor((distance % this._minute) / this._second);
    }

    Story  (index)  {
      console.log(index)

      // Default parameters if non provided.
      this.defaults = {
        playlist: [
          this.getFairTiendas[index]

        ]
      };
      console.log(this.getFairTiendas[index])
      console.log(this.defaults)

      if (arguments[0] && typeof arguments[0] === "object") {
        this.options = this.extendDefaults(this.defaults, arguments[0]);
      }

      try {
        if (this.defaults.playlist == null || this.defaults.playlist == '') {
          console.log('[SocialStories] No playlist provided.');
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }

      var Div = document.getElementById('storytime') as HTMLDivElement ;

      // HTML for story popup to be added to page
      var baseHTML = '<div class="storytime" style="opacity: 0; display: none;">' +
        '<div class="story-cover"></div>' +
        '<div class="story-window">' +
        // '<a href="#" class="story-arrow left" (click)="prev()"></a><a href="#" class="story-arrow right" (click)="next()"></a>' +
        '<div class="story-nav">' +
        '<div class="story-nav-left"><img class="story-icon" src="" /> <span class="story-text"></span><span class="story-date"></span></div><div class="story-nav-right"><a href="/ferias" class="close story-close" (click)="close()"></a></div>' +
        '</div>' +
        '<div class="story-timeline"></div>' +
        '<div class="story-video" (click)="next()">' +
        '<video class="story-next" src="" playsinline></video>' +
        '</div>' +
        '<div class="spinner">' +
        '<div class="bounce1"></div>' +
        '<div class="bounce2"></div>' +
        '<div class="bounce3"></div>' +
        '</div>' +
        '</div>' +
        '</div>';

      var timelineHTML = '';

      // Add HTML to storytime div element
      Div.innerHTML = baseHTML;

      // Create timeline elements by looping thorugh story items
      var i;
      for (i = 0; i < this.defaults.playlist.length; i++) {
        timelineHTML = timelineHTML + '<div class="story-timeline-item"><div class="story-timeline-line"></div><div class="story-timeline-line-active story-active-' + i + '" style="width: 0%;"></div></div>';
      }

      // Add timeline HTML to storytime div element
      var storyTimeline = document.getElementsByClassName('story-timeline')[0];
      storyTimeline.innerHTML = timelineHTML;
      this.launch()
    };

  // Utility method to extend defaults with user options
   extendDefaults =(source:any, properties:any) =>{
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

    launch =() => {
    // Get HTML elements
    this.storyTime = document.getElementsByClassName('storytime')[0];
    this.storySpinner = document.getElementsByClassName('spinner')[0];
    this.thisTimeline = document.getElementsByClassName('story-active-' + this.start)[0];
    var icon = document.getElementsByClassName('story-icon')[0] as HTMLVideoElement;
    var text = document.getElementsByClassName('story-text')[0];
    var date = document.getElementsByClassName('story-date')[0];
    this.video = document.getElementsByTagName("video")[0];

    // Show the Social Story Pop-up
    if (this.start == 0) {
      this.storyTime.setAttribute("style", "display: block; opacity: 0;");
    } else {
      this.storyTime.setAttribute("style", "display: block; opacity: 1;");
    }

    // Set CSS loading spinner to display: block (i.e. show it)
    this.storySpinner.style.display = 'block';
    setTimeout(() => {
      this.storyTime.setAttribute("style", "display: block; opacity: 1;");
    }, 10);

    // Load in the icon
    icon.src = this.defaults.playlist[this.start].icon;

    text.innerHTML = this.defaults.playlist[this.start].title;
    date.innerHTML = this.defaults.playlist[this.start].date;

    // Remove any previous videos
    this.video.src = ' ';
    // Set source for new video and load it into page
    this.video.src = this.defaults.playlist[this.start].url;
    this.video.load();

    this.thisTimeline.style.width = '0%';

    // When video can play, hide spinner
    this.video.oncanplay =  ()  =>{
      this.storySpinner.style.display = 'none';
      this.video.play();
      document.getElementsByClassName('story-video')[0].setAttribute("style", "min-width: " + this.video.offsetWidth + "px;");
      this.video.muted = false;
    };

    // Add event listener to track video progress and run function timeUpdate()
    this.video.addEventListener('timeupdate', this.timeUpdate, false);
    // Add event listerer to run function videoEnded() at end of video
    this.video.addEventListener('ended', this.videoEnded, false);
  }

   timeUpdate =()=> {
    // Calculate percentage of video played and update the videos timeline width accordingly
    var percentage = Math.ceil((100 / this.video.duration) * this.video.currentTime);
    this.thisTimeline.style.width = percentage + '%';
  }

   videoEnded =()=> {
    // Remove all event listeners on video end so they don't get duplicated.
    this.video.removeEventListener('timeupdate', this.timeUpdate);
    this.video.removeEventListener('ended', this.videoEnded);
    // Run next video
    this.next();
  }

   next =() => {
    // Set previous video timeline to 100% complete
    this.thisTimeline.style.width = '100%';
    // Advance play count to next video
    this.start++;
    // If next video doesn't exist (i.e. the previous video was the last) then close the Social Story popup
    if (this.start >= this.defaults.playlist.length) {
      setTimeout( () => {
        close();
        return false;
      }, 400);
    } else {
      // Otherwise run the next video
      this.launch();
    }
  }

   prev =() => {
    // If previous video was not first video set its timeline to 0%
    if (this.start != 0) {
      this.thisTimeline.style.width = '0%';
    }
    // Subtract play count to previous video
    this.start--;
    // If next video doesn't exist (i.e. the previous video was the last) then close the Social Story popup
    if (this.start < 0) {
      this.start = 0;
      return false;
    } else {
      // Otherwise run the previous video
      this.launch();
    }
  }

   close =() => {
    // Pause currently playing video
    this.video.pause();
    // Hide Social Story popup
    this.storyTime.setAttribute("style", "opacity: 0;");
    // After 500ms set stoyrtime element to display:none and reset all video timelines to 0%
    setTimeout( () => {
      this.storyTime.setAttribute("style", "opacity: 0; display: none;");
      var i;
      for (i = 0; i < this.defaults.playlist.length; i++) {
        document.getElementsByClassName('story-timeline-line-active')[i].setAttribute("style", "width: 0%;");
      }
    }, 500);
  }


  getUrl(){
    localStorage.removeItem('list');
    this.ProductosService
    .getDataByFeriaID(this.idFeria)
    .subscribe(resp =>{
      console.log(resp);

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
          // "Categoria": resp[i].Categoria.nombre,
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


        getFerias(){
          this.ProductosService
          .getDataFeria()
          .subscribe((resp : any) =>{
            this.idFeria = resp.id
               this.end = new Date(resp.fechaFin);
               this.getFeriasActivas = {
                "nombre":resp.nombre,
                "fechaInicio": resp.fechaInicio,
                "fechaFin":resp.fechaFin,
                "descripcion":resp.descripcion,
               }
               this.showDate()
               this.getFeriasTiendas()
               this.getUrl();


            }


         );


        }

        getFeriasTiendas(){
          this.ProductosService
          .getDataFeria()
          .subscribe((resp: any) =>{
            let i;
            this.storiestiendas = resp.tiendas
            // console.log(this.storiestiendas)

            for(i in this.storiestiendas){

              this.getFairTiendas.push({

                "title": this.storiestiendas[i].nombre,
                "date": this.hours + " Horas",
                "url": this.storiestiendas[i].video,
                "icon": "https://icons-for-free.com/iconfiles/png/512/clock-131964752516628239.png"

              })
              //  console.log(this.getFairTiendas);

            }

          }
         );


        }



}
