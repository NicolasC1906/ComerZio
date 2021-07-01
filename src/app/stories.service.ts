import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor() { }

  carga(archivos: string[]){

    for(let archivo of archivos){
      let script = document.createElement("script");
      //@ts-ignore
      let asdf = document.createElement("script");
      script.src = "./assets/socialstory" + archivo + ".js";
      let body = document.getElementsByTagName("body")[0];
      body.appendChild( script );
    }



  }


}
